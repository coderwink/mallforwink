import {debounce} from './utils'
import BackTop from "components/contents/backtop/BackTop";
export const finishImgLoadListener = { 
  data() {
    return {
      mixin: '我是mixin变量哦',
    }
  },
  mounted() {
    let newrefresh = debounce(this.$refs.scroll.refresh, 100);
    this.$bus.$on("finishImgLoad",  () => {
      newrefresh()
    })
  }
}


export const backTop = {
  data() {
    return {
      isShowTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    }
  }

}