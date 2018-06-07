<template>
  <div>
    <Card v-for="(book, index) in books" :key="index" :book='book'></Card>
    <p class="text-footer" v-if="!more">没有更多数据</p>
  </div>
</template>
<script>
  import {get} from '@/util'
  import Card from '@/components/Card'
  export default {
    data () {
      return {
        books: [],
        page: 0,
        more: true
      }
    },
    methods: {
      async getList (init) {
        if (init) {
          this.page = 0
          this.more = true
        }
        wx.showNavigationBarLoading()
        const book = await get('/weapp/booklist', {page: this.page})
        if (book.list.length < 10 && this.page > 0) {
          this.more = false
        }
        if (init) {
          this.books = book.list
          wx.stopPullDownRefresh()
        } else {
          this.books = this.books.concat(book.list)
        }

        wx.hideNavigationBarLoading()
      }
    },
    // 小程序的下拉刷新函数
    onPullDownRefresh () {
      this.getList(true)
    },
    // 滚动底部加载
    onReachBottom () {
      if (!this.more) {
        return false
      } else {
        this.page = this.page + 1
        this.getList()
      }
    },
    mounted () {
      this.getList(true)
    },
    components: {
      Card
    }
  }
</script>
<style>

</style>
