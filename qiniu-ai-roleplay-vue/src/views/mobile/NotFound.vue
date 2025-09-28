<template>
  <div class="mobile-not-found-container">
    <h1>404</h1>
    <p>页面不存在</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MobileNotFound",
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.mobile-not-found-container {
  padding: 15px;
  text-align: center;

  h1 {
    color: #333;
    font-size: 48px;
    margin-bottom: 15px;
  }

  p {
    margin: 15px 0;
    font-size: 18px;
  }

  a {
    color: #42b983;
    text-decoration: none;
    font-size: 16px;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
