import React, { useEffect, useRef } from 'react';
import { NepaliDatePicker } from 'nepali-datepicker-reactjs';
import 'nepali-datepicker-reactjs/dist/index.css';

const CalendarSection = ({ purchaseDate, handleDateChange }) => {
  return (
    <div className="p-4 border rounded-md shadow-sm bg-gray-50">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Purchase Date</h2>
      <NepaliDatePicker
        className="w-full p-2 border rounded-lg text-gray-800"
        value={purchaseDate}
        onChange={(date) => {
          console.log("Date Selected:", date); // Log the selected date for debugging
          handleDateChange(date); // Pass the date to the parent component
        }}
        options={{
          calenderLocale: 'en',
          valueLocale: 'en',
        }}
      />
    </div>
  );
};



export default CalendarSection;
