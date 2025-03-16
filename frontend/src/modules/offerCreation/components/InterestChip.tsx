import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const StyledInterestChip = styled(Chip)(({ theme }) => ({
    borderRadius: "10px",
    padding: "1em .2em",
    "&:hover": {
        backgroundColor: theme.palette.primary.dark, // 👈 Apply hover effect
        color: theme.palette.primary.contrastText,
    },
}));

type InterestChipProps = {
    label: string;
    deletable?: boolean;
};

const InterestChip: React.FC<InterestChipProps> = ({ label, deletable = false }) => {
    const [visible, setVisible] = useState(true);
    const handleDelete = () => {
        setVisible(false);
    };
    return visible ? (
        <StyledInterestChip
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
    ) : null;
};

export default InterestChip;
