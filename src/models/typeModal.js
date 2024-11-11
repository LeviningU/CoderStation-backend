import TypeController from '../services/typeApi';

export default {
    namespace: 'typeModal',
    state: {
        typeList: [],
    },
    reducers: {
        setTypeList(state, { payload }) {
            return {
                ...state,
                typeList: payload,
            };
        },
        deleteType(state, { payload }) {
            return {
                ...state,
                typeList: state.typeList.filter(
                    (item) => item._id !== payload._id,
                ),
            };
        },
        addType(state, { payload }) {
            return {
                ...state,
                typeList: [...state.typeList, payload],
            };
        },
    },
    effects: {
        *_getTypeList(_, { put, call }) {
            const { data } = yield call(TypeController.getTypeApi);
            yield put({ type: 'setTypeList', payload: data });
        },
        *_deleteType({ payload }, { put, call }) {
            yield call(TypeController.deleteTypeApi, payload._id);
            yield put({ type: 'deleteType', payload });
        },
        *_addType({ payload }, { put, call }) {
            const { data } = yield call(TypeController.addTypeApi, payload);
            yield put({ type: 'addType', payload: data });
        },
    },
};
