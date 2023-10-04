import { useState, useEffect } from "react";

function useDate(date: Date) {
  const [dateString, setDateString] = useState<string>("");

  useEffect(() => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setDateString(formattedDate);
  }, [date]);

  return dateString;
}

export default useDate;
