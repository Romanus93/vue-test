<template>
  <div>
    연습용 - TodoForm
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  created () {
    console.log(this.$route);
  }
})
</script>