import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
  // 存放商品列表的数组
    goodsList: [],
    total: 0,
  // 数据展示最后一页的布尔值，控制触底提示文本的显示与隐藏
    isCover: false
  }
     // 获取商品列表参数
  async getGoodsList() {
    const { data: res } = await wepy.get('/goods/search', {
      query: this.query,
      cid: this.cid,
      pagenum: this.pagenum,
      pagesize: this.pagesize
    })
    console.log(res)
    this.goodsList = [...this.goodsList, ...res.message.goods]
    this.total = res.message.total
    this.$apply()
    console.log(this.goodsList)
    console.log(this.total)
  }

  methods = {
    // 跳转到商品详情页
    goGoodsDetail(id) {
      console.log(id)
      wepy.navigateTo({
        url: '/pages/goods_detail/main?goods_id=' + id
      })
    }
  }
  onLoad(options) {
    console.log(options)
    this.cid = options.cid || ''
    this.query = options.query || ''
         // 页面一加载就调用函数
    this.getGoodsList()
  }
  // 上拉事件
  onReachBottom() {
    console.log('触底啦')
    // 判断下是否到达最后一页  公式
    if(this.pagenum * this.pagesize >= this.total) {
      // 说明到达最后一页啦
      this.isCover = true
      return
    }
    this.pagenum++
    this.getGoodsList()
  }
}
