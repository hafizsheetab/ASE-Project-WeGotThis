import { useState } from "react";
import { TextField } from "@mui/material";

type DescriptionFieldProps = {
  placeholder?: string;
  label? : string
  maxWords? : number
};

const DescriptionField: React.FC<DescriptionFieldProps> = ({ label, maxWords = -1, placeholder }) => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const words = event.target.value.trim().split(/\s+/).filter(Boolean);
    
    if (maxWords >= 0 && words.length <= maxWords) {
      setText(event.target.value);
      setWordCount(words.length);
      setError(false);
    } else if (maxWords >= 0){
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
        value={text}
        onChange={handleTextChange}
        error={error}
        FormHelperTextProps={{ sx: { textAlign: "right", marginRight: 0 } }}
        helperText={(maxWords>=0) ? 
          (error
            ? `Word limit reached (${maxWords} max)`
            : `${wordCount} / ${maxWords} words`) : " "
        }
      />
  );
};

export default DescriptionField;
