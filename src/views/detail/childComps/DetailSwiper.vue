<template>
  <swiper class='swiper-detail'>
    <swiper-item  v-for='(item, index) in imgItem' :key='index'>
      <!-- 烦的第一个错误必须动态绑定路径 -->
      <img :src="item" alt="">  
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  props: {
    imgItem: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,SwiperItem
  }
}
</script>

<style scoped>
 .swiper-detail {
   height: 300px;
   overflow: hidden;
 }
</style>