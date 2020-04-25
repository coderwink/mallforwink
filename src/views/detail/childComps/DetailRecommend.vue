<template>
  <good-list :goods='recImages'></good-list>
</template>

<script>
import GoodList from "components/contents/goods/GoodList";
export default {
  props: {
    recImages:{
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodList
  }
}
</script>

<style>

</style>