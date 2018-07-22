import querystring from 'querystring'
import { message } from 'antd'
import t from '../../i18n'

const http = {}

http.get = function (url, params) {
  return ajax(url, 'GET', params)
}

http.post = function (url, params) {
  return ajax(url, 'POST', params)
}

http.delete = function (url, params) {
  return ajax(url, 'DELETE', params)
}

export const ajax = function (url, method, params) {
  var options = {
    credentials: 'include', // pass cookies, for authentication
    method
  }

  if (params) {
    if (options.method === 'GET') {
      url += '?' + querystring.stringify(params)
    } else if (options.method === 'POST') {
      // headers
      var headers = new Headers()
      headers.append('Content-Type', 'application/json')
      options.headers = headers
      options.body = JSON.stringify(params)
    }
  }

  /* ajax with fetch API */
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(function (response) {
          if (response.ok) {
            response.json().then(function (jsonResp) {
              if (jsonResp.status === 200) {
                resolve(jsonResp.data)
              } else {
                message.error(jsonResp.err || t('ajax.failed'))
                reject(jsonResp.err)
              }
            }, reject)
          } else {
            message.error(response)
            reject(response)
          }
        }, function (err) {
          message.error(err)
        }
      )
  })
}

export default http

