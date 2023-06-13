import https from '@/utils/https'
import type { SearchQuery } from '@/types/activities/searchQuery'

//獲取活動清單
export const getActivities = async (searchQuery: SearchQuery) => {
  return await https.get('/activities', {
    params: searchQuery
  })
}
