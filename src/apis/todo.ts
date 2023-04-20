import https from '@/utils/https'

export const getTodoById = async (id: number) => {
  return await https.get(`/todos/${id}`)
}
