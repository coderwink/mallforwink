<template>
  <div>
    <div class="bottom-bar">
      <div  class="checking">
        <checked-box @click.native='checkClick' :isChecked='isSelectAll'></checked-box>
        <span class='content'>全选</span>
      </div>
      <div class='totle'>
         总计：{{totlePrice | changYuan}}
      </div>
      <div class='calculate'> 
        去计算({{totleCount}})
      </div>
    </div>
  </div>
</template>

<script>
import CheckedBox from "./CheckedBox";
export default {
  components: {
    CheckedBox
  },
  computed: {
    totlePrice() {
      //给我想到啊， 首先你必须求和是求什么的和， 求被选中的和啊， 不是每一个
      return this.$store.state.cartList.filter(item => item.isChecked).reduce((oldPrice, item) => {
        return item.count * item.price + oldPrice
      }, 0).toFixed(2)
    },
    totleCount() {
      return this.$store.state.cartList.filter(item => item.isChecked).reduce((preCount, item) => {
        return item.count + preCount
      }, 0)
    },
    isSelectAll() {
      if(this.$store.state.cartList.length === 0) return false
      return this.$store.state.cartList.filter(item => item.isChecked).length === this.$store.state.cartList.length
    }
  },
  filters: {
    changYuan(value) {
      return value + '元'
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {
        this.$store.state.cartList.forEach(item => {
          item.isChecked = false
        });
      }
      else {
        this.$store.state.cartList.forEach(item => {
          item.isChecked = true
        });
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  align-items: center;
  justify-items: center;
  display: flex;
  background-color: #eee;
  height: 45px;
  width: 100%;
  /* line-height: 45px; */
}
.content {
  margin-left: 10px;
}
.checking {
  flex: 1;
  display: flex;
  margin-left: 3px;
}
.totle {
  flex: 1;
}
.calculate {
  width: 110px;
  text-align: center;
  /* flex: 1; */
  background-color:red;
  line-height: 45px;
  color: #fff;
}

</style>