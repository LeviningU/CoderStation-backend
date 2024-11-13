import { useDispatch, useNavigate, useSelector } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { Button, message, Popconfirm, Select, Tag } from 'antd';

import {
    deleteInterviewApi,
    getInterviewByPageApi,
} from '@/services/interviewApi';

import { formatDate, typeOptionCreator } from '@/utils/tool';

export default function InterviewList() {
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

    async function getInterviewList(params) {
        const res = await getInterviewByPageApi(params);
        return {
            data: res.data.data,
            success: !res.code,
            total: res.data.count,
        };
    }

    const tableRef = useRef();

    function deleteHandle(row) {
        deleteInterviewApi(row._id);
        message.success('删除题目成功！');
        tableRef.current.reload();
    }

    function editHandle(row) {
        if (row._id) {
            navigate(`/interview/interviewedit/${row._id}`);
        }
    }

    function detailHandle(row) {
        if (row._id) {
            navigate(`/interview/interviewlist/${row._id}`);
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
            title: '题目名称',
            dataIndex: 'interviewTitle',
            key: 'interviewTitle',
            align: 'left',
            render: (_, row) => {
                // 将书籍简介的文字进行简化
                let brief = null;
                if (row.interviewTitle.length > 22) {
                    brief = row.interviewTitle.slice(0, 22) + '...';
                } else {
                    brief = row.interviewTitle;
                }
                return [brief];
            },
        },
        {
            title: '题目分类',
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
            title: '上架日期',
            dataIndex: 'onShelfDate',
            key: 'onShelfDate',
            align: 'center',
            search: false,
            render: (_, row) => [formatDate(row.onShelfDate)],
        },
        {
            title: '操作',
            width: 200,
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
                    headerTitle="题目列表"
                    rowKey={(row) => row._id}
                    actionRef={tableRef}
                    columns={columns}
                    request={getInterviewList}
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
