import { useEffect, useRef } from "react";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";

const CalendarSection = ({ purchaseDate, handleDateChange }) => {
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      // Automatically trigger focus when the component mounts
      calendarRef.current.click();
    }
  }, []);

  return (
    <div className="w-1/2 p-4 border rounded-md shadow-sm bg-gray-50">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Purchase Date
      </h2>
      <NepaliDatePicker
        ref={calendarRef}
        className="w-full p-2 border rounded-lg text-gray-800"
        value={purchaseDate}
        onChange={handleDateChange}
        options={{ calenderLocale: "ne", valueLocale: "en" }}
      />
    </div>
  );
};

export default CalendarSection;
