<template>
  <div class="mobile-home-container">
    <h1>移动端首页</h1>
    <p>这是移动端的首页内容</p>
    <router-link to="/about">关于我们</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MobileHome",
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.mobile-home-container {
  padding: 15px;

  h1 {
    color: #333;
    font-size: 24px;
  }

  p {
    margin: 15px 0;
    font-size: 16px;
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
