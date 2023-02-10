<template>
  <div class="todo-footer" v-show="todos.length">
    <label>
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ truedone }}</span> / 全部{{ todos.length }}</span
    >
    <button class="btn btn-danger" @click="deleteall">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "todoFooter",
  props: ["todos", "changealltodo", "deletealltodo"],
  computed: {
    isAll: {
      get() {
        return this.truedone === this.todos.length && this.truedone !== 0;
      },
      set(val) {
        this.changealltodo(val);
      },
    },
    truedone() {
      // let num = 0;
      // for (let todo of this.todos) {
      //   if (todo.done === true) num++;
      // }
      // return num;
      return this.todos.reduce((pre, cur) => pre + (cur.done ? 1 : 0), 0);
    },
  },
  methods: {
    deleteall() {
      this.deletealltodo();
    },
  },
};
</script>

<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
