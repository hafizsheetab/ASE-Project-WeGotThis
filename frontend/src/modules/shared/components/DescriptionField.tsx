import {useState, useEffect} from "react";
import { Box, FormHelperText, Stack, TextField } from "@mui/material";

type DescriptionFieldProps = {
  placeholder?: string;
    label?: string;
    maxWords?: number;
    value?: string;
    onChange?: (value: string) => void;
    hasError? : boolean;
    readonly? : boolean;
};

const DescriptionField: React.FC<DescriptionFieldProps> = ({
                                                               label,
                                                               maxWords = -1,
                                                               placeholder,
                                                               value: initialValue = "",
                                                               onChange, hasError, readonly
                                                           }) => {
  const [text, setText] = useState(initialValue);
  const [wordCount, setWordCount] = useState(0);
  const [errorMessage, setError] = useState(false);

    useEffect(() => {
        setText(initialValue);
    }, [initialValue]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newText = event.target.value;
      const words = newText.trim().split(/\s+/).filter(Boolean);

      setError(false)
      setText(newText);
      setWordCount(words.length);
      if (onChange) onChange(newText);

      if(words.length > maxWords){
        setError(true)
      } 
  };

  return (
    <Box>
      <TextField
          id="outlined-multiline-static"
          label={label}
          multiline
          fullWidth
          minRows={5}
          maxRows={10}
          placeholder={placeholder}
          value={text}
          onChange={handleTextChange}
          error={hasError || errorMessage}
          slotProps={{
            input: {
              readOnly: readonly,
            },
          }}
          
      />
      <Stack direction='row' justifyContent='space-between' sx={{margin: 1}}>
      {errorMessage ? (
          <FormHelperText sx={{ textAlign: "left", margin: 0 }}>
            {`Word limit reached (${maxWords} max)`}
          </FormHelperText>
        ) : hasError ? (
          <FormHelperText sx={{ textAlign: "left", margin: 0 }}>
            {"Description is too short"}
          </FormHelperText>
        ) : null}


        {!readonly && <FormHelperText sx={{flexGrow: 1,  textAlign: "right", margin: 0 }}>
          {`${wordCount} / ${maxWords} words`}
        </FormHelperText>}
      </Stack>  
    </Box>
  );
};

export default DescriptionField;