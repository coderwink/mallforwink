<template>
  <div class='wrapper' ref='wrapper'>
    <div class='content'>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default() {
        return 0
      }
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      scroll: null,
    
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    }),
    this.scroll.on('scroll', position => {
      // console.log(position); 
      this.$emit('scrollPosition', position)
    }),
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp');      
      this.scroll.finishPullUp();
    })
  },
  methods: {
    scrollTo(x, y, esrtime=500) {
      this.scroll.scrollTo(x, y, esrtime)
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll.y
    }



  }
}
</script>

<style scoped>

</style>