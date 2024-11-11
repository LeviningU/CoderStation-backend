import { useDispatch, useNavigate, useSelector } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { Button, message, Popconfirm, Select, Tag } from 'antd';

import { deleteBookApi, getBookByPageApi } from '@/services/bookApi';

import { formatDate, typeOptionCreator } from '@/utils/tool';

export default function BookList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const typeList = useSelector((state) => state.typeModal.typeList);

    useEffect(() => {
        if (!typeList.length) {
            dispatch({
                type: 'typeModal/_getTypeList',
            });
        }
    }, [typeList.length]);

    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 10,
    });

    async function getBookList(params) {
        const res = await getBookByPageApi(params);
        return {
            data: res.data.data,
            success: !res.code,
            total: res.data.count,
        };
    }

    const tableRef = useRef();

    function deleteHandle(row) {
        deleteBookApi(row._id);
        message.success('删除书籍成功！');
        tableRef.current.reload();
    }

    function editHandle(row) {
        if (row._id) {
            navigate(`/book/bookedit/${row._id}`);
        }
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
            title: '书籍名称',
            width: 150,
            dataIndex: 'bookTitle',
            key: 'bookTitle',
            align: 'left',
        },
        {
            title: '书籍分类',
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
            title: '书籍简介',
            width: 200,
            dataIndex: 'bookIntro',
            key: 'bookIntro',
            align: 'center',
            search: false,
            render: (_, row) => {
                let reg = /<[^<>]+>/g;
                let brief = row.bookIntro;
                brief = brief.replace(reg, '');

                if (brief.length > 15) {
                    brief = brief.slice(0, 15) + '...';
                }
                return [brief];
            },
        },
        {
            title: '书籍封面',
            dataIndex: 'bookPic',
            key: 'bookPic',
            align: 'center',
            valueType: 'image',
            search: false,
        },
        {
            title: '浏览数',
            dataIndex: 'scanNumber',
            key: 'scanNumber',
            align: 'center',
            search: false,
        },
        {
            title: '评论数',
            dataIndex: 'commentNumber',
            key: 'commentNumber',
            align: 'center',
            search: false,
        },
        {
            title: '上架日期',
            dataIndex: 'onShelfDate',
            key: 'onShelfDate',
            align: 'center',
            search: false,
            render: (_, row) => [formatDate(row.onShelfDate)],
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
                        onClick={() => editHandle(row)}
                    >
                        编辑
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
                <ProTable
                    headerTitle="书籍列表"
                    rowKey={(row) => row._id}
                    actionRef={tableRef}
                    columns={columns}
                    request={getBookList}
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
        </div>
    );
}
