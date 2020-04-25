<template>
  <div>
    <div class='desc'>
      <div class='top-line'></div>
      <p>{{detailInfo.desc}}</p>
      <div class= 'bottom-line'></div>
    </div>
    <div class='detailImage'>
      <div class='content'><p></p></div>
      <div class='images'>
        <div v-for='(item, index) in detailInfo.detailImage' :key='index'>
          <img :src="item" alt="" @load='imgLoad'>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
// import GoodList from 'components/contents/goods/GoodList'
export default {
 props: {
   detailInfo: {
     type: Object,
     default() {
       return {}
     }
   }
 },
 components: {
  //  GoodList
 },
 computed: {
   detailImages() {
     return  this.detailInfo.detailImage
   }
 },
 methods: {
   //监听
   imgLoad() {
    //  console.log('--');
     this.$emit('imgFinishLoad');
   }
 }
}
</script>

<style scoped>
  .desc {
    margin-top: 20px;
    display:flex;
    background-color: #fff;
    flex-direction:column;
    font-size: 15px;
  }
  .top-line, .bottom-line {
    width: 30%;
    height: 2px;
    background-color: rgba(0, 0, 0, .2);
    position:relative;
  }
  .top-line::before, .bottom-line::after {
    content: '';
    position:absolute;
    width:4px;
    height: 4px;
    background: rgba(0, 0, 0, 1) ;
  } 
  .top-line::before {
    top: -2px;
    left: 0;
  }
 .bottom-line::after {
   right: 0;
   top: -2px;
 }
  .bottom-line {
    align-self: flex-end; 
  }
  .desc p {
    margin:20px 0;
  }
  .detailImage img {
    width: 100%;
  }

</style>