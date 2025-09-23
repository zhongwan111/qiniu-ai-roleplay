<template>
  <div class="about-container">
    <h1>关于我们</h1>
    <p>这是PC端的关于页面</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PcAbout",
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.about-container {
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
