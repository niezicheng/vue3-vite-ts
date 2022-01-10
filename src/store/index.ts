import { createStore, Store, useStore as useVuexStore } from 'vuex';
import { InjectionKey } from 'vue';

export interface State {
  count: number;
}

export const key: InjectionKey<Store<State>> = Symbol('store-key');

// 处理 state 类型
export const useStore = () => {
  return useVuexStore(key);
};

const store = createStore<State>({
  // 数据源
  state: {
    count: 0
  },
  // 计算操作
  getters: {},
  // 同步操作
  mutations: {
    increment(state) {
      state.count += 1;
    }
  },
  // 异步操作
  actions: {
    incrementAction: ({ commit }) => {
      setTimeout(() => {
        commit('increment');
      }, 2000);
    }
  },
  // 模块划分
  modules: {}
});

export default store;
