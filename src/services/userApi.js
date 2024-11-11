import { request } from 'umi';

export function getUserByPageApi(params) {
    return request('/api/user', {
        method: 'GET',
        params: {
            ...params,
        },
    });
}

export function getUserByIdApi(id) {
    return request(`/api/user/` + id, {
        method: 'GET',
    });
}

export function addUserApi(newUserInfo) {
    newUserInfo.type = 'background';
    return request('/api/user', {
        method: 'POST',
        data: newUserInfo,
    });
}

export function deleteUserApi(userId) {
    return request(`/api/user/${userId}`, {
        method: 'DELETE',
    });
}

export function updateUserApi(userId, newUserInfo) {
    return request(`/api/user/${userId}`, {
        method: 'PATCH',
        data: newUserInfo,
    });
}

export default {
    getUserByPageApi,
    getUserByIdApi,
    addUserApi,
    deleteUserApi,
    updateUserApi,
};
