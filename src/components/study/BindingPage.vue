<template>
  <div class="binding-page">
    <h2>学習1：双方向バインディング</h2>

    <!-- Javascriptで実装 -->
    <h3><span class="badge badge-secondary">JavaScript</span></h3>
    <input class="form-control" id="name" />
    <span id="text">入力された名前はです</span>
    <br />
    <br />

    <!-- Vue.Javascriptで実装 -->
    <h3><span class="badge badge-secondary">Vue.js</span></h3>
    <input  class="form-control" v-model="name">
    <span>入力された名前は{{name}}です</span>
  </div>
</template>

<script>
// Javascriptで実装
  window.onload = function() {
    // <input>要素に対しては入力が行われた際に呼び出すイベントを登録
      const nameInput = document.getElementById('name');
      nameInput.oninput = function() {
      const name = nameInput.value;
    // <span>要素に対しては入力された内容を受け取って表示
      const text = document.getElementById('text');
      text.innerHTML = '入力された名前は' +  name + 'です';
    };
  }

// Vue.jsで実装
export default {
  // Vue内で使用する変数を返却するdataという関数を作成
  data(){
    // 使用したい変数名と初期値を"変数名 : 初期値"の形でv-modelに使った変数定義
    return {
      name: ''
    }
  }
}
</script>

<style scoped>
.binding-page {
  padding: 20px;
}
</style>
