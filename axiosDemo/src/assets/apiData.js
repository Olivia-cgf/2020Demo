import $axios from './httpApi'
import api from './apiUrl'

let service = {

}

Object.keys(api.url).forEach(key => {
  service[key] = (data, method = 'get') => {
    if (method.toLowerCase() == 'get') {
      return $axios.get(api.url[key], {
        params: data
      })
    } else if (method.toLowerCase() == 'post') {
      return $axios.post(api.url[key], data)
    }
  }
})

export default service
