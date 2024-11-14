import { useEffect, useState } from 'react';

import { useDispatch, useParams, useSelector } from '@umijs/max';

import { Card, Tag } from 'antd';

import { getInterviewByIdApi } from '@/services/interviewApi';

import { PageContainer } from '@ant-design/pro-components';

export default function InterviewEdit() {
    const { id } = useParams();

    const dispatch = useDispatch();

    const [typeName, setTypeName] = useState('');

    const typeList = useSelector((state) => state.typeModal.typeList);

    useEffect(() => {
        if (!typeList.length) {
            dispatch({
                type: 'typeModal/_getTypeList',
            });
        }
    }, [typeList.length]);

    const [interviewInfo, setInterviewInfo] = useState({});

    useEffect(() => {
        (async function () {
            if (id) {
                const res = await getInterviewByIdApi(id);
                setInterviewInfo(res.data);
                setTypeName(
                    typeList.find((item) => item._id === res.data.typeId)
                        ?.typeName,
                );
            }
        })();
    }, [id, typeList]);

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
