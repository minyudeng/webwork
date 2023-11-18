import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 30000
})

request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'multipart/form-data;charset=utf-8'
    config.headers['Token'] = sessionStorage.getItem('userToken')
    return config
}, error => {
    console.error('requset error' + error)
    return Promise.reject(error)
})

request.interceptors.response.use(
    response => {
        if (response.data.code == '200') {
            let res = response.data
            if (typeof res === 'string') {
                res = res ? JSON.parse(res) : res
            }
            return res
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        console.error('requset error' + error)
        return Promise.reject(error)
    }
)
export default request