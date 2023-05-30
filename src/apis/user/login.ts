import https from '@/utils/https'
import type { Login } from '@/types/user/login'

export const postLogin = async (form: Login) => {
  return await https.post('/login', form)
}
