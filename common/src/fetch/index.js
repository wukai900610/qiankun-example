import axios from 'axios'
// import Qs from 'qs'

// import Util from './util'
import Sdk from '../sdk'
const instance = axios.create({
  baseURL: '/',
  timeout: 30000,
  headers: {
    // global: Sdk.getLocalData('global'),
    // console.log(globalData);
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'sessionID': Sdk.getCookie('_SessionToken')
  },
  responseType: 'json',
//   transformRequest: [function (data) {
//     data = Qs.stringify(data)
//     return data
//   }]
  // transformResponse: [function(data) {
  // 	  这里提前处理返回的数据
  // 	  console.log(JSON.parse(data));
  // 	  console.log(data);
  // 		return data;
  // 	}
  // ]
})

export default {
  init(router, VM) {
    // console.log('init');
    
    instance.interceptors.response.use(function ({config,data,headers,request,status,statusText}) {
      // console.log(config);
      // 不走拦截
      if(config.config.interceptors === false){
        // console.log(config);
        return data
      }
      // 走拦截
      if(data.code == 0){
        return data
      }else{
        VM.$message({
          message: '接口异常',
          type: 'error'
        })
      }
    }, function (error) {
      console.log(error);
      VM.$message({
        message: '网络异常',
        type: 'error'
      })

      // return Promise.reject(error)
    })
  },
  instance
}