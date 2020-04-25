<template>
  <div id='cart'>
    <nav-bar class="nav-bar" >
      <div slot="center" >购物车({{$store.state.cartList.length }})</div>
    </nav-bar>
    <scroll class='content'>
        <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar class='bottom-bar'></cart-bottom-bar>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import NavBar from "components/common/navbar/NavBar";
import CartList from './childComp/CartList'
import CartBottomBar from './childComp/CartBottomBar'
export default {
  name: "Cart",
  components: {
    Scroll,
    NavBar,
    CartList,
    CartBottomBar
  }
};
</script>

<style scoped>
#cart {
    height: 100vh;
    overflow: hidden;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 93px;
    overflow: hidden;
}
.bottom-bar {
    width: 100%;
    position:absolute;
    z-index: 9;
    bottom: 49px
}
</style>
