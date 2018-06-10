<template>
  <div class="comment-list">
    <div class="page-title" v-if="comments.length">
      <p>评论</p>
    </div>
    <div class="comment" v-for="comment in comments" :key="comment.id">
      <div class="user">
        <div class="inline">
          <img :src="comment.image" mode="aspectFit" class="avatar">
          {{comment.title}}
        </div>
        <div class="right">
          {{comment.location || '未知地点'}}
          <div class="text-primary">--</div>
          {{comment.phone || '未知型号'}}
        </div>
      </div>
      <div class="content">
        {{comment.comment}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['comments']
  }
</script>
<style lang="scss" scoped>
  .comment-list {
    background: #eeeeee;
    font-size: 14px;
    .comment {
      background: white;
      margin-bottom: 10px;
      padding: 5px 20px;
      .content {
        margin: 10px 0;
      }
      .user {
        .text-primary {
          display: inline-block;
        }
        .inline {
          display: inline;
          .avatar {
            width: 20px;
            height: 20px;
            border-radius: 60%;
          }
        }
      }
    }
  }
</style>
