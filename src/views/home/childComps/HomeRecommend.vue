<template>
  <div class='recommend'>
    <div v-for='(item, index) in recommends' :key="index" class='recommend-item'>
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a> 
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends:{
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    text-align: center;
    width:100%;
    display:flex;
    font-size: 12px;
    padding:15px 0 30px;
    border-bottom:8px solid #f2f2f2
  }
  .recommend-item {
    flex:1;
  }
  .recommend-item img {
    width:70px;
    height:70px;
     margin-bottom:10px;
  }
</style>