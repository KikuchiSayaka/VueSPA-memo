<template>
<!-- マウスホバーされたか否かを見る。 -->
  <div class="note"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
    v-bind:class="{mouseover: note.mouseover && !note.editing}"
  >

    <!-- templateタグはvueのコード場は存在しても、 表示要素からは消える性質なので、divタグなどに書かず、ここにv-ifを書く -->
    <!-- 編集中の場合は<input>要素を、表示 -->
    <template v-if="note.editing">
        <input v-model="note.name" class="transparent" @keypress.enter="onEditEnd" />
    </template>
    <!-- 編集中ではないときはノート名＋ボタンを表示 -->
    <template v-else>
      <!-- 新規ノート作成されると、ここに新規ノートがその名前で表示される -->
      <div class="note-icon">
        <i class="fas fa-file-alt"></i>
      </div>
      <div class="note-name">{{note.name}}</div>
        <!-- マウスオーバーするとこのアイコンが右側に並ぶ -->
      <div class="buttons" v-show="note.mouseover">
        <div class="button-icon"><i class="fas fa-sitemap"></i></div>
        <div class="button-icon"><i class="fas fa-plus-circle"></i></div>
        <div class="button-icon" @click="onClickEdit(note)"><i class="fas fa-edit"></i></div>
        <div class="button-icon" @click="onClickDelete(note)"><i class="fas fa-trash"></i></div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'NoteItem',
  props: [
    'note',
  ],
  methods: {
    onMouseOver : function() {
      this.note.mouseover = true;
    },
    onMouseLeave : function() {
      this.note.mouseover = false;
    },
    // ノートコンポーネントで削除ボタンが押されたことを、呼び出し元のメインページ側に伝える
    onClickDelete : function(note) {
      // $emitはVue.jsの組み込み関数で、呼び出し元にイベントの発火を知らせる。引数1にイベント名を入れ、引数2以降は以降は,つなぎで一緒に渡したい、送りたい値を入れられる。
      // あるあるの書き方。this.$emit('イベント名', 引数)
      this.$emit('delete', note);
    },
    // 編集ボタンを押すと、この関数が呼び出される。ここで、$emit関数によって呼び出し元にイベントの発火を知らせる。
    onClickEdit : function(note) {
      this.$emit('editStart', note);
    },
    onEditEnd : function() {
      this.$emit('editEnd');
    },
  },
}
</script>

<style scoped lang="scss">
.note {
  margin: 10px 0;
  display: flex;
  align-items: center;
  padding: 5px;
  color: rgba(25, 23, 17, 0.6);
  &.mouseover {
    background-color: rgb(232, 231, 228);
    cursor: pointer;
  }
  .note-icon {
    margin-left: 10px;
  }
  .note-name {
    width: 100%;
    padding: 3px 10px;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    .button-icon {
      padding: 3px;
      margin-left: 3px;
      border-radius: 5px;
    }
  }
}
</style>
