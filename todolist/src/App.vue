<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <todoHeader @addtodo="addtodo"></todoHeader>
        <todoList :todos="todos"></todoList>
        <todoFooter
          :todos="todos"
          @changealltodo="changealltodo"
          @deletealltodo="deletealltodo"
        ></todoFooter>
      </div>
    </div>
  </div>
</template>

<script>
import todoList from "./components/todoList.vue";
import todoFooter from "./components/todoFooter.vue";
import todoHeader from "./components/todoHeader.vue";
export default {
  name: "App",
  components: {
    todoHeader,
    todoList,
    todoFooter,
  },
  data() {
    return {
      todos:
        JSON.parse(localStorage.getItem("todos")) ||
        [
          // {
          //   id: "001",
          //   title: "想念Gavei",
          //   done: true,
          // },
          // {
          //   id: "002",
          //   title: "vue项目",
          //   done: false,
          // },
          // {
          //   id: "003",
          //   title: "二叉树",
          //   done: false,
          // },
        ],
    };
  },
  methods: {
    addtodo(newtodo) {
      this.todos.unshift(newtodo);
    },
    deletetodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    checktodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done;
      });
    },
    changealltodo(done) {
      this.todos.forEach((todo) => {
        todo.done = done;
      });
    },
    deletealltodo() {
      this.todos = this.todos.filter((todo) => !todo.done);
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(vaule) {
        localStorage.setItem("todos", JSON.stringify(vaule));
      },
    },
  },
  //GlobalEventBus
  mounted() {
    this.$bus.$on("checktodo", this.checktodo);
    this.$bus.$on("deletetodo", this.deletetodo);
  },
  beforeDestroy() {
    this.$bus.$off(["checktodo", "deletetodo"]);
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
