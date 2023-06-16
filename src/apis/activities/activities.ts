import https from '@/utils/https'
import type { SearchQuery } from '@/types/activities/searchQuery'

//獲取活動清單
export const getActivities = async (searchQuery: SearchQuery) => {
  return await https.get('/activities', {
    params: searchQuery
  })
}

//獲取單筆活動
export const getActivity = async (activityId: string) => {
  return await https.get(`/activities/${activityId}`)
}

//新增活動
export const postActivity = async (form: any) => {
  return await https.post('/activities', form)
}

//編輯活動
export const patchActivity = async (id: string, form: any) => {
  return await https.patch(`/activities/${id}`, form)
}

//上架
export const publishActivity = async (id: string) => {
  return await https.post(`/activities/${id}/publish`)
}
//停辦/取消
export const cancelActivity = async (id: string) => {
  return await https.post(`/activities/${id}/cancel`)
}
