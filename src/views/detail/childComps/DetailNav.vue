<template>
  <div>
    <nav-bar >
      <div class= 'back' slot='left' @click='backClick'>
        <img src="~assets/images/common/back.svg" alt="">
      </div>
      <div class= 'title' slot="center" >
        <div class= 'nav-item' 
             v-for="(item, index) in title" 
             :key="index" 
             :class='{active: currentIndex === index}' @click='isActiveClick(index)'>{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  data() {
    return {
      title: ["详情", "参数", "评论", "推荐"],
      currentIndex: 0,
      isActive: false
    };
  },
  components: {
    NavBar
  },
  methods: {
    backClick() {
      this.$router.go(-1)
    },
    isActiveClick(index) {
      this.currentIndex = index;
      this.$emit('isActiveClick', index)
      // console.log(this.currentIndex, index);
    }
  }
};
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }
  .nav-item {
    flex: 1;
  }
  .back {
    margin-top: 5px;
  }
  .active {
    color: var(--color-high-text)
  }

</style>