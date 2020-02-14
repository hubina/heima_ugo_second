import wepy from 'wepy'

// 配置请求头
const baseURL = 'https://www.uinav.com/api/public/v1'

// 配置get请求
wepy.get = function(url, data = {}) {
  return wepy.request({
    url: baseURL + url,
    method: 'GET',
    data
  })
}

// 配置post请求
wepy.post = function(url, data = {}) {
  return wepy.request({
    url: baseURL + url,
    method: 'POST',
    data
  })
}

// wx.showToast({
//   title: '成功',
//   icon: 'success',
//   duration: 2000
// })

// 配置消息弹框
wepy.baseToast = function(str = '获取数据失败') {
	return wepy.showToast({
		title: str,
		icon: 'none',
		duration: 2000
	})
}
