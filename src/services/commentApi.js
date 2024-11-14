import { request } from 'umi';

export function getCommentByTypeApi(params, commentType) {
    return request(`/api/comment/${commentType}`, {
        method: 'GET',
        params: {
            ...params,
        },
    });
}

export function deleteCommentApi(commentId) {
    return request(`/api/comment/${commentId}`, {
        method: 'DELETE',
    });
}

export default {
    getCommentByTypeApi,
    deleteCommentApi,
};
