<template>
  <div>
    <div class="shop-list-item">
      <div class="item-left">
        <div><checked-box class='check' @click.native='checkClick' :isChecked='item.isChecked'></checked-box></div>  
        <div>
          <img :src="item.topImages" class="topImage" />
        </div>
      </div>
      <div class="item-right">
        <div class="title">{{item.title}}</div>
        <div class="desc">{{item.desc}}</div>
        <div class="other">
          <span class="price">￥{{item.price}}</span>
          <span class="count">x{{item.count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckedBox from './CheckedBox'
export default {
  name: "CartListItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    CheckedBox
  },
  methods: {
    checkClick() {
      return this.item.isChecked = !this.item.isChecked
    }
  }
};
</script>

<style scoped>
.shop-list-item {
  margin-top: 20px;
  display: flex;
  width: 100%;
  height: 120px;
}
.topImage {
  width: 80px;
  border-radius: 5px;
}
.item-left {
  width: 80px;
  display: flex;
  align-items:center;
  justify-items: center;
}
.item-right {
  padding-left: 40px;
}
.title,
.desc {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 250px;
}
.title {
  font-size: 15px;
}
.desc {
  font-size: 13px;
  margin-top: 20px;
  margin-left: 10px;
}
.other {
  margin-top: 40px;
  margin-left: 26px;
}
.price {
  color: var(--color-high-text);
}
.count {
  margin-left: 140px;
}
.check {
  margin: 0 5px;
}
</style>