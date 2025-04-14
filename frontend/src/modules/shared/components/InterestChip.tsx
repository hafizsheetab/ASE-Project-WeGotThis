import Chip from "@mui/material/Chip";
import { styled, useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const StyledInterestChip = styled(Chip)(({ theme }) => ({
    borderRadius: "10px",
    padding: "1em .2em",
    "&:hover": {
        backgroundColor: theme.palette.primary,
        color: theme.palette.primary.dark,
    },
}));

type InterestChipProps = {
    label: string;
    deletable?: boolean;
    onDelete?: (label: string) => void | undefined;
    size? : "medium" | "small"
};

const InterestChip: React.FC<InterestChipProps> = ({ label, deletable = false, onDelete, size = "medium" }) => {
    const theme = useTheme()

    const handleDelete = () => {
        if(onDelete){
            onDelete(label)
        }
    };

       return  <StyledInterestChip
       color="primary"
       variant="outlined"
       size={size}
       clickable={onDelete? true : false}
       onClick={handleDelete}
       {...(deletable && { onDelete: handleDelete })}
       deleteIcon={<CloseIcon />}
       label={label}
       sx={{
           "&:hover .MuiChip-deleteIcon": {
               color: theme.palette.primary.dark
           }
       }}
   />
    
};

export default InterestChip;
