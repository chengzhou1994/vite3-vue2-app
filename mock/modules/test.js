// test.js 仅做示例: 通过GET请求返回一个名字数组
export default [
  {
    url: '/api/users',
    method: 'get',
    response: (req) => {
      return {
        code: 0,
        data: [
          {
            name: 'tom'
          },
          {
            name: 'jerry'
          }
        ]
      }
    }
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'vben'
      }
    }
  }
]
