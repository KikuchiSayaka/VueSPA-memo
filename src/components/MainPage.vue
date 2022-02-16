// Topページ
<template>
  <div class="main-page">
<!-- 画面左側のサイドメニュー。
        メモの名称編集時、Enterキーを押さないでも入力窓以外をクリックしたら編集完了にするため、@click.self="onEditNoteEnd()"を追加。また、普通に@click=""だと 子要素の編集ボタンが押されただけで編集完了になってしまうので、それを防ぐために@click.self=""でそれ自身が呼ばれたら、と指定する。 -->
    <div class="left-menu" @click.self="onEditNoteEnd()">
      <!-- @deleteでNoteItemコンポーネントで削除ボタンが押された場合、受け取ってonDeleteNoteに渡す -->
        <!--
            1. 削除ボタンをクリックするとonClickDelete関数が呼ばれる
            2. $emitを使ってdeleteイベントを発火させ、NoteItem.vueからMainPage.vueへnote情報を渡す
            3. MainPage.vue側でイベント発火を@deleteで受けると@deleteに紐付けられたonDeleteNote関数が呼ばれる
            4. ノートリストの中から、渡されたnote情報に該当する要素を削除する
        -->
      <NoteItem
        v-for="note in noteList"
        v-bind:note="note"
        v-bind:key="note.id"
        @delete="onDeleteNote"
        @editStart="onEditNoteStart"
        @editEnd="onEditNoteEnd"
        @addChild="onAddChildNote"
      />

      <button class="transparent" @click="onClickButtonAdd">
        <i class="fas fa-plus-square"></i>ノートを追加
      </button>
    </div>

<!-- 画面の右側
      メモの名称編集時、Enterキーを押さないでも入力窓以外をクリックしたら編集完了にするため、@click.self="onEditNoteEnd()"を追加。-->
    <div class="right-view" @click.self="onEditNoteEnd()">
      右ビュー
    </div>
  </div>
</template>

<script>
import NoteItem from '@/components/parts/NoteItem.vue'

export default {
  data(){
    return {
      noteList : [],
    }
  },
  methods : {
    onClickButtonAdd : function() {
      this.noteList.push({
        id : new Date().getTime().toString(16),
        name : `新規ノート`,
        mouseover : false,
        editing : false,
        children : [],
      })
    },
    onDeleteNote : function(deleteNote) {
      // indexOf関数を使って対象のノートがリストの何番目にあるかを判定
      const index = this.noteList.indexOf(deleteNote);
      // splice関数を使って指定した番号の要素をリストから削除
      this.noteList.splice(index, 1);
    },
    onEditNoteStart : function(editNote) {
      // noteList配列の中の値を取り出してidが一致するものはtrue,それ以外はfalseに。
      for (let note of this.noteList) {
        note.editing = (note.id === editNote.id);
      }
    },
    onEditNoteEnd : function() {
      for (let note of this.noteList) {
          note.editing = false;
      }
    },
    onAddChildNote : function(note) {
      note.children.push({
        id : new Date().getTime().toString(16),
        name : note.name + 'の子',
        mouseover : false,
        editing : false,
        children : [],
      });
    },
  },
  components: {
    NoteItem,
  },
}
</script>

// scopedと書くと同ファイル内の要素にだけスタイルが適用されます。
<style scoped lang="scss">
  .main-page {
    display: flex;
    height: calc(100vh - 60px);
    .left-menu {
      width: 350px;
      background-color: #f7f6f3;
    }
    .right-view {
      flex-grow: 1;
      padding: 10px;
    }
  }
</style>

