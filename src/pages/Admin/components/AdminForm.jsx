import { useRef } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Radio, Upload } from 'antd';

import { checkLoginIdApi } from '@/services/adminApi';

export default function AdminForm({
    type,
    adminInfo,
    setAdminInfo,
    submitHandle,
}) {
    const formRef = useRef();

    if (type === 'edit' && formRef.current) {
        formRef.current.setFieldsValue(adminInfo);
    }

    function updateInfo(newContent, key) {
        setAdminInfo({ ...adminInfo, [key]: newContent });
    }

    function checkLoginId() {
        return new Promise((resolve, reject) => {
            checkLoginIdApi(adminInfo.loginId).then((res) => {
                if (res.data) {
                    reject('该管理员已存在！');
                } else {
                    resolve();
                }
            });
        });
    }

    let avatarPreview = null;
    if (type === 'edit') {
        avatarPreview = (
            <Form.Item label="当前头像" name="avatarPreview">
                <Image src={adminInfo?.avatar} width={100} />
            </Form.Item>
        );
    }

    return (
        <Form
            name="basic"
            initialValues={adminInfo}
            autoComplete="off"
            ref={formRef}
            onFinish={submitHandle}
            labelCol={{ span: 5 }}
        >
            <Form.Item
                label="管理员账号"
                name="loginId"
                rules={[
                    { required: true, message: '请输入管理员账号' },
                    type === 'add'
                        ? { validateTrigger: 'onBlur', validator: checkLoginId }
                        : null,
                ]}
            >
                <Input
                    value={adminInfo?.loginId}
                    onChange={(e) => updateInfo(e.target.value, 'loginId')}
                    disabled={type === 'edit'}
                />
            </Form.Item>

            <Form.Item
                label="管理员密码"
                name="loginPwd"
                rules={[
                    type === 'edit'
                        ? { required: true, message: '请输入管理员密码' }
                        : null,
                ]}
            >
                <Input.Password
                    placeholder={
                        type === 'edit'
                            ? '请输入新密码'
                            : '密码可选，默认为123123'
                    }
                    value={adminInfo?.loginPwd}
                    onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
                />
            </Form.Item>

            <Form.Item
                label="管理员昵称"
                name="nickname"
                rules={[
                    type === 'edit'
                        ? { required: true, message: '请输入管理员昵称' }
                        : null,
                ]}
            >
                <Input
                    placeholder={
                        type === 'edit'
                            ? '请输入新昵称'
                            : '昵称可选，默认为新增管理员'
                    }
                    value={adminInfo?.nickname}
                    onChange={(e) => updateInfo(e.target.value, 'nickname')}
                />
            </Form.Item>

            <Form.Item
                label="权限选择"
                name="permission"
                rules={[{ required: true, message: '请选择管理员权限' }]}
            >
                <Radio.Group
                    onChange={(e) => {
                        updateInfo(e.target.value, 'permission');
                    }}
                    value={adminInfo?.permission}
                >
                    <Radio value={1}>超级管理员</Radio>
                    <Radio value={2}>普通管理员</Radio>
                </Radio.Group>
            </Form.Item>

            {avatarPreview}

            <Form.Item label="上传头像" name="avatar">
                <Upload
                    listType="picture-card"
                    key={adminInfo?._id}
                    maxCount={1}
                    action="/api/upload"
                    onChange={(info) => {
                        if (info.file.status === 'done') {
                            updateInfo(info.file.response.data, 'avatar');
                        }
                    }}
                >
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: '8px' }}>头像可选</div>
                    </div>
                </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    {type === 'edit' ? '确认修改' : '确认添加'}
                </Button>

                <Button type="link" htmlType="reset" className="resetBtn">
                    重置
                </Button>
            </Form.Item>
        </Form>
    );
}
