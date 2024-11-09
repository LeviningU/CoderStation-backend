import { request } from '@umijs/max';

export async function getAdminListApi() {
    return await request('/api/admin', {
        method: 'GET',
    });
}

export async function deleteAdminApi(id) {
    return await request(`/api/admin/${id}`, {
        method: 'DELETE',
    });
}

export async function updateAdminApi(id, data) {
    return await request(`/api/admin/${id}`, {
        method: 'PATCH',
        data,
    });
}

export async function addAdminApi(data) {
    return await request('/api/admin', {
        method: 'POST',
        data,
    });
}

export async function checkLoginIdApi(id) {
    return await request(`/api/admin/adminIsExist/` + id, {
        method: 'GET',
    });
}

export default {
    getAdminListApi,
    deleteAdminApi,
    updateAdminApi,
    addAdminApi,
    checkLoginIdApi,
};
