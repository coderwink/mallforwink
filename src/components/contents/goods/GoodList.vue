<template>
  <div class='good-list'>
    <!-- 这里要给我遍历出item来 子组件提出需求 -->
    <good-list-item  v-for='(item, index) in goods' :key='index' :good-item='item' class='good-list-item' /> 
  </div>
</template>
<script>
import GoodListItem from './GoodListItem'
export default {
  components: {
    GoodListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .good-list {
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    text-align: center;
  }
</style>