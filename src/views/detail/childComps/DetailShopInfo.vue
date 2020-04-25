<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" class="logo" />
      <span class="title">{{shop.name}}</span>
    </div>
    <div class='shop-middle'>
      <div class='shop-middle-item shop-middle-left'>
        <div class='info-sells'>
          <div class='sells-count'>{{shop.goodsSell | sellCountFilter}}</div>
          <div class='sells-text'>总销量</div>
        </div>
        <div class='info-goods'>
          <div class='goods-count'>{{shop.goodsCount | sellCountFilter}}</div>
          <div class='goods-text'>全部宝贝</div>
        </div>
      </div>
      <div class='shop-middle-item shop-middle-right'>
        <table>
          <tr v-for="(item, index) in shop.sells" :key='index'>
            <td>{{item.name}}</td>
            <td :class="{'color-score': item.isBetter}" class='score'>{{item.score}}</td>
            <td><span :class="{'color-better':item.isBetter}" class='better'>{{item.isBetter?'高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class='shop-bottom'>
        进店逛逛
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    //这个工作原理就是通过 自动将前面的参数传入到这里面
    sellCountFilter(count) {
      if(count>=10000) {
        let sellCount = count/10000;
        return sellCount.toFixed(1) + '万'
      }
      else{
        return count
      }
    }
  }
};
</script>

<style>
.shop-top {
  margin-left: 1%;
  margin-top: 15px;
  line-height: 45px;
  display: flex;
  align-items: center;
}
.logo {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.title {
  margin-left: 2%;
  vertical-align: middle;
  font-size: 14px;
}
.shop-middle {
  margin-top: 30px;
  display: flex;
  align-items: center;
}
.shop-middle-item {
  flex: 1;
}
.shop-middle-left {
  color: #333;
  display:flex;
  justify-content: space-evenly;
  text-align: center;
}
.sells-count, .goods-count {
  font-size: 18px;
}
.sells-text, .goods-text {
  margin-top: 10px;
  font-size: 14px;
}
.info-goods, .info-sells {
  flex: 1;
}
.shop-middle-right {
  margin-left: 30px;
  color: #333;
  font-size: 13px;
}
.shop-middle-right .score {
  color: #5ea732;
}
.shop-middle-right .better {
  width: 16px;
  height: 16px;
  color: #ffffff;
  background-color: #5ea732;
}
.shop-middle-right .color-score { 
  color: #f13e3a;
}
.shop-middle-right .color-better  {
  background-color: #f13e3a;
}
.shop-middle-right table {
  width: 120px;
  margin-left: 30px;
}
.shop-middle-right tr {
  padding: 5px;
}
.shop-middle-right td {
  padding: 5px 0;
}
.shop-bottom {
  margin-top: 30px;
  text-align: center;
}
</style>