<template>
  <li>
    <label>
      <input
        type="checkbox"
        :checked="todo.done"
        @change="handlecheck(todo.id)"
      />
      <span v-show="!todo.isEdit">{{ todo.title }}</span>
      <input
        v-show="todo.isEdit"
        type="text"
        :value="todo.title"
        @keyup.enter="handleeditenter(todo, $event)"
        ref="inputtitle"
      />
    </label>
    <button class="btn btn-danger" @click="handledelete(todo.id)">删除</button>
    <button
      v-show="!todo.isEdit"
      class="btn btn-edit"
      @click="handleedit(todo)"
    >
      编辑
    </button>
  </li>
</template>

<script>
export default {
  name: "todoItem",
  props: ["todo"],
  // updated() {
  //   this.$refs.inputtitle.focus();
  // },
  methods: {
    handlecheck(id) {
      this.$bus.$emit("checktodo", id);
    },
    handledelete(id) {
      if (confirm("确定删除吗？")) {
        this.$bus.$emit("deletetodo", id);
      }
    },
    handleedit(todo) {
      if (todo.hasOwnProperty.call("isEdit")) todo.isEdit = true;
      else this.$set(todo, "isEdit", true);
      this.$nextTick(function () {
        this.$refs.inputtitle.focus();
      });
    },
    handleeditenter(todo, e) {
      todo.isEdit = false;
      this.$bus.$emit("updatetodo", todo.id, e.target.value);
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}
li:hover > button {
  display: block;
}
</style>
