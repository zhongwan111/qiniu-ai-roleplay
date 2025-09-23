<template>
  <div class="not-found-container">
    <h1>404</h1>
    <p>页面不存在</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PcNotFound",
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.not-found-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;

  h1 {
    color: #333;
    font-size: 72px;
    margin-bottom: 20px;
  }

  p {
    margin: 20px 0;
    font-size: 24px;
  }

  a {
    color: #42b983;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
