//更改用户状态信息
export const userStatus = (state, user) => {
    //判断用户是否存在
    if (user != null) {
        state.isLogin = true;
    } else {
        //登出时清空sessionStroage里面的参数
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("userToken", '');
        state.isLogin = false;
    }
    state.user = user
}
//更改token
export const setToken = (state, token) => {
    if (token != null) {
        state.token = token;
    } else {
        state.token = '';
    }
}
//修改index
export const setIndex = (state,index) =>{
    state.index = index
}