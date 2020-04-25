<template>
  <div id="app">
    <keep-alive exclude='Detail'>
      <router-view></router-view>
    </keep-alive>   
    <main-tar-bar></main-tar-bar>
  </div>
</template>

<script>
import MainTarBar from 'components/contents/maintarbar/MainTarBar'
export default {
  name: 'App',
  components: {
    MainTarBar
  }
}
</script>

<style scoped>
  @import "assets/css/base.css";
</style>
