import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 20000
axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.post['Content-Type'] = 'x-www-form-urlencoded'
// cookie跨域
// axios.defaults.withCredentials = true
// 本地配置测试用，如接口需要cookie跨域验证，即上面的参数打开时，本地接口代理会有问题
//const LOCAL_HOST = '/api'
// api服务器地址，特殊地址需要在api中添加对应域名

// http://192.168.1.63:8082  赵煜
// http://192.168.1.63:14412 

// http://192.168.1.32:8010  欣欣

// 正式 http://manorapp.pceggs.com

// 测试 http://manortest.pceggs.com

const DEFAULT_API_HOST = ''

axios.defaults.baseURL = DEFAULT_API_HOST
// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? LOCAL_HOST : API_HOST

// POST传参序列化
axios.interceptors.request.use((config) => {
    // 不是.json文件（如tabbar.json）添加 cookie跨域
    if (config.url.indexOf('.json') === -1 && config.url.indexOf('easy-mock.com') === -1) {
        // config.withCredentials = true
    } else {
        // json 取消版本
        if (config.params && config.params.ver) {
            delete(config.params.ver)
        }
    }
    // if (config.method === 'post') {
    //   config.data = qs.stringify(config.data)
    // }
    // params 默认添加参数
    let _isApp = false
    if (config.params) {
        if (config.params.appver || config.params.appver == '') {
            _isApp = true
        }
    }
    if (!_isApp && config.url.indexOf('.json') === -1) {
        config.params = config.params || {}
    }
    return config
}, (error) => {
    console.log('错误的传参')
    return Promise.reject(error)
})

// code状态码200判断
axios.interceptors.response.use((res) => {
    // console.log(res.data)
    if (res.status !== 200) {
        return Promise.reject(res)
    }
    return res
}, (error) => {
    console.log('网络异常')
    return Promise.reject(error)
})

export default axios