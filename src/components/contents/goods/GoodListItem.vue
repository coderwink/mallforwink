<template>
  <div class="goods-item">
    <img v-lazy="showImg" @load="loadImg" @click='imgClick'/>
    <div class='goods-info'>
      <p>{{ goodItem.title}}</p>
      <span class='price'>{{goodItem.price}}</span>
      <span class='collect'>{{ goodItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    loadImg() {  
      //这个发送了一个事件 两个页面都监听到了， 不好 
      // 方法一
      // if( this.$route.path.indexOf('/home')) {
      //   this.$bus.$emit('homeFinishImgLoad')
      // }else if (this.$route.path.indexOf('/detail')) {
      //   this.$bus.$emit('detailFinishImgLoad')
      // }
      this.$bus.$emit('finishImgLoad')
    },
    imgClick() {    
      this.$router.push('/detail/' + this.goodItem.iid)
    }
  },
  computed: {
    showImg() {
      return this.goodItem.image || this.goodItem.show.img ; //如果前者正确就输出前者 反而输出后者 
    }
  }
};
</script>

<style scoped>
/* myself */
   .goods-item {
    padding-bottom:20px;
    width:48%;
    position: relative;
  }
  .goods-item img {
    width:100%;
    border-radius:10px;
  }
  .goods-info {
    position:absoulte;
    left:0px;
    right:0px;
    font-size: 14px;
  }
  .goods-info p {
    text-overflow: ellipsis;/*文字隐藏后添加省略号*/
    white-space: nowrap;/*强制不换行*/
    overflow: hidden;
    padding:2px 20px 5px;
  }
  .goods-info .price {
    margin-right:20px;
    color: var(--color-high-text)
  }
  .goods-info .collect {
    position:relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
    width: 14px;
    height: 14px;
    left: -15px;
    top: 0px;
  } 
   
   /* coderwhy */
   /*
   .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
    border:3px solid var(--color-tint);
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

   .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px; 
    background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
  } */

</style>