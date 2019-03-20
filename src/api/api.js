import axios from 'axios';
// 获取所有场次列表·获取所有场次列表
export function getChoose_house(url,data={}) {
  return axios.get(url, {
  	params:data
  })
}