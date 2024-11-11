import { request } from 'umi';

export function getTypeApi() {
    return request('/api/type', {
        method: 'GET',
    });
}

export function addTypeApi(newTypeInfo) {
    return request('/api/type', {
        method: 'POST',
        data: newTypeInfo,
    });
}

export function deleteTypeApi(typeId) {
    return request(`/api/type/${typeId}`, {
        method: 'DELETE',
    });
}

export function updateTypeApi(typeId, newTypeInfo) {
    return request(`/api/type/${typeId}`, {
        method: 'PATCH',
        data: newTypeInfo,
    });
}

export default {
    getTypeApi,
    addTypeApi,
    deleteTypeApi,
    updateTypeApi,
};
