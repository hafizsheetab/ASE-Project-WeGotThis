import { useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { FormHelperText, InputAdornment, Stack, TextField, Typography } from "@mui/material";
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
        initialEndTime ? dayjs(initialEndTime) : dayjs(today)
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
    }, [startDate, endDate, setTime]); 
    

    return (
        <>
            <Stack direction={{xs: 'column', md:'row'}} gap={2} alignItems='start'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack direction={{xs:'column', smd: 'row'}} gap={2}>
                        <DateTimePicker
                            label="Start Date"
                            defaultValue={today.startOf('minute').subtract(today.minute() % 5, 'minute')}
                            disablePast
                            views={['year', 'month', 'day', 'hours', 'minutes']}
                            onChange={(newValue) => setStartDate(newValue? newValue : today)}
                        />

                        <Typography sx={{textAlign: 'center', margin: 'auto', display: {xs:'none', smd: 'block'}}}>-</Typography>
                        <DateTimePicker
                            label="End Date"
                            defaultValue={today.startOf('minute').subtract(today.minute() % 5, 'minute')}
                            disablePast
                            minDate={startDate}
                            minDateTime={startDate}
                            views={['year', 'month', 'day', 'hours', 'minutes']}
                            onChange={(newValue) => setEndDate(newValue)}
                            onError={(error) => setError(error)}
                        />
                    </Stack>
                    <TextField
                        label="Duration"
                        value={String(duration)}
                        variant="outlined"
                        style={{width: "100px"}}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">{durationUnit}</InputAdornment>,
                                readOnly: true,
                            },
                        }}
                    />
                </LocalizationProvider>
            </Stack>
            <FormHelperText style={{marginBottom: "1.5em"}} error>{errorMessage}</FormHelperText>
        </>
        
    );
};

export default DateTimeRange;