<template>
  <div>
    <BookInfo :info="info"></BookInfo>    
    <CommentList :comments="comments"></CommentList>
    <div class="comment" v-if="showAdd">
      <textarea v-model="comment" class="textarea" :maxlength="100" placeholder="请输入图书短评"></textarea>
      <div class="location">
        地理位置:
        <switch color="#EA5A49" :checked="location" @change="getGeo"></switch>
        <span class="text-primary">{{location}}</span>
      </div>
      <div class="phone">
        手机型号:
        <switch color="#EA5A49" :checked="phone" @change="getPhone"></switch>    
        <span class="text-primary">{{phone}}</span>    
      </div>
      <button class="btn" @click="addComment">评论</button>
    </div>
    <div v-else class="text-footer">
      未登录或者已经评论过啦
    </div>
    <button open-type="share" class="btn">转发给好友</button>
  </div>
</template>
<script>
  import {get, post, showModal} from '@/util'
  import BookInfo from '@/components/BookInfo'
  import CommentList from '@/components/CommentList'
  export default {
    data () {
      return {
        bookid: '',
        info: {},
        comment: '',
        location: '',
        phone: '',
        userinfo: {},
        comments: []
      }
    },
    computed: {
      showAdd () {
        // 没登陆
        if (!this.userinfo.openId) {
          return false
        }
        // 评论页面理查到有自己的openid
        if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
          return false
        }
        return true
      }
    },
    methods: {
      async getDetail () {
        const info = await get('/weapp/bookdetail', {id: this.bookid})
        wx.setNavigationBarTitle({
          title: info.title
        })
        this.info = info
      },
      getGeo (e) {
        if (e.target.value) {
          wx.getLocation({
            success: geo => {
              this.location = `(${geo.latitude}, ${geo.longitude})`
            }
          })
        } else {
          this.location = ''
        }
      },
      getPhone (e) {
        if (e.target.value) {
          const phoneInfo = wx.getSystemInfoSync()
          this.phone = phoneInfo.model
        } else {
          this.phone = ''
        }
      },
      async addComment () {
        if (!this.comment) {
          return
        }
        const data = {
          comment: this.comment,
          phone: this.phone,
          location: this.location,
          bookid: this.bookid,
          openid: this.userinfo.openId
        }
        try {
          await post('/weapp/addComment', data)
          this.comment = ''
          this.getComments()
        } catch (e) {
          showModal('失败', e.msg)
        }
      },
      async getComments () {
        const comments = await get('/weapp/commentlist', {bookid: this.bookid})
        this.comments = comments.list || []
      }
    },
    mounted () {
      this.bookid = this.$root.$mp.query.id
      this.getDetail()
      this.getComments()
      const userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
      }
    },
    components: {
      BookInfo,
      CommentList
    }
  }
</script>
<style lang="scss">
  .comment {
    margin-top: 10px;
    .textarea {
      background: #eee;
      padding: 10rpx;
      width: 730rpx;
      height: 200rpx;
    }
    .location {
      margin-top: 10px;
      padding: 5px 10px;
    }
    .phone {
      margin-top: 10px;
      padding: 5px 10px;      
    }
  }
</style>
