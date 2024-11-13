import { useEffect, useState } from 'react';

import { useNavigate, useParams, useSelector } from '@umijs/max';

import { Card, Tag } from 'antd';

import { getInterviewByIdApi } from '@/services/interviewApi';

import { PageContainer } from '@ant-design/pro-components';

export default function InterviewEdit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [typeName, setTypeName] = useState('');

    const typeList = useSelector((state) => state.typeModal.typeList);

    useEffect(() => {
        if (typeList.length > 0) {
            const type = typeList.find(
                (item) => item.id === interviewInfo.typeId,
            );
            setTypeName(type.typeName);
        }
    }, [typeList]);

    const [interviewInfo, setInterviewInfo] = useState({});

    useEffect(() => {
        if (id) {
            getInterviewByIdApi(id).then((res) => {
                setInterviewInfo(res.data);
            });
            setTypeName(
                typeList.find((item) => item.id === interviewInfo.typeId)
                    .typeName,
            );
        }
    }, [id]);

    return (
        <PageContainer>
            <Card
                title={interviewInfo?.interviewTitle}
                style={{
                    marginBottom: 10,
                }}
                extra={
                    <Tag color="purple" key={interviewInfo?.typeId}>
                        {typeName}
                    </Tag>
                }
            >
                <div
                    dangerouslySetInnerHTML={{
                        __html: interviewInfo?.interviewContent,
                    }}
                ></div>
            </Card>
        </PageContainer>
    );
}
