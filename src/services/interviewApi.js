import { request } from 'umi';

export function getInterviewByPageApi(params) {
    return request('/api/interview', {
        method: 'GET',
        params: {
            ...params,
        },
    });
}

export function getInterviewByIdApi(interviewId) {
    return request(`/api/interview/${interviewId}`, {
        method: 'GET',
    });
}

export function addInterviewApi(newInterviewInfo) {
    return request('/api/interview', {
        method: 'POST',
        data: newInterviewInfo,
    });
}

export function deleteInterviewApi(interviewId) {
    return request(`/api/interview/${interviewId}`, {
        method: 'DELETE',
    });
}

export function updateInterviewApi(interviewId, newInterviewInfo) {
    return request(`/api/interview/${interviewId}`, {
        method: 'PATCH',
        data: newInterviewInfo,
    });
}

export default {
    getInterviewByPageApi,
    getInterviewByIdApi,
    addInterviewApi,
    deleteInterviewApi,
    updateInterviewApi,
};
