import dayjs from 'dayjs';

export function formatDate(date: Date): string {
  return dayjs(date).format('ddd, MMM D, YYYY h:mm A');
}
