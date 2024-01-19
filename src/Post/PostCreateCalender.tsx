import * as React from 'react';
import {useState} from 'react'
import { Range, DateRange, DateRangeProps } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';


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






//   <LocalizationProvider dateAdapter={AdapterDayjs}>
//   <DemoContainer
//     components={[
    
//       'StaticDateRangePicker',
//     ]}
//   >
   
//     <DemoItem label="Static variant" component="StaticDateRangePicker">
//       <StaticDateRangePicker
//         defaultValue={[dayjs('2024-01-23'), dayjs('2024-01-27')]}
//         sx={{
//           [`.${pickersLayoutClasses.contentWrapper}`]: {
//             alignItems: 'center',
//           },
//         }}
//       />
//     </DemoItem>
//   </DemoContainer>
// </LocalizationProvider>