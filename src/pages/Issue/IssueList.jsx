import { useDispatch, useNavigate, useSelector } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { Button, message, Popconfirm, Select, Switch, Tag } from 'antd';

import {
    deleteIssueApi,
    getIssueByPageApi,
    updateIssueApi,
} from '@/services/issueApi';

import { typeOptionCreator } from '@/utils/tool';

export default function IssueList() {
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

    async function getIssueList(params) {
        const res = await getIssueByPageApi(params);
        return {
            data: res.data.data,
            success: !res.code,
            total: res.data.count,
        };
    }

    const tableRef = useRef();

    function deleteHandle(row) {
        deleteIssueApi(row._id);
        message.success('删除问答成功！');
        tableRef.current.reload();
    }

    function detailHandle(row) {
        if (row._id) {
            navigate(`/issue/${row._id}`);
        }
    }

    function switchHanle(row, checked) {
        if (row._id) {
            updateIssueApi(row._id, { issueStatus: checked });
            if (checked) {
                message.success('该问题审核已通过');
            } else {
                message.success('已关闭该问题');
            }
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
            title: '问答标题',
            dataIndex: 'issueTitle',
            key: 'issueTitle',
            align: 'left',
        },
        {
            title: '问答描述',
            dataIndex: 'issueContent',
            key: 'issueContent',
            align: 'center',
            search: false,
            render: (_, row) => {
                let reg = /<[^<>]+>/g;
                let brief = row.issueContent;
                brief = brief.replace(reg, '');

                if (brief.length > 30) {
                    brief = brief.slice(0, 30) + '...';
                }
                return [brief];
            },
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
            title: '问答分类',
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
            title: '审核状态',
            dataIndex: 'issuePic',
            key: 'issuePic',
            align: 'center',
            valueType: 'image',
            search: false,
            render: (_, row) => (
                <span>
                    {
                        <Switch
                            key={row._id}
                            size="small"
                            defaultChecked={row.issueStatus}
                            onChange={(checked) => switchHanle(row, checked)}
                        />
                    }
                </span>
            ),
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
                <ProTable
                    headerTitle="书籍列表"
                    rowKey={(row) => row._id}
                    actionRef={tableRef}
                    columns={columns}
                    request={getIssueList}
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
