import { useDispatch, useSelector } from '@umijs/max';
import { useEffect, useState } from 'react';

import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal, Popconfirm, Switch, Tag } from 'antd';

import AdminForm from './components/AdminForm';

import {
    CURRENT_ADMIN_COLOR,
    NORMAL_ADMIN_COLOR,
    SUPER_ADMIN_COLOR,
} from '@/constants';

export default function AdminList() {
    const dispatch = useDispatch();

    const { adminList, adminInfo } = useSelector((state) => state.adminModal);

    const [showModal, setShowModal] = useState(false);
    const [curAdminInfo, setCurAdminInfo] = useState(null);

    useEffect(() => {
        if (!adminList.length) {
            dispatch({ type: 'adminModal/_getAdminList' });
        }
    }, [adminList]);

    const showEditModal = (row) => {
        setCurAdminInfo(row);
        setShowModal(true);
    };

    const handleOk = () => {
        dispatch({
            type: 'adminModal/_updateAdmin',
            payload: {
                adminInfo: curAdminInfo,
                newAdminInfo: curAdminInfo,
            },
        });
        setCurAdminInfo(null);
        setShowModal(false);
        message.success('修改管理员信息成功！');
    };

    const handleCancel = () => {
        setCurAdminInfo(null);
        setShowModal(false);
    };

    const deleteHandle = (row) => {
        if (adminInfo?._id === row._id) {
            message.error('不能删除当前登录账号！');
        } else {
            dispatch({ type: 'adminModal/_deleteAdmin', payload: row });
            message.success('删除管理员成功！');
        }
    };

    const switchHanle = (row, checked) => {
        if (adminInfo?._id === row._id) {
            message.error('不能禁用当前登录账号！');
        } else {
            dispatch({
                type: 'adminModal/_updateAdmin',
                payload: {
                    adminInfo: row,
                    newAdminInfo: { enabled: checked },
                },
            });
            if (checked) {
                message.success('启用管理员成功！');
            } else {
                message.success('禁用管理员成功！');
            }
        }
    };

    const columns = [
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
        },
        {
            title: '权限',
            dataIndex: 'permission',
            key: 'permission',
            align: 'center',
            render: (_, row) => (
                <span>
                    {row.permission === 1 ? (
                        <Tag key={row._id} color={SUPER_ADMIN_COLOR}>
                            超级管理员
                        </Tag>
                    ) : (
                        <Tag key={row._id} color={NORMAL_ADMIN_COLOR}>
                            普通管理员
                        </Tag>
                    )}
                </span>
            ),
        },
        {
            title: '账号状态',
            dataIndex: 'enabled',
            key: 'enabled',
            align: 'center',
            render: (_, row) => (
                <span>
                    {adminInfo?._id === row._id ? (
                        <Tag key={row._id} color={CURRENT_ADMIN_COLOR}>
                            -
                        </Tag>
                    ) : (
                        <Switch
                            key={row._id}
                            size="small"
                            defaultChecked={row.enabled}
                            onChange={(checked) => switchHanle(row, checked)}
                        />
                    )}
                </span>
            ),
        },
        {
            title: '操作',
            width: 150,
            key: 'option',
            align: 'center',
            render: (_, row) => (
                <div key={row._id}>
                    <Button
                        size="small"
                        type="link"
                        onClick={() => showEditModal(row)}
                    >
                        编辑
                    </Button>
                    <Popconfirm
                        title="确定删除该管理员吗？"
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
                    headerTitle="管理员列表"
                    dataSource={adminList}
                    rowKey={(row) => row._id}
                    columns={columns}
                    search={false}
                    pagination={{
                        pageSize: 5,
                    }}
                />
            </PageContainer>
            <Modal
                title="修改管理员信息"
                open={showModal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <AdminForm
                    type="edit"
                    adminInfo={curAdminInfo}
                    setAdminInfo={setCurAdminInfo}
                    submitHandle={() => {
                        handleOk();
                    }}
                />
            </Modal>
        </div>
    );
}
