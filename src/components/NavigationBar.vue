<template>
  <!-- ナビゲーションバーをダークテーマで作成 -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <!-- タイトル -->
    <a class="navbar-brand" href="/main">TechpitNotion</a>

    <!-- 画面サイズに応じて折りたたむ設定  -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- メニュー全体 -->
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav">
        <!-- ノートリストページへのリンク -->
        <li class="nav-item">
          <a class="nav-link" href="/main"><i class="fas fa-file-alt"></i> ノートリスト</a>
        </li>

        <!-- 学習ページへのリンク -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-toggle="dropdown">
            <i class="fas fa-user-graduate"></i>
            学習用ページ
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/study/binding">学習1:双方向バインディング</a></li>
            <li><a class="dropdown-item" href="/study/directive">学習2:v-show</a></li>
            <li><a class="dropdown-item" href="/study/event">学習3:@Click</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
}
</script>

// scopedと書くと同ファイル内の要素にだけスタイルが適用されます。
<style scoped>
.navigation-bar {
  height: 60px;
  color: white;
  background-color: #6c757d;
}
</style>
