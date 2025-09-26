import { defineStore } from "pinia";

interface UserState {
  id: string | null;
  name: string | null;
  isLoggedIn: boolean;
}

// 创建用户状态存储
export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    id: null,
    name: null,
    isLoggedIn: false,
  }),

  getters: {
    // 获取用户信息
    userInfo(): { id: string | null; name: string | null } {
      return {
        id: this.id,
        name: this.name,
      };
    },
  },

  actions: {
    // 登录
    login(id: string, name: string) {
      this.id = id;
      this.name = name;
      this.isLoggedIn = true;
    },

    // 登出
    logout() {
      this.id = null;
      this.name = null;
      this.isLoggedIn = false;
    },
  },
});
