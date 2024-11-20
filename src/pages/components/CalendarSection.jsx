import React, { useEffect, useRef } from "react";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";

const CalendarSection = ({ purchaseDate, handleDateChange }) => {
  const calendarInputRef = useRef(null);

  useEffect(() => {
    if (calendarInputRef.current) {
      // Automatically focus on the calendar input when the component is rendered
      calendarInputRef.current.focus();
    }
  }, []);

  return (
    <div className="p-4 border rounded-md shadow-sm bg-gray-50">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Purchase Date
      </h2>
      <NepaliDatePicker
        inputRef={calendarInputRef}
        className="w-full p-2 border rounded-lg text-gray-800"
        value={purchaseDate}
        onChange={handleDateChange}
        options={{ calenderLocale: "ne", valueLocale: "en" }}
      />
    </div>
  );
};

export default CalendarSection;
