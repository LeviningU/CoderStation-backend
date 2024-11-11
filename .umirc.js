import { defineConfig } from '@umijs/max';

export default defineConfig({
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: 'CoderStation',
    },
    dva: {},
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            name: '首页',
            path: '/home',
            component: './Home',
            icon: 'HomeOutlined',
        },
        {
            name: '管理员',
            path: '/admin',
            icon: 'UserOutlined',
            routes: [
                {
                    name: '管理员列表',
                    path: 'adminlist',
                    component: './Admin/AdminList',
                },
                {
                    name: '添加管理员',
                    path: 'adminadd',
                    component: './Admin/AdminAdd',
                },
            ],
        },
        {
            name: '用户',
            path: '/user',
            icon: 'TeamOutlined',
            routes: [
                {
                    name: '用户列表',
                    path: 'userlist',
                    component: './User/UserList',
                },
                {
                    name: '添加用户',
                    path: 'useradd',
                    component: './User/UserAdd',
                },
                {
                    name: '编辑用户',
                    path: 'useredit/:id',
                    component: './User/UserEdit',
                    hideInMenu: true,
                },
            ],
        },
        {
            name: '书籍',
            path: '/book',
            icon: 'ReadOutlined',
            routes: [
                {
                    name: '书籍列表',
                    path: 'booklist',
                    component: './Book/BookList',
                },
                {
                    name: '添加书籍',
                    path: 'bookadd',
                    component: './Book/BookAdd',
                },
                {
                    name: '编辑书籍',
                    path: 'bookedit/:id',
                    component: './Book/BookEdit',
                    hideInMenu: true,
                },
            ],
        },
        {
            name: '面试题',
            path: '/interview',
            icon: 'EditOutlined',
            routes: [
                {
                    name: '面试题列表',
                    path: 'interviewlist',
                    component: './Interview/InterviewList',
                },
                {
                    name: '添加面试题',
                    path: 'interviewadd',
                    component: './Interview/InterviewAdd',
                },
            ],
        },
        {
            name: '问答',
            path: '/issue',
            component: './Issue',
            icon: 'ProfileOutlined',
        },
        {
            name: '评论',
            path: '/comment',
            component: './Comment',
            icon: 'CalendarOutlined',
        },
        {
            name: '类型',
            path: '/type',
            component: './Type',
            icon: 'AppstoreOutlined',
        },
    ],
    proxy: {
        '/api': {
            target: 'http://localhost:7001',
            changeOrigin: true,
        },
        '/static': {
            target: 'http://localhost:7001',
            changeOrigin: true,
        },
        '/res': {
            target: 'http://localhost:7001',
            changeOrigin: true,
        },
    },
    npmClient: 'npm',
});
