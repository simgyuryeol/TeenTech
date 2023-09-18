import { useState, useEffect } from "react";

function useDate(date: Date) {
  const [dateString, setDateString] = useState<string>("");

  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}.${month}.${day}`;
    setDateString(formattedDate);
  }, [dateString]);

  return dateString;
}

export default useDate;
