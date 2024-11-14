import { useDispatch, useNavigate, useSelector } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { Button, Form, Input, message, Popconfirm } from 'antd';

export default function TypeList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const typeList = useSelector((state) => state.typeModal.typeList);

    const [newTypeInfo, setNewTypeInfo] = useState('');

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

    const tableRef = useRef();

    function deleteHandle(row) {
        dispatch({
            type: 'typeModal/_deleteType',
            payload: row,
        });
        message.success('删除分类成功！');
        tableRef.current.reload();
    }

    function addHandle() {
        if (!newTypeInfo) {
            message.error('请填写新增类型！');
            return;
        }
        dispatch({
            type: 'typeModal/_addType',
            payload: {
                typeName: newTypeInfo.trim(),
            },
        });
        message.success('新增分类成功！');
        tableRef.current.reload();
    }

    const columns = [
        {
            title: '分类名称',
            dataIndex: 'typeName',
            key: 'typeName',
            align: 'center',
            search: false,
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
                    <Popconfirm
                        title="确定删除该分类吗？"
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
                <div style={{ width: 500, margin: 10, marginBottom: 30 }}>
                    <Form layout="inline">
                        <Form.Item name="newTypeName">
                            <Input
                                placeholder="填写新增分类"
                                name="typeName"
                                value={newTypeInfo}
                                onChange={(e) => setNewTypeInfo(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                shape="round"
                                onClick={addHandle}
                            >
                                新增
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                <ProTable
                    search={false}
                    headerTitle="分类列表"
                    rowKey={(row) => row._id}
                    actionRef={tableRef}
                    columns={columns}
                    dataSource={typeList}
                    pagination={{
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
