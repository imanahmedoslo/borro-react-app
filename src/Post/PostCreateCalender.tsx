import * as React from "react";
import { useState } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

type calenderProps = {
  state: Range[];
  setState: (state: Range[]) => void;
  handleDateChange: (item: RangeKeyDict) => void;
};

export default function Calendar({
  state,
  handleDateChange,
  setState,
}: calenderProps) {
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  /* const handleDateChange = (item:RangeKeyDict) => {
		 // Update the state when the date range changes
			setDateRange([item.selection]);
			console.log(item)
			console.log(dateRange)
			console.log(item.selection)
		};*/
  return (
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={(e) => handleDateChange(e)}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        weekStartsOn={1}
        className="calendarContainerStyle"
      />
    </div>
  );
}
