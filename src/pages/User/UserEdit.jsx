import { useEffect, useState } from 'react';

import { useNavigate } from '@umijs/max';

import { useParams } from '@umijs/max';

import { getUserByIdApi, updateUserApi } from '@/services/userApi';

import { PageContainer } from '@ant-design/pro-components';
import { message } from 'antd';

import UserForm from './components/UserForm';

export default function UserEdit() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if (id) {
            getUserByIdApi(id).then((res) => {
                setUserInfo(res.data);
            });
        }
    }, [id]);

    function submitHandle() {
        updateUserApi(id, userInfo);
        navigate('/user/userlist');
        message.success('更新用户成功！');
    }

    return (
        <PageContainer>
            <div className="container" style={{ width: '500px' }}>
                <UserForm
                    type="edit"
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    submitHandle={submitHandle}
                ></UserForm>
            </div>
        </PageContainer>
    );
}
