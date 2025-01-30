let date: Date | null = null;

export function getDate() {
  return date ?? new Date();
}

export function setDate(newDate: Date | null) {
  date = newDate;
}
