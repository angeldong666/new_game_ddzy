/*
 * 皮肤工具测试版
 */

export const getSkinStyle = (data) => {
  let _returnStyle = ''
  for (let key in data) {
    if (key == 'bg') {
      _returnStyle += 'background' + ':url(' + data[key] + ') center center / 100% no-repeat;'
    } else {
      _returnStyle += key + ':' + data[key] + ';'
    }
  }
  return _returnStyle
}

export const getBgStyle = (url) => {
  return 'background' + ':url(' + url + ') center center / 100% no-repeat;'
}