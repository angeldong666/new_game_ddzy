/**
 * 域名配置修改到http.js中修改，方便配置
 * 默认api地址不带主机头，统一在axios中添加
 */

export const gameApi = {
  homeInfoApi: '/IFS/MyManor/MM_ManorCenter.ashx',
  changeNameApi: '/IFS/MyManor/MM_SetNickname.ashx',
  feedApi: '/IFS/MyManor/MM_SetChickFood.ashx',
  reciveGoldApi: '/IFS/MyManor/MM_SetChickEggs.ashx',
  popApi: '/IFS/MyManor/MM_GetNotice.ashx',

  homePopApi: '/IFS/Task/Task_IndexFloat.ashx',
  taskListApi: '/IFS/Task/Task_TaskList.ashx',
  taskGoldApi: '/IFS/Task/Task_TaskAward.ashx',
  rankListApi: '/IFS/MyManor/MM_FriendList.ashx',
  logListApi: '/IFS/MyManor/MM_ChickTrack.ashx',
  shopListApi: '/IFS/ManorStore/MS_PropStore.ashx',
  buyApi: '/IFS/ManorStore/MS_BuyingProp.ashx',
  useBuyApi: '/IFS/MyManor/MM_SetProp.ashx',

  userInfoApi: '/IFS/MyManor/MM_ChickDetail.ashx',

  clearApi: '/IFS/MyManor/MM_DeleteChick.ashx',

}