// 运行时配置
import url from './assets/icon4.png';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  return { name: '管理员' };
}

export const layout = () => {
  return {
    logo: url,
    menu: {
      locale: false,
    },
  };
};
