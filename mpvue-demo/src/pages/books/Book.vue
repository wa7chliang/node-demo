<template>
  <div>
    <Card v-for="(book, index) in books" :key="index" :book='book'></Card>
  </div>
</template>
<script>
  import {get} from '@/util'
  import Card from '@/components/Card'
  export default {
    data () {
      return {
        books: []
      }
    },
    methods: {
      async getList () {
        const book = await get('/weapp/booklist')
        this.books = book.list
      }
    },
    mounted () {
      this.getList()
    },
    components: {
      Card
    }
  }
</script>
<style>

</style>
