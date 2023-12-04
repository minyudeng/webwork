import axios from "axios";
import qs from 'qs'
//形式1： ids=1&ids=2&id=3
// qs.stringify({ids: [1, 2, 3]}, { indices: false })

//形式2： ids[0]=1&aids[1]=2&ids[2]=3
// qs.stringify({ids: [1, 2, 3]}, {arrayFormat: 'indices'})

//形式3：ids[]=1&ids[]=2&ids[]=3
// qs.stringify({ids: [1, 2, 3]}, {arrayFormat: 'brackets'})

//形式4： ids=1&ids=2&id=3
// qs.stringify({ids: [1, 2, 3]}, {arrayFormat: 'repeat'})
const request = axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 30000
})

request.interceptors.request.use(config => {
    // config.headers['Content-Type'] = 'application/json;charset=utf-8'
    config.headers['Token'] = sessionStorage.getItem('userToken')
    // if(config.method === 'delete'){
    //     //params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
    //     console.log("改变");
    //     config.paramsSerializer = function(params) {
    //         return qs.stringify(params, {arrayFormat: 'repeat'})
    //     }
    // }
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