<template>
  <div v-if="editor" class="control-group">
    <div class="button-group">
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        H1
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        H2
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        H3
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        H4
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        H5
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        H6
      </button>
    </div>
    <div class="button-group">
      <button @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }">
        Toggle blockquote
      </button>
    </div>
    <div class="button-group">
      <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
        Insert table
      </button>
      <button @click="editor.chain().focus().addColumnBefore().run()">
        Add column before
      </button>
      <button @click="editor.chain().focus().addColumnAfter().run()">
        Add column after
      </button>
      <button @click="editor.chain().focus().deleteColumn().run()">
        Delete column
      </button>
      <button @click="editor.chain().focus().addRowBefore().run()">
        Add row before
      </button>
      <button @click="editor.chain().focus().addRowAfter().run()">
        Add row after
      </button>
      <button @click="editor.chain().focus().deleteRow().run()">
        Delete row
      </button>
      <button @click="editor.chain().focus().deleteTable().run()">
        Delete table
      </button>
      <button @click="editor.chain().focus().mergeCells().run()">
        Merge cells
      </button>
      <button @click="editor.chain().focus().splitCell().run()">
        Split cell
      </button>
      <button @click="editor.chain().focus().toggleHeaderColumn().run()">
        Toggle header column
      </button>
      <button @click="editor.chain().focus().toggleHeaderRow().run()">
        Toggle header row
      </button>
      <button @click="editor.chain().focus().toggleHeaderCell().run()">
        Toggle header cell
      </button>
      <button @click="editor.chain().focus().mergeOrSplit().run()">
        Merge or split
      </button>
      <button @click="editor.chain().focus().setCellAttribute('colspan', 2).run()">
        Set cell attribute
      </button>
      <button @click="editor.chain().focus().fixTables().run()">
        Fix tables
      </button>
      <button @click="editor.chain().focus().goToNextCell().run()">
        Go to next cell
      </button>
      <button @click="editor.chain().focus().goToPreviousCell().run()">
        Go to previous cell
      </button>
    </div>
  </div>
  <EditorContent :editor="editor" />

  <div>
    <form method="post" @submit.prevent="upload">
      <input type="text" name="alt" v-model="alt" placeholder="Alt">
      <input type="file" ref="file" placeholder="Изображение">
      <input type="submit" value="Загрузить">
    </form>
  </div>

  <template v-if="editor">
    <button @click="getHTML">Обновить HTML</button>
    <div v-html="html"></div>
  </template>

</template>

<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import StarterKit from '@tiptap/starter-kit'

const editor = ref(null as any)
const html = ref('')

const alt = ref('')
const file = ref(null)

const getHTML = ()=>{
  html.value=editor.value.getHTML()
}

const upload = async () => {
  const fileref = file.value as never as HTMLInputElement
  const fD = new FormData()
  if (fileref.files) {
    fD.append('alt', alt.value)
    fD.append('img', fileref.files[0])
    const data = await $fetch('/api/img', {
      method: 'POST',
      body: fD
    })
    alt.value = ''
    fileref.value = ''
    setTimeout(()=>{
      editor.value.chain().focus().setImage({ src: data.url, alt: alt.value }).run()
    }, 500)
  }
}

onMounted(()=>{
  editor.value = new Editor({
    content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
    extensions: [StarterKit, Image, Table.configure({
      resizable: true,
    }),
      TableRow,
      TableHeader,
      TableCell,],
  })
})

onBeforeUnmount(()=>{
  editor.value.destroy()
})
  
</script>

<style lang="scss">
  blockquote {
    background-color: aqua;
  }
  .tiptap {
    :first-child {
      margin-top: 0;
    }

    /* Table-specific styling */
    table {
      border-collapse: collapse;
      margin: 0;
      overflow: hidden;
      table-layout: fixed;
      width: 100%;
      border: 1px solid black;

      td,
      th {
        border: 1px solid var(--gray-3);
        box-sizing: border-box;
        min-width: 1em;
        padding: 6px 8px;
        position: relative;
        vertical-align: top;
        border: 1px solid black;

        >* {
          margin-bottom: 0;
        }
      }

      th {
        background-color: var(--gray-1);
        font-weight: bold;
        text-align: left;
      }

      .selectedCell:after {
        background: var(--gray-2);
        content: "";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
        position: absolute;
        z-index: 2;
      }

      .column-resize-handle {
        background-color: var(--purple);
        bottom: -2px;
        pointer-events: none;
        position: absolute;
        right: -2px;
        top: 0;
        width: 4px;
      }
    }

    .tableWrapper {
      margin: 1.5rem 0;
      overflow-x: auto;
    }

    &.resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;
    }
  }
</style>