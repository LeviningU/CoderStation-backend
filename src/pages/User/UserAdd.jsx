import { useState } from 'react';

import { useNavigate } from '@umijs/max';

import { PageContainer } from '@ant-design/pro-components';
import { message } from 'antd';

import UserForm from './components/UserForm';

import { addUserApi } from '@/services/userApi';

export default function UserAdd(props) {
    const [newUserInfo, setNewUserInfo] = useState({
        loginId: '',
        loginPwd: '',
        nickname: '',
        avatar: '',
        mail: '',
        qq: '',
        wechat: '',
        intro: '',
        captcha: 'facj',
    });

    const navigate = useNavigate();

    function submitHandle() {
        addUserApi(newUserInfo);
        message.success('添加用户成功！');
        navigate('/user/userlist');
    }

    return (
        <PageContainer>
            <div className="container" style={{ width: '500px' }}>
                <UserForm
                    type="add"
                    userInfo={newUserInfo}
                    setUserInfo={setNewUserInfo}
                    submitHandle={submitHandle}
                ></UserForm>
            </div>
        </PageContainer>
    );
}
