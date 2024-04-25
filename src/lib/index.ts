import moment from "moment-timezone"

/**
 * 將日期轉換到特定時區，回傳資料時使用
 * @param date - 日期對象或日期字符串
 * @param tzString - 時區字符串
 * @returns 轉換時區後的日期字符串
 */
export const convertTZ = (date: Date | string, tzString: string): string => {
  return moment(date).tz(tzString).format()
}
