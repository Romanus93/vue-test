<template>
  <main class="todo-flex edit-form">
    <div class="advice">
      <!-- 명언 랜덤으로 뿌리기 -->
      <p>
        시간관리의 핵심은 이미 적힌 일과중에 무엇부터 할까를 정하는 것이
        아니라,<br />
        우선순위의 일부터 일정에 넣는 것이다.<br />-스티븐 커비, 성공하는
        사람들의 7가지 습관 저자-
      </p>
    </div>
    <ul class="todo-flex todo-info">
      <li class="todo-flex todo-title">
        <label for="title">오늘 할 일</label>
        <input type="text" id="title" name="todo-title" />
      </li>
      <li class="todo-flex todo-content">
        <label for="description">할 일 내용</label>
        <textarea id="description" name="todo-content" />
      </li>
      <li>
        <div>Time</div>
      </li>
    </ul>
    <ul class="todo-flex buttons-wrapper">
      <li>
        <Button class="button--edit">
          <i class="far fa-edit"></i>
        </Button>
      </li>
      <li>
        <Button class="button--cancle">
          <i class="fas fa-minus"></i>
        </Button>
      </li>
    </ul>
  </main>
</template>

<style scoped>
@import "./edit-todo.css";
</style>
