<template>
  <div class="detail-comment" v-if='Object.keys(comment).length !== 0 '>
    <div class="comment-top">
      <span class="text">用户评论</span>
      <a href class="more">
        <span>更多</span>
        <span>></span>
      </a>
    </div>
    <div class="comment-middle">
      <div class="info-user">
        <img :src="comment.avatar" class="avatar" />
        <span class="uname">{{comment.uname}}</span>
      </div>
      <div class="content">{{comment.content}}</div>
    </div>
    <div class="comment-bottom">
      <div class="info-style">
        <span class="date">{{comment.created | showDate}}</span>
        <span class="style">{{comment.style}}</span>
      </div>
      <div class="info-image">
        <img src="item" alt v-for="(item, index) in comment.images" :key="index" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  props: {
    comment: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    showDate(value) {
      // 首先将时间戳转变成对象 日期对象
      let date = new Date(value * 1000);
      return formatDate(date, "yyyy-MM-dd");
    }
  }
};
</script>

<style scoped>
.detail-comment {
  font-size: 14px;
  background-color: #fff;
}
.comment-top {
  margin-top: 30px;
  position: relative;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
}
.comment-top .more {
  position: absolute;
  right: 0;
}
.info-user {
  display: flex;
  line-height: 45px;
  font-size: 14px;
}
.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.uname {
  margin-left: 20px;
  font-weight: 600;
}
.content {
  font-size: 12px;
  line-height: 20px;
}
.date,
.style {
  font-size: 12px;
  color: rgb(173, 170, 170);
}
</style>.