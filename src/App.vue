<template>
<!-- 3. template部：コンポーネント名をHTMLタグとして記述 -->
  <div id="app">
    <NavigationBar />

    <!-- URLによって適切なコンポーネントを表示 -->
    <router-view></router-view>
  </div>
</template>

<script>
// 1. script部：外部ファイルに分離されたコンポーネントをApp.vueへ読み込み
import NavigationBar from '@/components/NavigationBar.vue'

// 2. script部：使用するコンポーネントの宣言
export default {
  name: 'App',
  components: {
    NavigationBar,
  }
}
</script>

<style>
#app {
  height: 100vh;
}
button.transparent {
    margin: 5px;
    background: transparent;
    border: none;
  }
  input.transparent {
    width: 100%;
    border: none;
  }
  input.transparent:focus {
    outline: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
</style>
