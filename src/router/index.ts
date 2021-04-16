import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Calendar from "../pages/Calendar.vue";
import CreateTodo from "../pages/createTodo/CreateTodo.vue";
import EditTodo from "../pages/editTodo/EditTodo.vue";
import TodoForm from "../pages/TodoForm.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/calendar",
    name: "Calendar",
    // props: true,
    component: Calendar
  },
  {
    path: "/calendar/createTodo",
    name: "CreateTodo",
    props: true,
    component: CreateTodo
  },
  {
    path: "/calendar/editTodo",
    name: "EditTodo",
    props: (route) => ({ todolistData: route.params }),
    component: EditTodo
  },
  //연습용
  {
    path: "/calendar/todoForm",
    name: "TodoForm",
    component: TodoForm
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
