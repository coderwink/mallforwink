<template>
  <div class="bottom-box">
    <div class="bar-left bar-item">
      <div>
        <i class='icon service'></i>
        <span class='text'>客服</span>
      </div>
      <div>
        <i  class="icon shop"></i>
        <span class='text'>店铺</span>
      </div>
      <div >
        <i  class="icon collect"></i>
        <span class='text'>收藏</span>
      </div>
    </div>
    <div class="bar-right bar-item">
      <div class='join-shopCar' @click='cartClick'>加入购物车</div>
      <div class='buy'>购买</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    cartClick() {
     this.$emit('addCart'); 
    }
  }
};
</script>
<style scoped>
.bottom-box {
  width: 100%;
  background-color: #fff;
  text-align: center;
  z-index: 9;
  display:flex;
  height: 49px;
}
.bar-item {
  flex: 1;
  display: flex;
  font-size: 14px;
}
.bar-right {
  line-height: 49px;
}
.icon {
  width: 22px;
  height: 22px;
  background:url('~assets/images/detail/detail_bottom.png') no-repeat ;
  display: block;
  background-size: 22px 150px;
  margin: 0px 5px 10px 28px;
}
.text {
  margin: 0px 5px 2px 25px;
}
.service {
  background-position: 0 -52px;
}
.shop {
  background-position: 0 -98px;
}
.collect {
  background-position: 0 1px;
}
.join-shopCar {
  flex: 1;
  background-color: yellow;
  align-self: center;
}
.buy {
  background-color: rgb(253, 52, 85);
  flex: 1;
  color: #ffffff;
}
</style>