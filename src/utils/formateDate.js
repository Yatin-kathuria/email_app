const formateDate = (date, formate = 'dd/MM/yyyy hh:mm a') => {
  const d = new Date(date);

  const hours = d.getHours();

  formate = formate
    .replace('dd', d.getDate())
    .replace('MM', d.getMonth() + 1)
    .replace('yyyy', d.getFullYear())
    .replace('hh', hours % 12)
    .replace('mm', d.getMinutes())
    .replace('a', hours >= 12 ? 'PM' : 'AM');

  return formate;
};

export default formateDate;
