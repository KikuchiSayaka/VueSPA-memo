<template>
  <div class="directive-page">
    <h2>学習2：ディレクティブ</h2>

  <!-- Javascriptで実装 -->
    <h3><span class="badge badge-secondary">JavaScript</span></h3>
    <input id="check" type="checkbox" checked="checked">
    <span id="text">チェック時だけ見えるよ</span>
    <br />
    <br />

    <!-- Vue.js -->
    <h3><span class="badge badge-secondary">Vue.js</span></h3>
    <input type="checkbox" v-model="checked">
    <span v-show="checked">チェックの時だけ見えるよ</span>
  </div>
</template>

<script>
  // Javascriptで実装
  window.onload = function() {
    const checkbox = document.getElementById('check');
    checkbox.onchange = function(event) {
      const checked = event.target.checked;
      const text = document.getElementById('text');
      if (checked) {
        text.style.visibility = 'visible';
      } else {
        text.style.visibility = 'hidden';
      }
    };
  }


export default {
  data() {
    return {
    checked : true
    }
  }

}
</script>

<style scoped>
.directive-page {
  padding: 20px;
}
</style>
