const formatDateElement = (dateElement) => String(dateElement).padStart(2, '0');

const formatCurrentDate = () => {
  const date = new Date();
  const timePart = `${formatDateElement(date.getHours())}:${formatDateElement(date.getMinutes())}`;
  const shortYear = date.getFullYear().toString().substr(2, 2);
  const datePart = `${formatDateElement(date.getDate())}.${formatDateElement(date.getMonth() + 1)}.${shortYear}`;
  return `${datePart} ${timePart}`;
};

export default formatCurrentDate;
