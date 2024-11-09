import AdminController from '../services/adminApi';

export default {
    namespace: 'adminModal',
    state: {
        adminList: [],
        adminInfo: null,
    },
    reducers: {
        setAdminList(state, { payload }) {
            return {
                ...state,
                adminList: payload,
            };
        },
        deleteAdmin(state, { payload }) {
            return {
                ...state,
                adminList: state.adminList.filter(
                    (item) => item._id !== payload._id,
                ),
            };
        },
        updateAdmin(state, { payload }) {
            return {
                ...state,
                adminList: state.adminList.map((item) => {
                    if (item._id === payload.adminInfo._id) {
                        return {
                            ...item,
                            ...payload.newAdminInfo,
                        };
                    }
                    return item;
                }),
            };
        },
        addAdmin(state, { payload }) {
            return {
                ...state,
                adminList: [...state.adminList, payload],
            };
        },
        setAdminInfo(state, { payload }) {
            return {
                ...state,
                adminInfo: payload,
            };
        },
    },
    effects: {
        *_getAdminList(_, { put, call }) {
            const { data } = yield call(AdminController.getAdminListApi);
            yield put({ type: 'setAdminList', payload: data });
        },
        *_deleteAdmin({ payload }, { put, call }) {
            yield call(AdminController.deleteAdminApi, payload._id);
            yield put({ type: 'deleteAdmin', payload });
        },
        *_updateAdmin({ payload }, { put, call }) {
            yield call(
                AdminController.updateAdminApi,
                payload.adminInfo._id,
                payload.newAdminInfo,
            );
            yield put({ type: 'updateAdmin', payload });
        },
        *_addAdmin({ payload }, { put, call }) {
            const { data } = yield call(AdminController.addAdminApi, payload);
            yield put({ type: '_getAdminList', payload: data });
        },
    },
};
