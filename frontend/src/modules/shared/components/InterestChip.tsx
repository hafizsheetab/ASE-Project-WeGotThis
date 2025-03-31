import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const StyledInterestChip = styled(Chip)(({ theme }) => ({
    borderRadius: "10px",
    padding: "1em .2em",
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
    },
}));

type InterestChipProps = {
    label: string;
    deletable?: boolean;
    onDelete?: (label: string) => void 
};

const InterestChip: React.FC<InterestChipProps> = ({ label, deletable = false, onDelete }) => {

    const handleDelete = () => {
        if(onDelete){
            onDelete(label)
        }
    };

       return  <StyledInterestChip
       color="primary"
       variant="filled"
       onClick={handleDelete}
       {...(deletable && { onDelete: handleDelete })}
       deleteIcon={<CloseIcon />}
       label={label}
       sx={{
           "&:hover .MuiChip-deleteIcon": {
               color: "white", 
           },
       }}
   />
    
};

export default InterestChip;
