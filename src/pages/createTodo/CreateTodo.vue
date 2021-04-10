<template>
  <main class="todo-flex input-form">
    <div class="advice">
      <!-- 명언 랜덤으로 뿌리기 -->
      <p>어디를 가든 마음을 다해 가라.<br />-공자-</p>
    </div>
    <ul class="todo-flex todo-info">
      <li class="todo-flex todo-title">
        <label for="title">오늘 할 일</label>
        <input
          type="text"
          id="title"
          name="todo-title"
          v-model.trim="todolist.title"
        />
      </li>
      <li class="todo-flex todo-content">
        <label for="description">할 일 내용</label>
        <input
          type="text"
          id="description"
          name="todo-content"
          v-model.trim="todolist.description"
        />
      </li>
      <li>
        <label for="time">Time</label>
        <input
          type="number"
          id="time"
          name="todo-time"
          v-model.number.trim="todolist.time"
        />
      </li>
    </ul>
    <ul class="todo-flex buttons-wrapper">
      <li>
        <button class="button--create" @click="createTodo">
          <i class="fas fa-plus"></i>
        </button>
      </li>
      <!-- <li>
        <button class="button--cancle">
          <i class="fas fa-minus"></i>
        </button>
      </li> -->
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  props: {
    todolistDate: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      todolist: {
        date: this.todolistDate,
        title: " ",
        description: " ",
        time: 0
      },
    };
  },
  methods: {
    createTodo() {
      console.debug("aaa");
      if( this.todolist.time > 0 && this.todolist.title != "" && this.todolist.description != "" ) {
        this.axiosPost();
        this.$router.push({ name: "Calendar" });
      } else {
        console.error("값을 확인해주세요");
        // alert("시간을 정해주세요!")
      }
    },
    axiosPost() {
      axios
        .post("http://localhost:3000/todolists", {
          date: this.todolist.date,
          title: this.todolist.title,
          description: this.todolist.description,
          time: this.todolist.time
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  created() {
    console.log("CreateTodo Page - created");
    console.log(this.$route);
    console.log(this.todolistDate);
    console.log(typeof this.todolistDate);
  },
  beforeUpdate() {
    console.log("this is beforeUpdate");
  }
});
</script>

<style scoped>
@import "./create-todo.css";
</style>
