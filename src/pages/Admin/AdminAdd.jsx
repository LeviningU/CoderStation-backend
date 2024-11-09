import { useEffect, useState } from 'react';

import { useNavigate } from '@umijs/max';
import { useDispatch, useSelector } from 'umi';

import { PageContainer } from '@ant-design/pro-components';
import { message } from 'antd';

import AdminForm from './components/AdminForm';

export default function AdminAdd(props) {
    const [newAdminInfo, setNewAdminInfo] = useState({
        loginId: '',
        loginPwd: '',
        nickname: '',
        avatar: '',
        permission: 2,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { adminList } = useSelector((state) => state.adminModal);

    useEffect(() => {
        if (!adminList.length) {
            dispatch({ type: 'adminModal/_getAdminList' });
        }
    }, [adminList]);

    function submitHandle() {
        dispatch({ type: 'adminModal/_addAdmin', payload: newAdminInfo });
        message.success('添加管理员成功！');
        navigate('/admin/adminlist');
    }

    return (
        <PageContainer>
            <div className="container" style={{ width: '500px' }}>
                <AdminForm
                    type="add"
                    adminInfo={newAdminInfo}
                    setAdminInfo={setNewAdminInfo}
                    submitHandle={submitHandle}
                ></AdminForm>
            </div>
        </PageContainer>
    );
}
