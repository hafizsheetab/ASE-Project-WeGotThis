import styles from "./OfferCreation.module.css"
import { useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { FormHelperText, InputAdornment, TextField } from "@mui/material";
import { DateTimePicker, DateTimeValidationError, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


type DateTimeRangeProps = {
    initialStartTime?: Dayjs | Date;
    initialEndTime?: Dayjs | Date;

    setTime: (startTime: number, endTime: number) =>  void

};

const DateTimeRange: React.FC<DateTimeRangeProps> = ({
                                                         initialStartTime,
                                                         initialEndTime,
                                                        setTime
                                                     }) => {
    const [duration, setDuration] = useState(0);
    const [durationUnit, setDurationUnit] = useState<"min" | "hours" | "days">("min");
    const or_today = dayjs();
    const today = or_today.add(5 - (or_today.minute() % 5), "minute").startOf("minute")
    const [startDate, setStartDate] = useState<Dayjs>(
        initialStartTime ? dayjs(initialStartTime) : dayjs(today)
    );
    const [endDate, setEndDate] = useState<Dayjs | null>(
        initialEndTime ? dayjs(initialEndTime) : dayjs('2022-04-17T15:30')
    );
    const [error, setError] = useState<DateTimeValidationError | null>(null);

    const errorMessage = useMemo(() => {
        switch (error) {
          case 'maxDate':
          case 'minDate': {
            return 'Pick a date after start.';
          }
    
          case 'invalidDate': {
            return 'Date not valid';
          }
    
          default: {
            return '';
          }
        }
      }, [error]);

    useEffect(() => {
        if (startDate && endDate) {
            setTime(startDate.unix(), endDate.unix());
            
            const diffMinutes = endDate.diff(startDate, "minutes");
            let newDuration;
            let newUnit: "min" | "hours" | "days"; 
    
            if (diffMinutes >= 1440) { // More than 24 hours
                newDuration = endDate.diff(startDate, "days");
                newUnit = "days";
            } else if (diffMinutes >= 60) { // More than 60 minutes
                newDuration = endDate.diff(startDate, "hours");
                newUnit = "hours";
            } else {
                newDuration = diffMinutes;
                newUnit = "min";
            }
    
            setDuration(Math.max(newDuration, 0));  
            setDurationUnit(newUnit);
        }
    }, [startDate, endDate]); 
    

    return (
        <>
            <div className={styles.timeSelectionWrapper}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Start Date"
                        defaultValue={today.startOf('minute').subtract(today.minute() % 5, 'minute')}
                        disablePast
                        views={['year', 'month', 'day', 'hours', 'minutes']}
                        onChange={(newValue) => setStartDate(newValue? newValue : today)}
                    />
                    <p>-</p>
                    <DateTimePicker
                        label="End Date"
                        defaultValue={today.startOf('minute').subtract(today.minute() % 5, 'minute')}
                        disablePast
                        minDate={startDate}
                        views={['year', 'month', 'day', 'hours', 'minutes']}
                        onChange={(newValue) => setEndDate(newValue)}
                        onError={(error) => setError(error)}
                    />
                    <TextField
                        label="Duration"
                        value={String(duration)}
                        variant="outlined"
                        className={styles.durationInput}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">{durationUnit}</InputAdornment>,
                                readOnly: true,
                            },
                        }}
                    />
                </LocalizationProvider>
            </div>
            <FormHelperText style={{marginBottom: "1.5em"}} error>{errorMessage}</FormHelperText>
        </>
        
    );
};

export default DateTimeRange;