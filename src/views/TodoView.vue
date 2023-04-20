<template>
  Todo
  <div>
    <button type="button" class="btn btn-primary" @click="getTodoId('error')">
      consoleLog Error
    </button>
    <button
      type="button"
      class="btn btn-primary"
      @click="getTodoId(Math.floor(Math.random() * 10) + 1)"
    >
      fetch Data
    </button>
  </div>
  {{ _.isEmpty(todo) ? null : todo }}
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getTodoById } from '@/apis/todo'
import { consoleError } from '@/utils/handleError'
import _ from 'lodash'

const todo = ref({})

const getTodoId = async (input: any) => {
  todo.value = {}
  try {
    todo.value = await getTodoById(input)
  } catch (error: any) {
    consoleError(error)
  }
}
</script>

<style scoped>
.btn {
  margin: 0 10px;
}
</style>
