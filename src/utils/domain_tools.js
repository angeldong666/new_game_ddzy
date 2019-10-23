// 返回域名部分，域名为xxx.domain.com/xxx.domain.com.cn之类 ，子域名只包含1个点部分xxx.，不支持xxx.xxx.domain.com
export const getDomainName = (name) => {
  name = name || window.location.hostname
  const pos = name.indexOf('.') + 1
  return name.substr(pos)
}
