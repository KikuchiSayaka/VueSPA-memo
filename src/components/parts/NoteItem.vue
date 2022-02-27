<template>
<!-- マウスホバーされたか否かを見る。 -->
  <div class="note-family">
    <div class="note"
      @mouseover="onMouseOver"
      @mouseleave="onMouseLeave"
      v-bind:class="{mouseover: note.mouseover && !note.editing}"
    >

      <!-- templateタグはvueのコード場は存在しても、 表示要素からは消える性質なので、divタグなどに書かず、ここにv-ifを書く -->
      <!-- ノートの名称編集中(editing=true)の場合は<input>要素を表示 -->
      <template v-if="note.editing">
        <input v-model="note.name" class="transparent"  @keypress.enter="onEditEnd" />
      </template>
      <!-- 編集中ではないときはノート名＋ボタンを表示 -->
      <template v-else>
        <!-- 新規ノートが作成されると、ここにノートアイコン＋新規ノート名が表示 -->
        <div class="note-icon"><i class="fas fa-file-alt"></i></div>
        <div class="note-name">{{note.name}}</div>
          <!-- マウスオーバーするとこのアイコンが右側に並ぶ -->
        <div class="buttons" v-show="note.mouseover">
          <div class="button-icon" v-if="layer < 3" @click="onClickChildNote(note)"><i class="fas fa-sitemap"></i></div>
          <div class="button-icon" @click="onClickAddNoteAfter(parentNote, note)"><i class="fas fa-plus-circle"></i></div>
          <div class="button-icon" @click="onClickEdit(note)"><i class="fas fa-edit"></i></div>
          <div class="button-icon" @click="onClickDelete(parentNote, note)"><i class="fas fa-trash"></i></div>
        </div>
      </template>
    </div>
    <draggable v-bind:list="note.children" group="notes">
      <div class="child-note">
        <div class="child-note">
          <NoteItem
            v-for="childNote in note.children"
            v-bind:note="childNote"
            v-bind:layer="layer + 1"
            v-bind:parentNote="note"
            v-bind:key="childNote.id"
            @delete="onClickDelete"
            @editStart="onClickEdit"
            @editEnd="onEditEnd"
            @addChild="onClickChildNote"
            @addNoteAfter="onClickAddNoteAfter"
          />
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
export default {
  name: 'NoteItem',
  props: [
    'note',
    'parentNote',
    'layer',
  ],
  methods: {
    onMouseOver : function() {
      this.note.mouseover = true;
    },
    onMouseLeave : function() {
      this.note.mouseover = false;
    },
    // ノートコンポーネントで削除ボタンが押されたことを、呼び出し元のメインページ側に伝える
    onClickDelete : function(parentNote, note) {
      // $emitはVue.jsの組み込み関数で、呼び出し元にイベントの発火を知らせる。引数1にイベント名を入れ、引数2以降は以降は,つなぎで一緒に渡したい、送りたい値を入れられる。
      // あるあるの書き方。this.$emit('イベント名', 引数)
      this.$emit('delete', parentNote, note);
    },
    // 編集ボタンを押すと、この関数が呼び出される。ここで、$emit関数によって呼び出し元にイベントの発火を知らせる。
    onClickEdit : function(note) {
      this.$emit('editStart', note);
    },
    onEditEnd : function() {
      this.$emit('editEnd');
    },
    onClickChildNote : function(note) {
      this.$emit('addChild', note);
    },
    onClickAddNoteAfter : function(parentNote, note){
      this.$emit('addNoteAfter', parentNote, note);
    },
  }
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
  .child-note {
      padding-left: 10px;
  }
</style>
