<template>
  <div class="todolist-page">
    <header class="header">
      <!-- 년-월-주일 달력이동 / 어제-내일 날짜 이동 메뉴버튼 -->
      <ul class="todo-flex nav">
        <li>
          <button class="button--calendars">
            <i class="far fa-calendar-alt"></i>
          </button>
        </li>
        <li>
          <button class="button--yesterday" @click="goYesterday">
            <i class="fas fa-chevron-left"></i>
          </button>
        </li>
        <li class="today">
          <!-- 여기 값은 월 달력에서 해당 일(day)를 클릭했을때, 해당 day에 대한 값을 받아서, <h1>이 사이에 값이 들어감</h1> -->
          <h1>{{ getDay }}</h1>
          <!-- <h1>{{ date}}</h1> -->
        </li>
        <li>
          <button class="button--tomorrow" @click="goTomorrow">
            <i class="fas fa-chevron-right"></i>
          </button>
        </li>
        <li>
          <button class="button--menus">
            <i class="fas fa-bars"></i>
          </button>
        </li>
      </ul>
      <!-- 일정 생성 삭제 버튼 -->
      <ul class="todo-flex buttons-wrapper">
        <li>
          <button class="button--create" @click="goCreateTodoPage">
            <i class="fas fa-plus"></i>
          </button>
        </li>
        <!-- <li>
          <button class="button--delete">
            <i class="fas fa-minus"></i>
          </button>
        </li> -->
      </ul>
    </header>
    <!-- 일정 목록 -->
    <main>
      <section>
        <!-- v-for 반복문 -->
        <ul>
          <li class="todo_item" v-for="(item, index) in todolist" :key="index">
            <div>Title : {{ item.title }}</div>
            <div>description : {{ item.description }}</div>
            <div>time : {{ item.time }}</div>
            <!-- eslint-disable-next-line -->
            <div><button class="button--start"><i class="fas fa-plus"></i></button></div>
            <!-- eslint-disable-next-line -->
            <div><button class="button--edit"><i class="fas fa-ellipsis-v"></i></button></div>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import moment from "moment";

export default defineComponent({
  props: {
    //todoList ?
    todoList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    date: Object,
    getDay: String
  },
  data() {
    return {
      todolist: []
    }
  },
  emits: ["goYesterday", "goTomorrow"],
  computed: {
    todolistDate(): any {
      return this.getDay;
    }
  },
  methods: {
    goYesterday() {
      console.log("goYesterday");
      // eslint-disable-next-line
      const startOfMonth : string = moment(this.date).startOf('month').format('YYYY-MM-DD');
      // eslint-disable-next-line
      (this.getDay == startOfMonth ) ? this.$emit("goYesterday", -1) : this.$emit("goYesterday", 0);
    },
    goTomorrow() {
      // eslint-disable-next-line
      const endOfMonth : string = moment(this.date).endOf("month").format("YYYY-MM-DD");
      // eslint-disable-next-line
      (this.getDay == endOfMonth ) ? this.$emit("goTomorrow", 1) : this.$emit("goTomorrow", 0);
    },
    goCreateTodoPage() {
      this.$router.push({ name: "CreateTodo" , params: { todolistDate: this.todolistDate }});
      // params: { id: this.getDay }
    },
    async axiosGet() {
      const dataArray: any = [];
      const targetDay: string = this.todolistDate
      await axios
        .get("http://localhost:3000/todolists")
        .then(function (response) {
          // handle success
          console.debug('a');
          response.data.forEach((element: any) => { 
          if (element.date == targetDay) {
            dataArray.push(element);
          }
        });
        })
        .catch(function (error) {
          // handle error
          console.debug(error);
        });
      console.debug('b');
      console.debug( dataArray);
      this.todolist = dataArray
      console.debug(this.todolist);
    },
  },
  created () {
    console.log("Todolist componet - created");
    console.log(this.todoList);
    this.axiosGet();
  },
  beforeUpdate() {
    console.log('Todolist componet - beforeUpdate');
  },
});
</script>

<style scoped>
@import "./todolist.css";
</style>
