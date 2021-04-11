<template>
  <div>
    <v-date-picker
      v-model="date"
      :value="null"
      color="green"
      :transition="transition"
      ref="calendar"
    />
    <h1>달력</h1>
    <h2>{{ date }}</h2>
    <h2>{{ getDay }}</h2>
    <Todolist
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

export default defineComponent({
  components: { Todolist },
  data() {
    return {
      date: new Date(),
      position: 1,
      transition: "slide-h"
      //'slide-h', 'slide-v', 'fade', 'none' 중 선택 가능. default slide-h
    };
  },
  computed: {
    getDay(): string {
      if (this.date != null) {
        const today = moment(this.date).format("YYYY-MM-DD");
        return today;
      } else {
        return "please, choose the date";
      }
    },
    calendar(): any {
      const calendars = this.$refs.calendar;
      return calendars;
    }
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
    }
  }
});
</script>
