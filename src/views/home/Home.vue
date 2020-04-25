<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="home-tab-control1" 
                   :titles="['流行','新款','精选']" 
                   @tabClick="tabClick" 
                   v-show='isShowTab'
                   ref='tabControl1'
                   >
                   </tab-control>   
    <!-- 绑定属性不能使用驼峰哦 -->
    <scroll class="content" 
            ref='scroll' 
            :probe-type='3'
            @scrollPosition='scrollPosition' 
            :pull-up-load='true'
            @pullingUp='pullingUp' >   
      <home-swiper :banners="banners" @imgLoad='imgLoad'/>
      <home-recommend :recommends="recommends" />
      <feature-view />
      <!-- 这个需要被固定 到页面顶部 所以 给个属性简单设置 -->
      <tab-control class="home-tab-control2" :titles="['流行','新款','精选']" @tabClick="tabClick" ref='tabControl'></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <!-- 如果要监听组件里面的native必须 click.native -->
    <back-top @click.native='backClick' v-show='isShowTop'/>
  </div>
</template>

<script scoped>
//思路必须清晰，这里导入的是navbar组件
//第二步开始轮播图
//第三部recommend
//goods商品


import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/contents/tabcontrol/TabControl";
import GoodList from "components/contents/goods/GoodList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/contents/backtop/BackTop"

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultiData, getHomeGoods } from "network/home.js";

import {debounce, formatDate} from 'common/utils.js'
import {finishImgLoadListener} from 'common/mixin.js'
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowTop: false,
      isShowTab: false,
      tabOffsetTop: 0,
      scrollY:0,
    };
  },
  created() {
    // 因为created里面尽量放思路所以  代码抽出放入methods里面
    this.getHomeMultiData();
    //测试data中有什么
    // getHomeGoods('pop', 1).then(res => {
    //   console.log(res);
    // })
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.scrollY, 0);   //得用scrollTo
  },
  deactivated() {
    this.scrollY = this.$refs.scroll.getScrollY();
    //前面一个函数是监听的全局事件， 第二函数是被执行的函数， 我们在这里离开的时候做一个取消
    this.$bus.$off('finishImgLoad', () => {
      refresh()
    })
    // console.log(this.scrollY); 
  },
  mixins:[finishImgLoadListener],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    /**
     * 网络相关的方法
     */
    getHomeMultiData() {
      getHomeMultiData().then(
        res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        },
        err => {
          console.log(err);
        }
      );
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
    // 监听事件
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //当点击完了后记录一下currentIndex属性
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },
    backClick() {
      //这个代码不容易看懂，在scroll内部写一个方法
      //this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      //内部封装一个scrollTo
        this.$refs.scroll.scrollTo(0, 0, 500)
    },
    scrollPosition(position) { 
      this.isShowTop = (-position.y) > 4700
      this.isShowTab = (-position.y) > this.tabOffsetTop
    },
    pullingUp(currentType) {
      this.getHomeGoods(this.currentType); 
    },
    imgLoad() {   
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop 
    },
    //这个方法不许在上面监听 而是
    //防抖函数  创造一个函数， 然后使用传入一个函数 返回一个新的函数  让其做到了只刷新一次
    //  debounce(func, delay) {
    //   let timer = null
    //   return function(args) {
    //     if(timer) clearTimeout(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this, args)
    //     }, delay)
    //   }
    // },

  }
};
</script>
<style scoped>
#home {
  /* 可视大小 */
  height: 100vh;
  position: relative;
  /* padding-top: 44px; */
  padding-bottom: 49px;
}
.home-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
    left: 0;
    right:0;
    top: 0;
    z-index: 9;
}
.home-tab-control1 {
  position:relative;
  background-color: #fff;
  left: 0;
  top: 0;
  z-index: 9;
}
.home-tab-control2 {
  margin-bottom: 20px;
}
.content {
 position: absolute;
 left:0;
 right:0;
 top:44px;
 bottom:49px;
 overflow: hidden;
}
</style>