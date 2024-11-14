import { useEffect, useState } from 'react';

import { useDispatch, useParams, useSelector } from '@umijs/max';

import { Card, Tag } from 'antd';

import { getIssueByIdApi } from '@/services/issueApi';
import { getUserByIdApi } from '@/services/userApi';

import { PageContainer } from '@ant-design/pro-components';

import { formatDate } from '@/utils/tool';

export default function IssueDetail() {
    const { id } = useParams();

    const dispatch = useDispatch();

    const [typeName, setTypeName] = useState('');
    const [userName, setUserName] = useState('');

    const typeList = useSelector((state) => state.typeModal.typeList);

    useEffect(() => {
        if (!typeList.length) {
            dispatch({
                type: 'typeModal/_getTypeList',
            });
        }
    }, [typeList.length]);

    const [issueInfo, setIssueInfo] = useState({});

    useEffect(() => {
        (async function () {
            if (id) {
                const res = await getIssueByIdApi(id);
                setIssueInfo(res.data);
                const type = typeList.find(
                    (item) => item._id === res.data.typeId,
                );
                setTypeName(type?.typeName);
                const user = await getUserByIdApi(res.data.userId);
                setUserName(user.data?.nickname);
            }
        })();
    }, [id, typeList]);

    return (
        <PageContainer>
            <div
                className="container"
                style={{
                    width: '100%',
                    margin: 'auto',
                }}
            >
                <Card
                    title={issueInfo?.issueTitle}
                    bordered={false}
                    style={{
                        marginTop: 20,
                    }}
                    extra={
                        <Tag color="purple" key={issueInfo?.typeId}>
                            {typeName}
                        </Tag>
                    }
                >
                    <h2>提问用户</h2>
                    <p>
                        <Tag color="volcano" key={issueInfo?.userId}>
                            {userName}
                        </Tag>
                    </p>
                    <h2>问题描述</h2>
                    <p>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: issueInfo?.issueContent,
                            }}
                        ></div>
                    </p>
                    <h2>提问时间</h2>
                    <p>{formatDate(issueInfo?.issueDate)}</p>
                    <h3>浏览数：{issueInfo?.scanNumber}</h3>
                    <p></p>
                    <h3>评论数：{issueInfo?.scanNumber}</h3>
                </Card>
            </div>
        </PageContainer>
    );
}
