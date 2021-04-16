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
      <h1 v-show="test">hellow world</h1>
      <section class="todo-flex teporaryClass">
        <!-- v-for 반복문 -->
        <ul class="todo-lists">
          <li class="todo_item" v-for="(item, index) in todolist" :key="index">
            <div>Title : {{ item.title }}</div>
            <div>description : {{ item.description }}</div>
            <div>time : {{ item.time }}</div>
            <!-- <div>id: {{ item.id }}</div> -->
            <!-- eslint-disable-next-line -->
            <div><button type="button" class="button--start"><i class="fas fa-running"></i></button></div>
            <!-- eslint-disable-next-line -->
            <div><button type="button" class="button--edit-delete" @click="goEditTodoPage(item)"><i class="fas fa-ellipsis-h"></i></button></div>
            <!-- eslint-disable-next-line -->
            <button type="button" class="button--delete" @click="deleteTodolist(item)">삭제 버튼</button>
            <!-- eslint-disable-next-line -->
            <div v-show="test2" style="width: 100%; height: 100%; opacity: 1; position: absolute; top: 0; background-color: orange; left: 0; z-index:100;">
              <button @click="test2Func(false)">임시버튼</button>
            </div>
          </li>
        </ul>
        <div v-show="testIf">
          {{ text }}
        </div>
        <div>
          <button type="button" @click="test2Func(true)">확인버튼</button>
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
  title: string;
  description: string;
  time: number;
  id: number;
  date: string;
}

declare module "axios" {
  interface AxiosRequestConfig {
    title: string;
    description: string;
    time: number;
    id: number;
    date?: string;
  }
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
      testIf: false,
      test: false,
      test2: false
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
  // this.todolist가 먼저 나오는데 async를 써주는 것이 맞는지.
  created(): void {
    this.axiosGet();
    console.log(this.todolist);
    console.log(this.test2);
    
  },
  methods: {
    test2Func (booleanParams: boolean) :void {
      console.log(booleanParams);
      this.test2 = booleanParams;
    },
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
    async axiosDelete(item: Todolist): Promise<void> {
      console.debug('axios-delete -- b');
      await axios
        .delete(`http://localhost:3000/todolists/${item.id}`, {
          id: item.id,
          title: item.title,
          description: item.description,
          time: item.time
        })
        .then(response => {
          console.debug(response);
        })
        .catch(error => {
          console.debug(error);
        });
      console.debug('axios-delete -- c');
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
    async deleteTodolist(item: Todolist): Promise<void> {
      console.debug('axios-delete -- a');
      await this.axiosDelete(item);
      console.debug('axios-delte -- d');
      await this.axiosGet();
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
