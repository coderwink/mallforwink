<template>
  <!-- 第一 为了保险起见， 你必须让这个页面加载起来才行 ， 所以咱们必须 做一个判断 判断这个对象是不是空值 -->
  <div v-if="Object.keys(info).length !== 0">
    <!-- 这里 -->
    <p class="info-title">{{info.title}}</p>
    <div class='info-price'>
      <span class="newPrice">{{info.price}}</span>
      <span class='oldPrice'>{{info.oldPrice}}</span>
      <span v-if='info.discountDesc' class='discountDesc'>{{info.discountDesc}}</span>
    </div>
    <div class='info-other'>
      <span>{{info.columns[0]}}</span>
      <span>{{info.columns[1]}}</span>
      <span>{{info.services[info.services.length-1].name}}</span>
    </div>
    <div class='info-service'>
      <span class='info-service-item' v-for='index in info.services.length-1' :key='index' >
        <img :src="info.services[index-1].icon" alt="">
        <span>{{info.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    info: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.info-title {
  margin-top: 10px;
  margin-left: 5px;
  font-weight: 500;
}
.info-price {
  margin-top: 15px;
  margin-left: 5px;
}
.newPrice {
  font-size: 26px;
  color:var(--color-tint);
}
.oldPrice {
  margin-left: 7px;
  text-decoration: line-through;
  font-size: 13px;
  color: #ccc;
}
.discountDesc {
  text-align: center;
  width:50px;
  height:16px;
  background-color: var(--color-high-text);
  color:#fff;
  border-radius:10px;
  display:inline-block;
  position: relative;
  top:-10px;
  font-size: 14px;  
}
.info-other {
  color:rgb(138, 136, 136);
  margin-top: 25px;
  font-size: 12px;
  display: flex;
  box-shadow:1px 1px 0px 0px rgba(0, 0, 0, .1);
}

.info-other span:nth-child(1) {
  flex: 1;
}
.info-other span:nth-child(2) {
  flex: 1;
}
.info-service {
  font-size:13px;
  margin-top: 25px;
  display: flex;
  padding-bottom: 15px;
  box-shadow:3px 3px 1px 1px rgba(0, 0, 0, .1);
}
.info-service img {
  width:14px;
}
.info-service-item {
  flex: 1;
}


</style >