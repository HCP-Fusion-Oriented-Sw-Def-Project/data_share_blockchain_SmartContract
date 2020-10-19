import request from '@/utils/requestParameter'

// 根据算法名获取算法参数
export function getParameter(name) {
  return request({
    dataType: 'json',
    url: '/algoParameter/getParamByAlgoName',
    methods: 'get',
    params: {
      algoName: name
    }
  })
}
