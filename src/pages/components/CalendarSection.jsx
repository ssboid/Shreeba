import React, { useEffect, useRef } from 'react';
import { NepaliDatePicker } from 'nepali-datepicker-reactjs';
import 'nepali-datepicker-reactjs/dist/index.css';

const CalendarSection = ({ purchaseDate, handleDateChange }) => {
  const calendarRef = useRef(null);

  useEffect(() => {
    // Attempt to open the calendar programmatically
    const openCalendar = () => {
      const calendarTrigger = calendarRef.current?.parentElement?.querySelector('button');
      if (calendarTrigger) {
        calendarTrigger.click();
      }
    };

    openCalendar();
  }, []);

  return (
    <div className="p-4 border rounded-md shadow-sm bg-gray-50">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Purchase Date</h2>
      <NepaliDatePicker
        inputRef={calendarRef} // Assign ref to access DOM
        className="w-full p-2 border rounded-lg text-gray-800"
        value={purchaseDate}
        onChange={handleDateChange}
        options={{
          calenderLocale: 'en',
          valueLocale: 'en',
        }}
      />
    </div>
  );
};

export default CalendarSection;
