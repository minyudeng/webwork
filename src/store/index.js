import { createStore } from 'vuex'
import * as getters from'./getters'
import * as mutations from'./mutations'
import * as actions from'./actions'

export default createStore({
  state: {
    user: null,
    isLogin: false,//登录状态
    token: '' ,//用户登录成功后持有的toke
    index: '1'
    
  },
  getters,
  mutations,
  actions,
  modules:{
    
  },
})
