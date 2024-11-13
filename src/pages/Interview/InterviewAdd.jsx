import { useState } from 'react';

import { useNavigate } from '@umijs/max';

import { PageContainer } from '@ant-design/pro-components';
import { message } from 'antd';

import InterviewForm from './components/InterviewForm';

import { addInterviewApi } from '@/services/interviewApi';

export default function InterviewAdd(props) {
    const [newInterviewInfo, setNewInterviewInfo] = useState({
        interviewTitle: '',
        interviewContent: '',
        typeId: '',
    });

    const navigate = useNavigate();

    function submitHandle(interviewContent) {
        addInterviewApi({
            ...newInterviewInfo,
            interviewContent,
        });
        message.success('添加题目成功！');
        navigate('/interview/interviewlist');
    }

    return (
        <PageContainer>
            <div className="container" style={{ width: 1000 }}>
                <InterviewForm
                    type="add"
                    interviewInfo={newInterviewInfo}
                    setInterviewInfo={setNewInterviewInfo}
                    submitHandle={submitHandle}
                ></InterviewForm>
            </div>
        </PageContainer>
    );
}
