import { useNavigate } from '@umijs/max';
import { useRef, useState } from 'react';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { Button, message, Modal, Popconfirm, Switch } from 'antd';

import {
    deleteUserApi,
    getUserByPageApi,
    updateUserApi,
} from '@/services/userApi';

import UserDetail from './components/UserDetail';

export default function User() {
    const navigate = useNavigate();

    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 5,
    });

    const [showModal, setShowModal] = useState(false);

    const [curUserInfo, setCurUserInfo] = useState(null);

    async function getUserList(params) {
        const res = await getUserByPageApi(params);
        return {
            data: res.data.data,
            success: !res.code,
            total: res.data.count,
        };
    }

    function switchHanle(row, checked) {
        updateUserApi(row._id, { enabled: checked });
        message.success('修改用户状态成功！');
    }

    function showDetailModal(row) {
        setCurUserInfo(row);
        setShowModal(true);
    }

    function handleOk() {
        setShowModal(false);
        setCurUserInfo(null);
    }

    function handleCancel() {
        setShowModal(false);
        setCurUserInfo(null);
    }

    const tableRef = useRef();

    function deleteHandle(row) {
        deleteUserApi(row._id);
        message.success('删除用户成功！');
        tableRef.current.reload();
    }

    function editHandle(row) {
        if (row._id) {
            navigate(`/user/useredit/${row._id}`);
        }
    }

    const columns = [
        {
            title: '序号',
            // dataIndex: 'loginId',
            // key: 'loginId',
            width: 50,
            align: 'center',
            search: false,
            render: (_, __, index) =>
                pageInfo.pageSize * (pageInfo.current - 1) + index + 1,
        },
        {
            title: '登录账号',
            dataIndex: 'loginId',
            key: 'loginId',
            align: 'center',
        },
        {
            title: '登录密码',
            dataIndex: 'loginPwd',
            key: 'loginPwd',
            align: 'center',
            search: false,
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
            align: 'center',
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',
            align: 'center',
            valueType: 'image',
            search: false,
        },
        {
            title: '账号状态',
            dataIndex: 'enabled',
            key: 'enabled',
            align: 'center',
            search: false,
            render: (_, row) => (
                <span>
                    <Switch
                        key={row._id}
                        size="small"
                        defaultChecked={row.enabled}
                        onChange={(checked) => switchHanle(row, checked)}
                    />
                </span>
            ),
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
                        onClick={() => showDetailModal(row)}
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
                        title="确定删除该用户吗？"
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
                    headerTitle="用户列表"
                    rowKey={(row) => row._id}
                    actionRef={tableRef}
                    columns={columns}
                    request={getUserList}
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '15', '20'],
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
                title={curUserInfo?.nickname}
                open={showModal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <UserDetail userInfo={curUserInfo} />
            </Modal>
        </div>
    );
}
