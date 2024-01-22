import * as React from 'react';
import {useState} from 'react'
import { Range, DateRange, DateRangeProps } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file



export default function Calendar() {
    const [dateRange, setDateRange] = useState<Range[]>([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ]);
  
    const handleDateChange = (item) => {
      // Update the state when the date range changes
      setDateRange([item.selection]);
    };
  
    return (
        <div style={calendarContainerStyle}>
      <DateRange
        editableDateInputs={true}
        onChange={handleDateChange}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        weekStartsOn={1}

      />
      </div>
    );
  }
  const calendarContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  };






