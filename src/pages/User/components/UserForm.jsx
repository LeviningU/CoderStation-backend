import { useRef } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Upload } from 'antd';

export default function UserForm({
    type,
    userInfo,
    setUserInfo,
    submitHandle,
}) {
    const formRef = useRef();

    if (type === 'edit' && formRef.current) {
        formRef.current.setFieldsValue(userInfo);
    }

    function updateInfo(newContent, key) {
        setUserInfo({ ...userInfo, [key]: newContent });
    }

    let avatarPreview = null;
    if (type === 'edit') {
        avatarPreview = (
            <Form.Item label="当前头像" name="avatarPreview">
                <Image src={userInfo?.avatar} width={100} />
            </Form.Item>
        );
    }

    return (
        <Form
            name="basic"
            initialValues={userInfo}
            autoComplete="off"
            ref={formRef}
            onFinish={submitHandle}
            labelCol={{ span: 5 }}
        >
            <Form.Item
                label="用户账号"
                name="loginId"
                rules={[{ required: true, message: '请输入用户账号' }]}
            >
                <Input
                    value={userInfo?.loginId}
                    placeholder="请输入用户账号"
                    onChange={(e) => updateInfo(e.target.value, 'loginId')}
                />
            </Form.Item>

            <Form.Item label="用户密码" name="loginPwd">
                <Input.Password
                    rows={6}
                    placeholder="密码可选，默认为123123"
                    value={userInfo?.loginPwd}
                    onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
                />
            </Form.Item>

            <Form.Item label="用户昵称" name="nickname">
                <Input
                    placeholder="昵称可选，默认为新用户"
                    value={userInfo?.nickname}
                    onChange={(e) => updateInfo(e.target.value, 'nickname')}
                />
            </Form.Item>

            {avatarPreview}

            <Form.Item label="上传头像" name="avatar">
                <Upload
                    listType="picture-card"
                    key={userInfo?._id}
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

            <Form.Item label="QQ号码" name="qq">
                <Input
                    value={userInfo?.qq}
                    placeholder="选填"
                    onChange={(e) => updateInfo(e.target.value, 'qq')}
                />
            </Form.Item>

            <Form.Item label="微信号" name="wechat">
                <Input
                    value={userInfo?.wechat}
                    placeholder="选填"
                    onChange={(e) => updateInfo(e.target.value, 'wechat')}
                />
            </Form.Item>

            <Form.Item label="自我介绍" name="intro">
                <Input.TextArea
                    rows={6}
                    value={userInfo?.intro}
                    placeholder="选填"
                    onChange={(e) => updateInfo(e.target.value, 'intro')}
                />
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
