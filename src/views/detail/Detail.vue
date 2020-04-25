<template>
  <div id="detail">
    <detail-nav class="detail-nav" @isActiveClick="navClick" ref='nav'></detail-nav>
    <scroll
      class="content"
      ref="scroll"
      @scrollPosition="scrollPosition"
      :pull-up-load="true"
      :probe-type="3"
    >
      <detail-swiper :img-item="topImages" ref="swiper"></detail-swiper>
      <detail-base-info :info="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-info :detailInfo="detailInfo" @imgFinishLoad="imgFinishLoad"></detail-info>
      <detail-params :itemParams="itemParams" ref="params"></detail-params>
      <detail-comment :comment="comment" ref="comment"></detail-comment>
      <detail-recommend :recImages="recommendImage" class="rec-image" ref="recommend"></detail-recommend>
    </scroll>
    <detail-bottom class='detail-bottom' @addCart='addToCart'></detail-bottom>
    <back-top @click.native="backClick" v-show="isShowTop"></back-top>
    <!-- <toast></toast> -->
  </div>
</template>
<script>
import DetailNav from "./childComps/DetailNav";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailInfo from "./childComps/DetailInfo";
import DetailParams from "./childComps/DetailParams";
import DetailComment from "./childComps/DetailComment";
import DetailRecommend from "./childComps/DetailRecommend";
import DetailBottom from './childComps/DetailBottom'

import Scroll from "components/common/scroll/Scroll";
// import Toast  from 'components/common/toast/Toast'

import { debounce } from "common/utils";
import { finishImgLoadListener, backTop  } from "common/mixin";

import {
  getDetail,
  Goods,
  Shop,
  Detailinfo,
  ItemParams,
  Comment,
  getRecommend,

} from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      comment: {},
      recommendImage: [],
      // message: '',
      // isShow: false,
      themeTopYs: [],
      currentIndex: 0,
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    //根据id获取item数据， 之后
    getDetail(this.iid).then(res => {
      // console.log(res);
      let data = res.result;
      this.topImages = data.itemInfo.topImages;
      //创建一个商品的信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //创建一个商家的信息
      this.shop = new Shop(data.shopInfo);
      //创建一个详细图片信息
      this.detailInfo = new Detailinfo(data.detailInfo);
      //创建一个尺寸 规则做工信息
      this.itemParams = new ItemParams(data.itemParams);

      //接受 判断有没有
      if (data.rate.cRate !== 0) {
        this.comment = new Comment(data.rate.list[0]);
      }
      // this.$nextTick(() => {
      //   //值不对 这个$nextTick 是渲染已经加载完成的DOM　不包括加载图片的，　所以我们一刷新就没了
      //   this.themeTopYs = []; //每一次重新赋值都清零一次， 不然一直追加到数组后面
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });
    getRecommend().then(res => {
      // console.log(res);
      this.recommendImage = res.data.list;
    });
  },
  mixins: [finishImgLoadListener,backTop],
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailInfo,
    DetailParams,
    DetailComment,
    DetailRecommend,
    DetailBottom,
    // Toast
  },
  mounted() {
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = []; //每一次重新赋值都清零一次， 不然一直追加到数组后面
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 100);
  },
  distoryed() {
    this.$bus.$of("finishImgLoad", () => {
      refresh();
    });
  },
  methods: {
    imgFinishLoad() {
      //目的达到了
      this.getThemeTopYs();
      this.$refs.scroll.refresh();
    },
    scrollPosition(position) {
      let positionY = -position.y
      this.isShowTop = positionY > 1000;
      /**
       * themeTopY = [0, 100, 1000 , 10000]
       * positionY 与主题中的值作比较:
       *  当值处于 0-到主题中的100是 index = 0,
       *  当值处于 100-1000之间的时候 index =1
       *  当值处于 1000-10000之间的时候 index =2
       *  当值处于 10000-一个很大的数字时候  index =3  这个很大的数字 js 有一个常量 Number.MAX_VALUE 
       */
      for(var i = 0; i < this.themeTopYs.length; i++) {   //in  拿到的是一个!!字符串!!的索引 ,  of 遍历出的是 值 
          if((this.currentIndex !== i) && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1 ])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
      }   
    },
    navClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    addToCart() {
      const cartInfo = {};
      cartInfo.price = this.goods.realPrice;
      cartInfo.iid = this.iid;
      cartInfo.topImages = this.topImages[0]
      cartInfo.title = this.goods.title
      cartInfo.desc = this.detailInfo.desc
      this.$store.dispatch("addCartShop", cartInfo).then(res => {
        // this.message = res;
        // this.isShow = !this.isShow;  
        //在这里可以实现 ， 这些代码又要重复的写入到购物车全选页面中， 非常的麻烦 所以我们需要封装一个全局插件
        console.log(this.$toast);
        this.$toast.show(res, 1000)
      
      });
      this.$refs.scroll.refresh()
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  /* 方法一：height: calc(100% - 44px)
       方法二：
        position: absolute;
        top: 44px;
        bottom: 0px;
        left: 0;
        right: 0;
    
     */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.rec-image {
  position: relative;
  z-index: 9;
}
.detail-bottom {
  position: absolute;
  bottom: 0;
}
</style>