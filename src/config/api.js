/**
 * 域名配置修改到http.js中修改，方便配置
 * 默认api地址不带主机头，统一在axios中添加
 */

// 蛋蛋农场http://192.168.1.32:8010
let xinxin = ''
export const gameApi = {
  homeInfoApi: '/IFS/MyManor/MM_ManorCenter.ashx',
  changeNameApi: '/IFS/MyManor/MM_SetNickname.ashx',
  feedApi: '/IFS/MyManor/MM_SetChickFood.ashx',
  reciveGoldApi: '/IFS/MyManor/MM_SetChickEggs.ashx',

  homePopApi: xinxin + '/IFS/Task/Task_IndexFloat.ashx',
  taskListApi: xinxin + '/IFS/Task/Task_TaskList.ashx',
  taskGoldApi: xinxin + '/IFS/Task/Task_TaskAward.ashx',
  rankListApi: xinxin + '/IFS/MyManor/MM_FriendList.ashx',
  logListApi: xinxin + '/IFS/MyManor/MM_ChickTrack.ashx',

  userInfoApi: '/IFS/MyManor/MM_ChickDetail.ashx',

  clearApi: '/IFS/MyManor/MM_DeleteChick.ashx'
}