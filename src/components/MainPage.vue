// Topページ
<template>
  <div class="main-page">
<!-- 画面左側のサイドメニュー。
        メモの名称編集時、Enterキーを押さないでも入力窓以外をクリックしたら編集完了にするため、@click.self="onEditNoteEnd()"を追加。また、普通に@click=""だと 子要素の編集ボタンが押されただけで編集完了になってしまうので、それを防ぐために@click.self=""でそれ自身が呼ばれたら、と指定する。 -->
    <div class="left-menu" @click.self="onEditNoteEnd()">
      <!-- Vue.Draggableパッケージで、ノート名のドラッグ移動が可能に -->
      <draggable v-bind:list="noteList" group="notes">
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
          v-bind:layer="1"
          v-bind:key="note.id"
          @delete="onDeleteNote"
          @editStart="onEditNoteStart"
          @editEnd="onEditNoteEnd"
          @addChild="onAddChildNote"
          @addNoteAfter="onAddNoteAfter"
        />
      </draggable>

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
import draggable from 'vuedraggable'

export default {
  data(){
    return {
      noteList : [],
    }
  },
  methods : {
    // targetList：ノート追加先の配列
    // layer：階層数。NoteItem.vue側で3階層までに制限している
    // index：配列内のどこに追加するかの番号、未定義の場合は一番うしろに追加
    onAddNoteCommon : function(targetList, layer, index) {
      layer = layer || 1;
      const note = {
        id : new Date().getTime().toString(16),
        name : `新規ノート-${layer}-${targetList.length}`,
        mouseover : false,
        editing : false,
        children : [],
        layer : layer,
      };
      if (index == null) {
        targetList.push(note);
      } else {
        targetList.splice(index + 1, 0, note);
      }
    },
    onClickButtonAdd : function() {
      this.onAddNoteCommon(this.noteList);
    },
    onDeleteNote : function(parentNote, note) {
      const targetList = parentNote == null ? this.noteList : parentNote.children;
      // indexOf関数を使って対象のノートがリストの何番目にあるかを判定
      const index = targetList.indexOf(note);
      // splice関数を使って指定した番号の要素をリストから削除
      targetList.splice(index, 1);
    },
    onEditNoteStart : function(editNote, parentNote) {
      const targetList = parentNote == null ? this.noteList : parentNote.children;
      // noteList配列の中の値を取り出してidが一致するものはtrue,それ以外はfalseに。
      for (let note of targetList) {
        note.editing = (note.id === editNote.id);
        this.onEditNoteStart(editNote, note);
      }
    },
    onEditNoteEnd : function(parentNote) {
      const targetList = parentNote == null ? this.noteList : parentNote.children;
      for (let note of targetList) {
        note.editing = false;
        this.onEditNoteEnd(note);
      }
    },
    onAddChildNote : function(note) {
      this.onAddNoteCommon(note.children, note.layer + 1);
    },
    onAddNoteAfter : function(parentNote, note) {
      const targetList = parentNote == null ? this.noteList : parentNote.children;
      const layer = parentNote == null ? 1 : note.layer;
      const index = targetList.indexOf(note);
      this.onAddNoteCommon(targetList, layer, index);
    },
  },
  components: {
    NoteItem,
    draggable,
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

