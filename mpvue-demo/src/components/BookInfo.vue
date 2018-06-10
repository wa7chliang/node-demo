<template>
  <div class="bookinfo">
    <div class="thumb">
      <img class="back" :src="info.image" mode="aspectFill">
      <img :src="info.image" class="img" mode="aspectFit">      
      <div class="info">
        <div class="title">
          {{info.title}}
        </div>
        <div class="author">
          {{info.author}}
        </div>
      </div>
    </div>
    <div class="detail">
      <img :src="userinfo.image" class="avatar" mode="aspectFit">
      {{userinfo.name}}
      <div class="right text-primary">
        {{info.rate}}分
        <Rate :value="info.rate"></Rate>        
      </div>
    </div>
    <div class="detail">
      {{info.publisher}}
      <div class="right">
        {{info.price}}
      </div>
    </div>
    <div class="tags">
      <div class="badge" v-for="(tag, index) in info.tags" :key="index">{{tag}}</div>
    </div>
    <div class="summary">
      <p v-for="(sum, index) in info.summary" :key="index">{{sum}}</p>
    </div>
  </div>
</template>
<script>
  import Rate from '@/components/Rate'
  export default {
    props: ['info'],
    computed: {
      userinfo () {
        return this.info.user_info || {}
      }
    },
    components: {
      Rate
    }
  }
</script>
<style lang="scss" scoped>
  .bookinfo {
    font-size: 14px;    
    .right {
      float: right;
    }
    .detail {
      padding: 5px 10px;
      font-size: 14px;
      .avatar {
        width: 20px;
        height: 20px;
        border-radius: 80%;
        vertical-align: middle;
      }
    }
    .thumb {
      width: 750rpx;
      height: 500rpx;
      overflow: hidden;
      position: relative;
      .back {
        width: 100%;
        filter: blur(15px);
      }
      .img {
        position: absolute;
        width: 100%;
        height: 300rpx;
        left: 0;
        top: 30rpx;
      }
      .info {
        color: white;
        position: absolute;
        width: 100%;
        left: 0;
        top: 330rpx;
        text-align: center;
        .title {
          font-size: 14px;
        }
        .author {
          font-size: 14px;
        }
      }
    }
    .badge {
      display: inline-block;
      margin: 5px;
      border-radius: 10px;
      border: 1px solid #EA5A49;
      color: #EA5A49;
      padding: 5px;
    }
    .summary {
      padding: 0 15px;
      margin-top: 10px;
      p {
        text-indent: 2em;
        font-size: 14px;
      }
    }
  }
</style>
