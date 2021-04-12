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
      <!-- 일정 생성 삭제 버튼 html 바까야함.div로 -->
      <ul class="todo-flex buttons-wrapper">
        <li>
          <button class="button--create" @click="goCreateTodoPage">
            <i class="fas fa-plus"></i>
          </button>
        </li>
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
            <div>id: {{ item.id }}</div>
            <!-- eslint-disable-next-line -->
            <div><button class="button--start"><i class="fas fa-running"></i></button></div>
            <!-- eslint-disable-next-line -->
            <div><button class="button--edit" @click="goEditTodoPage(item)"><i class="fas fa-ellipsis-v"></i></button></div>
          </li>
        </ul>
        <div v-if="testIf">
          {{ text }}
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import moment from "moment";

interface Todolist {
  date: string;
  title: string;
  description: string;
  time: number;
  id: number;
}

export default defineComponent({
  props: {
    date: {
      type: Object,
      required: true
    },
    getDay: {
      type: String,
      required: true
    }
  },
  emits: ["goYesterday", "goTomorrow"],
  data() {
    return {
      todolist: [] as object[],
      text: "",
      testIf: false
    }
  },
  computed: {
    todolistDate(): string {
      return this.getDay;
    }
  },
  watch: {
    // else 써야하나 아니면 if문 속에 if문을 넣어야 할려나
    getDay(newValue, oldValue) {
      if(newValue == null) {
        this.todolist.length = 0;
        this.inputText();
      } else if ((newValue !== null)&&(oldValue !== newValue)) {
        console.debug('else if');
        this.axiosGet();
      } else {
        console.debug('else');
      }
    }
  },
  created(): void {
    this.axiosGet();
  },
  methods: {
    async axiosGet(): Promise<void> {
      this.todolist.length = 0;
      await axios
        .get("http://localhost:3000/todolists")
        .then((response) => {
          // handle success
          console.debug('a');
          response.data.forEach((element: Todolist): void => {
            (element.date == this.todolistDate)&& this.todolist.push(element)
          });
          console.debug('axiosGet-',this.todolist.length)
        })
        .catch((error): void => {
          // handle error
          console.debug(error);
        });
      this.inputText();
      console.debug('b');
    },
    goYesterday(): void {
      console.log("goYesterday");
      // eslint-disable-next-line
      const startOfMonth : string = moment(this.date).startOf('month').format('YYYY-MM-DD');
      // eslint-disable-next-line
      (this.todolistDate == startOfMonth ) ? this.$emit("goYesterday", -1) : this.$emit("goYesterday", 0);
    },
    goTomorrow(): void {
      // eslint-disable-next-line
      const endOfMonth : string = moment(this.date).endOf("month").format("YYYY-MM-DD");
      // eslint-disable-next-line
      (this.todolistDate == endOfMonth ) ? this.$emit("goTomorrow", 1) : this.$emit("goTomorrow", 0);
    },
    goCreateTodoPage(): void {
      this.$router.push({ name: "CreateTodo" , params: { todolistDate: this.todolistDate }});
    },
    goEditTodoPage(item: any): void {
      this.$router.push({ name: "EditTodo", params: item });
    },
    goCalendarPage(): void {
      this.$router.push({ name: "Calendar" });
    },
    inputText(): void {
      if (this.todolist.length == 0) {
        this.testIf = true;
        this.text = "일이 없네연 ^^";
      } else {
        this.testIf = false;
      }
    }
  }
});
</script>

<style scoped>
@import "./todolist.css";
</style>
