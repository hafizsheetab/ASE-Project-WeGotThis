import {useState, useEffect} from "react";
import { TextField } from "@mui/material";

type DescriptionFieldProps = {
  placeholder?: string;
    label?: string;
    maxWords?: number;
    value?: string;
    onChange?: (value: string) => void;
    hasError? : boolean
};

const DescriptionField: React.FC<DescriptionFieldProps> = ({
                                                               label,
                                                               maxWords = -1,
                                                               placeholder,
                                                               value: initialValue = "",
                                                               onChange, hasError
                                                           }) => {
    const [text, setText] = useState(initialValue);
  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState(false);

    useEffect(() => {
        setText(initialValue);
    }, [initialValue]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newText = event.target.value;
      const words = newText.trim().split(/\s+/).filter(Boolean);

    if (maxWords >= 0 && words.length <= maxWords) {
        setText(newText);
      setWordCount(words.length);
      setError(false);
        if (onChange) onChange(newText);
    } else if (maxWords >= 0) {
      setError(true);
    }
  };

  return (
      <TextField
          id="outlined-multiline-static"
          label={label}
          multiline
          fullWidth
          minRows={5}
          maxRows={10}
          placeholder={placeholder}
          required
          value={text}
          onChange={handleTextChange}
          error={hasError || error}
          FormHelperTextProps={{sx: {textAlign: "right", marginRight: 0}}}
          helperText={
              maxWords >= 0
                  ? error
                      ? `Word limit reached (${maxWords} max)`
                      : `${wordCount} / ${maxWords} words`
                  : " "
          }
      />
  );
};

export default DescriptionField;