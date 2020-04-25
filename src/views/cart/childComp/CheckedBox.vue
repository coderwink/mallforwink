<template>
  <div>
    <div class="check" :class="{ checked: isChecked}">
      <img src="~assets/images/cart/tick.svg" alt />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default() {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.check {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid #ccc;
}
.checked {
  background-color: red;
  border-color: red;
}
</style>