<template>
  <div class= 'nav-bar'>
    <div class='left'><slot name='left'></slot></div>
    <div class='center'><slot name='center'></slot></div>
    <div class='right'><slot name='right'></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
  .nav-bar {
    height:44px;
    line-height:44px;
    width:100%;
    display:flex;
    text-align: center;
  }
  .left, .right {
    width:40px;
  }
  .center {
    flex:1;
  }
</style>