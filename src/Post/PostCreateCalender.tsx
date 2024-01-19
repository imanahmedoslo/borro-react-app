import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';

export default function ResponsiveDateRangePickers() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
        
          'StaticDateRangePicker',
        ]}
      >
       
        <DemoItem label="Static variant" component="StaticDateRangePicker">
          <StaticDateRangePicker
            defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
            sx={{
              [`.${pickersLayoutClasses.contentWrapper}`]: {
                alignItems: 'center',
              },
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}