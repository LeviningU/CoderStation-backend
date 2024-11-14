import { useDispatch, useNavigate, useSelector } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { Button, message, Modal, Popconfirm, Radio, Select, Tag } from 'antd';

import { getBookByIdApi } from '@/services/bookApi';
import { deleteCommentApi, getCommentByTypeApi } from '@/services/commentApi';
import { getIssueByIdApi } from '@/services/issueApi';
import { getUserByIdApi } from '@/services/userApi';

import { formatDate, typeOptionCreator } from '@/utils/tool';

export default function CommentList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const typeList = useSelector((state) => state.typeModal.typeList);

    const [commentType, setCommentType] = useState('issue');
    const [modalShow, setModalShow] = useState(false);
    const [curComment, setCurComment] = useState(null);

    const [userMemo, setUserMemo] = useState(new Map());
    const [bookMemo, setBookMemo] = useState(new Map());
    const [issueMemo, setIssueMemo] = useState(new Map());

    useEffect(() => {
        if (!typeList.length) {
            dispatch({
                type: 'typeModal/_getTypeList',
            });
        }
    }, [typeList.length]);

    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 5,
    });

    async function getCommentList(params) {
        const res = await getCommentByTypeApi(
            params,
            commentType === 'issue' ? 1 : 2,
        );

        const commentTable = res.data.data;

        const comments = [];

        const userM = userMemo;
        const bookM = bookMemo;
        const issueM = issueMemo;

        for (const item of commentTable) {
            if (userMemo.has(item.userId)) {
                item.nickname = userMemo.get(item.userId);
            } else {
                const user = await getUserByIdApi(item.userId);
                item.nickname = user.data?.nickname;
                userM.set(item.userId, user.data?.nickname);
            }

            if (commentType === 'issue') {
                // const issue = await getIssueByIdApi(item.issueId);
                // item.commentTitle = issue.data?.issueTitle;
                if (issueMemo.has(item.issueId)) {
                    item.commentTitle = issueMemo.get(item.issueId);
                } else {
                    const issue = await getIssueByIdApi(item.issueId);
                    item.commentTitle = issue.data?.issueTitle;
                    issueM.set(item.issueId, issue.data?.issueTitle);
                }
            }
            if (commentType === 'book') {
                // const book = await getBookByIdApi(item.bookId);
                // item.commentTitle = book.data?.bookTitle;
                if (bookMemo.has(item.bookId)) {
                    item.commentTitle = bookMemo.get(item.bookId);
                } else {
                    const book = await getBookByIdApi(item.bookId);
                    item.commentTitle = book.data?.bookTitle;
                    bookM.set(item.bookId, book.data?.bookTitle);
                }
            }
            comments.push(item);
        }

        setUserMemo(userM);
        setBookMemo(bookM);
        setIssueMemo(issueM);

        return {
            data: commentTable,
            success: !res.code,
            total: res.data.count,
        };
    }

    const tableRef = useRef();

    function deleteHandle(row) {
        deleteCommentApi(row._id);
        message.success('删除评论成功！');
        tableRef.current.reload();
    }

    function detailHandle(row) {
        setCurComment(row);
        setModalShow(true);
    }

    function closeHandle() {
        setModalShow(false);
        setCurComment(null);
    }

    function handleTypeChange(e) {
        setCommentType(e.target.value);
        setPageInfo({
            current: 1,
            pageSize: 5,
        });
        tableRef.current.reload();
    }

    const columns = [
        {
            title: '序号',
            width: 50,
            align: 'center',
            search: false,
            render: (_, __, index) =>
                pageInfo.pageSize * (pageInfo.current - 1) + index + 1,
        },
        {
            title: commentType === 'issue' ? '问答标题' : '书籍名称',
            dataIndex: 'commentTitle',
            key: 'commentTitle',
            align: 'left',
            search: false,
        },
        {
            title: '评论内容',
            dataIndex: 'commentContent',
            key: 'commentContent',
            align: 'left',
            render: (_, row) => {
                let brief = null;
                if (row.commentContent.length > 30) {
                    brief = row.commentContent.slice(0, 30) + '...';
                } else {
                    brief = row.commentContent;
                }
                return [brief];
            },
        },
        {
            title: '评论用户',
            dataIndex: 'userId',
            key: 'userId',
            align: 'center',
            search: false,
            render: (_, row) => (
                <Tag color="blue" key={row.userId}>
                    {row?.nickname ? row.nickname : '未知用户'}
                </Tag>
            ),
        },
        {
            title: '评论分类',
            dataIndex: 'typeId',
            key: 'typeId',
            align: 'center',
            renderFormItem: () => {
                return (
                    <Select placeholder="请选择查询分类">
                        {typeOptionCreator(Select, typeList)}
                    </Select>
                );
            },
            render: (_, row) => {
                const type = typeList.find((item) => item._id === row.typeId);
                return [
                    <Tag color="purple" key={row.typeId}>
                        {type.typeName}
                    </Tag>,
                ];
            },
        },
        {
            title: '操作',
            width: 150,
            key: 'option',
            align: 'center',
            fixed: 'right',
            search: false,
            render: (_, row) => (
                <div key={row._id}>
                    <Button
                        size="small"
                        type="link"
                        onClick={() => detailHandle(row)}
                    >
                        详情
                    </Button>
                    <Popconfirm
                        title="确定删除该书籍以及该书籍对应的评论吗？"
                        onConfirm={() => deleteHandle(row)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button size="small" type="link">
                            删除
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <PageContainer>
                <Radio.Group
                    onChange={handleTypeChange}
                    value={commentType}
                    style={{
                        marginTop: 30,
                        marginBottom: 30,
                    }}
                >
                    <Radio.Button value="issue" defaultChecked>
                        问答评论
                    </Radio.Button>
                    <Radio.Button value="book">书籍评论</Radio.Button>
                </Radio.Group>
                <ProTable
                    headerTitle="评论列表"
                    rowKey={(row) => row._id}
                    actionRef={tableRef}
                    columns={columns}
                    request={getCommentList}
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20', '50', '100'],
                        ...pageInfo,
                        onChange: (current, pageSize) => {
                            setPageInfo({
                                current,
                                pageSize,
                            });
                        },
                    }}
                />
            </PageContainer>
            <Modal
                title="评论详情"
                open={modalShow}
                onCancel={closeHandle}
                style={{ top: 50 }}
                footer={false}
            >
                <h3>{commentType === 'issue' ? '问答标题' : '书籍标题'}</h3>
                <p>{curComment?.commentTitle}</p>
                <h3>评论日期</h3>
                <p>{formatDate(curComment?.commentDate)}</p>
                <h3>评论内容</h3>
                <div
                    dangerouslySetInnerHTML={{
                        __html: curComment?.commentContent,
                    }}
                ></div>
            </Modal>
        </div>
    );
}
