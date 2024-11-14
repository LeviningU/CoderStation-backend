import { request } from 'umi';

export function getIssueByPageApi(params) {
    return request('/api/issue', {
        method: 'GET',
        params: {
            ...params,
        },
    });
}

export function getIssueByIdApi(issueId) {
    return request(`/api/issue/${issueId}`, {
        method: 'GET',
    });
}

export function deleteIssueApi(issueId) {
    return request(`/api/issue/${issueId}`, {
        method: 'DELETE',
    });
}

export function updateIssueApi(issueId, issueInfo) {
    return request(`/api/issue/${issueId}`, {
        method: 'PATCH',
        data: issueInfo,
    });
}

export default {
    getIssueByPageApi,
    getIssueByIdApi,
    deleteIssueApi,
    updateIssueApi,
};
