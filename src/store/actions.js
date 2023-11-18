//调用mutations
export const setUser = ({commit},user) => {
    commit("userStatus",user);
}
export const setToken = ({commit},token) =>{
    commit("setToken",token);
}
export const setIndex = ({commit},index) =>{
    commit("setIndex",index)
}