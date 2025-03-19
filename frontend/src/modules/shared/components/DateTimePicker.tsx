import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';

type BasicDateTimePickerProps = {
    label : string
    value?: Dayjs | null
    onChange? : (value: Dayjs | null) => void; 
}

const BasicDateTimePicker : React.FC<BasicDateTimePickerProps> = ({label, value, onChange}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker 
            label={label}
            value={value}
            onChange={onChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default BasicDateTimePicker;