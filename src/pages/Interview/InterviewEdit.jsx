import { useEffect, useState } from 'react';

import { useNavigate, useParams } from '@umijs/max';

import {
    getInterviewByIdApi,
    updateInterviewApi,
} from '@/services/interviewApi';

import { PageContainer } from '@ant-design/pro-components';
import { message } from 'antd';

import InterviewForm from './components/InterviewForm';

export default function InterviewEdit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [interviewInfo, setInterviewInfo] = useState({});

    useEffect(() => {
        if (id) {
            getInterviewByIdApi(id).then((res) => {
                setInterviewInfo(res.data);
            });
        }
    }, [id]);

    function submitHandle(interviewIntro) {
        updateInterviewApi(id, { ...interviewInfo, interviewIntro });
        message.success('更新题目成功！');
        navigate('/interview/interviewlist');
    }

    return (
        <PageContainer>
            <div className="container" style={{ width: 800 }}>
                <InterviewForm
                    type="edit"
                    submitHandle={submitHandle}
                    interviewInfo={interviewInfo}
                    setInterviewInfo={setInterviewInfo}
                />
            </div>
        </PageContainer>
    );
}
