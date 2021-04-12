<template>
  <div>
    <v-date-picker
      v-model="date"
      :value="null"
      color="green"
      :transition="transition"
      is-expanded
      ref="calendar"
    />
    <div class="calendarModal" v-if="!getDay">
      <p>날짜를 선택해주세요!</p>
      <button>확인</button>
    </div>
    <div style="border: 1px solid blue; height: 300px" v-if="!getDay">
      
    </div>
    <Todolist
      v-if="getDay"
      :date="date"
      :getDay="getDay"
      @goYesterday="goYesterday"
      @goTomorrow="goTomorrow"
    ></Todolist>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import moment from "moment";
import Todolist from "../components/todolist/Todolist.vue";
// import { Calendar } from 'node_modules/v-calendar/types';

export default defineComponent({
  components: { Todolist },
  data() {
    return {
      date: new Date(),
      position: 1,
      transition: "slide-h",
      calendarView: false
      //'slide-h', 'slide-v', 'fade', 'none' 중 선택 가능. default slide-h
    };
  },
  computed: {
    getDay(): string | undefined {
      if (this.date != null) {
        const today = moment(this.date).format("YYYY-MM-DD");
        return today;
      } else {
        console.log('computed getday CalednarPage',this.date);
        this.testFunc();
        return this.date;
      }
    },
    calendar(): any {
      const calendars = this.$refs.calendar;
      return calendars;
    }
  },
  created () {
    console.log('this calendar page created');
    console.log(this.getDay);
  },
  beforeUpdate () {
    console.log('this calendar page before update');
    console.log('this calendar page before update', this.getDay);
  },
  methods: {
    goYesterday(step: number): void {
      // eslint-disable-next-line
      this.date = moment(this.date).subtract(1, "day").toDate();
      this.goMonth(step);
    },
    goTomorrow(step: number): void {
      // eslint-disable-next-line
      this.date = moment(this.date).add(1, "day").toDate();
      this.goMonth(step);
    },
    goMonth(step: number): void {
      // step: -1 이전 달, 0 이동 없음, 1 다음 달
      this.calendar.move(step, {
        transition: this.transition,
        position: this.position
      });
    },
    testFunc() {
      console.log('test Func');
      console.log('test Func', this.date);
    }
  }
});
</script>

<style scoped>

</style>
