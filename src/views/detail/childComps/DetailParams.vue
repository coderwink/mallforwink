<template>
  <div class='detailParams'>
    <table v-for='(table, index) in itemParams.tables' :key='index' class='info-rules'>
      <tr v-for='(tr, indey) in table' :key='indey'>
        <td v-for='(td, indez) in tr' :key='indez' :class="{'colorPink':indez === 0}">{{td}}</td>
      </tr>
    </table>
    <table class ='info-param'>
      <tr v-for='(tr, index) in itemParams.set' :key='index'>
        <td class='key'>{{tr.key}}</td>
        <td class='value'>{{tr.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    itemParams: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style scoped>
  .detailParams {
    font-size: 14px;
    background-color: #fff;
  }
  .info-rules {
    width: 100%;
  }
  .info-rules tr {
    display: flex;
    border-bottom: 1px solid rgba(68, 62, 62, .2);
  }
  .info-rules td { 
    flex: 1;
    padding: 10px;
  }
  .colorPink, .key {
    color: var(--color-tint);
    width: 60px;
  }
  .info-param {
    width: 100%;
  }
  .info-param td {
    padding: 10px 20px 10px 10px;
  }
</style>