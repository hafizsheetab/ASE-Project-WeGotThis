import styles from "./OfferCreation.module.css"
import BasicDateTimePicker from "../../shared/components/DateTimePicker";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { InputAdornment, TextField } from "@mui/material";

const DateTimeRange = () => {

    const [duration, setDuration] = useState(0)
    const [durationUnit, setDurationUnit] = useState<"min" | "hours" | "days">("min");
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

    useEffect(() => {
    if (startDate && endDate) {
      let diffMinutes = endDate.diff(startDate, "minutes");

      // Automatically adjust the unit
      if (diffMinutes >= 1440) { // More than 24 hours (1440 min)
        setDuration(endDate.diff(startDate, "days"));
        setDurationUnit("days");
      } else if (diffMinutes >= 60) { // More than 60 min
        setDuration(endDate.diff(startDate, "hours"));
        setDurationUnit("hours");
      } else {
        setDuration(diffMinutes);
        setDurationUnit("min");
      }
    }
  }, [startDate, endDate]);


    return (
        <div className={styles.timeSelectionWrapper}>
            <BasicDateTimePicker 
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}/>
            <p>-</p>
            <BasicDateTimePicker 
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}/>

            <TextField
                label="Duration"
                value={String(duration)}
                variant="outlined"
                className={styles.durationInput}
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position='end'>{durationUnit}</InputAdornment>,
                        readOnly: true
                    }
                }}
            />
        </div>
    )
}

export default DateTimeRange