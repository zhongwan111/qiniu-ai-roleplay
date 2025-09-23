<template>
  <div class="mobile-about-container">
    <h1>关于我们</h1>
    <p>这是移动端的关于页面</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MobileAbout",
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.mobile-about-container {
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
