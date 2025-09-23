<template>
  <div class="home-container">
    <h1>PC端首页</h1>
    <p>这是PC端的首页内容</p>
    <router-link to="/about">关于我们</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PcHome",
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.home-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    color: #333;
    font-size: 28px;
  }

  p {
    margin: 20px 0;
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
