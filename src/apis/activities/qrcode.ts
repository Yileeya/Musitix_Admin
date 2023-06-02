import https from '@/utils/https'

//活動入場掃描 Qrcode
export const postQrcodeCheckIn = async (ticketId: string) => {
  return await https.post(`/activities/${ticketId}/qrcode`)
}
