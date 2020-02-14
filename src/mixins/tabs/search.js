import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    value: '',
 // 搜索建议数据数组
    SuggestList: [],
 // 存储本地历史记录的数组
    keysList: [],
    // 控制用户没输内容，显示历史记录，否则显示商品列表
    isShowHistory: false,
 // 关键字
    query: '',
 // 商品分类ID
    cid: ''
  }
// 搜索建议列表
  async getSuggestList(inputvalue) {
    const { data: res } = await wepy.get('/goods/qsearch', { query: inputvalue })
    console.log(res)
    if(res.meta.status !== 200)
      wepy.baseToast()
// 把列表数据放到数组中
    this.SuggestList = res.message
    this.$apply()
    console.log(this.SuggestList)
  }
// 商品列表函数
  async getGoodsList(key, id) {
    const result = await wepy.get('/goods/search', {
      query: key,
      cid: id,
      pagenum: 1,
      pagesize: 10
    })
    console.log(result)
  }

  methods = {
// 用户输入时触发
    onChange(e) {
      console.log(e.detail)
// 如果用户输入内容删掉为空不发送请求
      if (e.detail.trim().length === 0) {
        this.isShowHistory = false
        return
      }
      this.isShowHistory = true
      this.getSuggestList(e.detail) 
    },
// 用户按下回车触发
    onSearch(e) {
      console.log(e.detail)
      var key = e.detail.trim()
      if (key.length === 0) return
      // this.isShowHistory = true
// 否则输入值有效
      if(this.keysList.indexOf(key) === -1) {
        this.keysList.unshift(key)
      }

 // 数组中只能存储10个,超过10个就把最后面的覆盖
      this.keysList = this.keysList.slice(0, 10)
 // 用户按下回车确定后,有历史记录,把历史记录存储到本地存储中
      wepy.setStorageSync('key', this.keysList)
      console.log(this.keysList)

 // 跳转到商品列表页
      wepy.navigateTo({
        url: '/pages/goods_list?query=' + key
      })
 // 发送商品列表页请求
      this.getGoodsList()
    },
 // 清除本地存储
    clear() {
      this.keysList = []
      wepy.setStorageSync('key', [])
    },
 // 点击页签跳转到商品列表页
    goGoodsList(name) {
      wepy.navigateTo({
        url: '/pages/goods_list?query=' + name
      })
    }
  }
  onLoad() {
// 页面加载就刷新
    this.keysList = wepy.getStorageSync('key')
  }
}
