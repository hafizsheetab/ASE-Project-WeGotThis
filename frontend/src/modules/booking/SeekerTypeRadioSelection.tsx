import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

type RadioSeekerTypeProps = {
  onChangeTrigger? : (value : string) => void
}

const RadioSeekerType : React.FC<RadioSeekerTypeProps> = ({onChangeTrigger}) => {
  const [value, setValue] = React.useState('seeking');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);

    if (onChangeTrigger){
      onChangeTrigger((event.target as HTMLInputElement).value);
    }
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="seeking" control={<Radio />} label="Service Seeking" />
        <FormControlLabel value="providing" control={<Radio />} label="Service Providing" />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioSeekerType