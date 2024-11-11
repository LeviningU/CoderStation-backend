import { Image, Tag } from 'antd';

import { formatDate } from '@/utils/tool';

export default function UserDetail({ userInfo }) {
    return (
        <>
            <h3>登录账号</h3>
            <p>
                <Tag color="red">{userInfo?.loginId}</Tag>
            </p>
            <h3>登录密码</h3>
            <p>
                <Tag color="magenta">{userInfo?.loginPwd}</Tag>
            </p>
            <h3>当前头像</h3>
            <Image src={userInfo?.avatar} width={60} />

            <h3>联系方式</h3>
            <div
                style={{
                    display: 'flex',
                    width: '350px',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <h4>QQ</h4>
                    <p>{userInfo?.qq ? userInfo.qq : '未填写'}</p>
                </div>
                <div>
                    <h4>微信</h4>
                    <p>{userInfo?.wechat ? userInfo.weichat : '未填写'}</p>
                </div>
                <div>
                    <h4>邮箱</h4>
                    <p>{userInfo?.mail ? userInfo.mail : '未填写'}</p>
                </div>
            </div>
            <h3>个人简介</h3>
            <p>{userInfo?.intro ? userInfo.intro : '未填写'}</p>
            <h3>时间信息</h3>
            <div
                style={{
                    display: 'flex',
                    width: '450px',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <h4>注册时间</h4>
                    <p>{formatDate(userInfo?.registerDate)}</p>
                </div>
                <div>
                    <h4>上次登录</h4>
                    <p>{formatDate(userInfo?.lastLoginDate)}</p>
                </div>
            </div>
            <h3>当前积分</h3>
            <p>{userInfo?.points} 分</p>
        </>
    );
}
