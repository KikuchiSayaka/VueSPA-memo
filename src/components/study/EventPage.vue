<template>
  <div class="event-page">
    <h2>学習3：イベント</h2>

    <!-- javascriptで実装 -->
    <h3><span class="badge badge-secondary">JavaScript</span></h3>
    <span id="countText">クリックされた回数は0回です</span><br>
    <button id="button" class="btn btn-sm btn-info m-2">Click Me</button>
    <button id="resetBtn" class="btn btn-sm btn-dark">リセット</button>
    <br>
    <br>
    <!-- Vue.jsで実装 -->
    <h3><span class="badge badge-secondary">Vue.js</span></h3>
    <span>クリックされた回数は{{count}}回です</span><br>
    <button id="button" class="btn btn-sm btn-info m-2" @click="onClickButton()">Click Me</button>
    <button id="resetBtn" class="btn btn-sm btn-dark" @click="onClickResetBtn()">リセット</button>

  </div>
</template>

<script>
// Javascriptで実装
let count = 0;
window.onload = function() {
  const button = document.getElementById('button');
  const resetBtn = document.getElementById('resetBtn');

  button.onclick = function() {
    count++;
    const countText = document.getElementById('countText');
    countText.innerHTML = 'クリックされた回数は' + count + '回です';

    resetBtn.onclick = function() {
    count = 0;
    countText.innerHTML = 'クリックされた回数は' + count + '回です';
    };
  };


}

export default {
  data(){
    return {
      count : 0,
    }
  },

    methods : {
      onClickButton : function() {
        this.count++;
      },
      onClickResetBtn : function() {
        this.count = 0;
      }
    }
  }
</script>

<style scoped>
.event-page {
  padding: 20px;
}
</style>
