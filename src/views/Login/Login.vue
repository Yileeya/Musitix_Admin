<template>
  <div class="login-layout">
    <section class="box-container">
      <h1 class="text-center">Musitix後台登入</h1>
      <Form :validation-schema="schema" @submit="login">
        <div v-for="item in loginForm" :key="item.name" class="form-group">
          <validate-text-input
            :name="item.name"
            :type="showInputType(item.name)"
            :label="item.title"
            :placeholder="`請輸入${item.title}`"
          />
        </div>
        <button class="btn btn-primary" type="submit" :disabled="sending">登入</button>
        <p class="text-center red" v-if="sending">登入中請稍後...</p>
      </Form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Login } from '@/types/user/login'
import { postLogin } from '@/apis/user/login'
import * as Yup from 'yup'
import { Form } from 'vee-validate'
import ValidateTextInput from '@/components/ValidateTextInput.vue'
import { useToast } from 'vue-toastification'

const loginForm = ref([
  {
    title: '帳號',
    name: 'account'
  },
  {
    title: '密碼',
    name: 'password'
  }
])
const showPassword = ref<boolean>(false)
const sending = ref<boolean>(false)

// 設定防呆規則
const requiredRule = Yup.string().required('必填')
const schema = Yup.object().shape({
  account: requiredRule,
  password: requiredRule
})

const showInputType = (name: string) => {
  if (name === 'password' && !showPassword.value) return 'password'
  else return 'text'
}

// 登入
const Toast = useToast()
const login = async (form: Login) => {
  sending.value = true
  try {
    let res = await postLogin(form)
    console.log(res)
    if (res.message === '成功') {
      Toast.success('登入成功')
      localStorage.setItem('Token', res.user.token)
    }
  } catch (err: any) {
    Toast.error('登入失敗')
  }
  sending.value = false
}
</script>

<style lang="scss">
.login-layout {
  min-height: 100vh;
  background-color: var(--light-gray-color);
  display: flex;
  align-items: center;
  justify-content: center;

  .box-container {
    width: 500px;
    height: 420px;
    background-color: white;
    padding: 15px 30px 0;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 30px;

    h1 {
      margin-bottom: 30px;
    }

    .form-group {
      margin: 15px 0;
    }

    .btn-primary {
      width: 100%;
      margin: 15px auto;
    }

    .red {
      color: var(--danger-color);
    }
  }
}
</style>
