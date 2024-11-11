import { request } from 'umi';

export function getBookByPageApi(params) {
    return request('/api/book', {
        method: 'GET',
        params: {
            ...params,
        },
    });
}

export function getBookByIdApi(bookId) {
    return request(`/api/book/${bookId}`, {
        method: 'GET',
    });
}

export function addBookApi(newBookInfo) {
    return request('/api/book', {
        method: 'POST',
        data: newBookInfo,
    });
}

export function deleteBookApi(bookId) {
    return request(`/api/book/${bookId}`, {
        method: 'DELETE',
    });
}

export function updateBookApi(bookId, newBookInfo) {
    return request(`/api/book/${bookId}`, {
        method: 'PATCH',
        data: newBookInfo,
    });
}

export default {
    getBookByPageApi,
    getBookByIdApi,
    addBookApi,
    deleteBookApi,
    updateBookApi,
};
