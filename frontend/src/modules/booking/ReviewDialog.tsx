import React, { useContext, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Rating, Stack, styled, Typography } from "@mui/material";
import DescriptionField from '../shared/components/DescriptionField';
import ActiveButton from '../shared/components/ActiveClickButton';
import { giveReview } from '../offerList/services';
import ContextStore from '../../utils/ContextStore';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

type ReviewDialogProps = {
    open: boolean;
    onClose: () => void;
    offerId: string;
    requestId: string;
  };

const ReviewDialog: React.FC<ReviewDialogProps> = ({ open, onClose, offerId, requestId }) => {
    const [rating, setRating] = useState<number | null>(null);
    const [text, setText] = useState<string>('');
    const store = useContext(ContextStore)
    const handleComplete = async() => {
        const response = await giveReview(store, {rating: rating ? rating : 0, text}, offerId, requestId)
        if("status" in response){
            return
        }
        console.log(response)
        onClose();
    };

    return (
        <BootstrapDialog
        onClose={onClose}
        aria-labelledby="review-dialog-title"
        open={open}
        slotProps={{
            paper: {
                sx: {
                    width: {xs: 'auto', md: '40vw'}
                }
            }
          }}
        >
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <DialogTitle sx={{ m: 0, p: 2 }} id="review-dialog-title">
                    Tell Us About Your Experience
                </DialogTitle>
                
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={(theme) => ({
                    color: theme.palette.grey[500],
                    height: 'fit-content'
                    })}
                >
                    <CloseIcon />
                </IconButton>
            </Stack>

        <DialogContent dividers>
            <Stack spacing={3}>
            <Box>
                <Typography gutterBottom variant="subtitle1">
                How would you rate your experience?
                </Typography>
                <Rating
                name="user-review-rating"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
                size="large"
                />
            </Box>

            <Box>
                <Typography gutterBottom variant="subtitle1">
                Leave a review
                </Typography>
                <DescriptionField value={text} onChange={(e) => setText(e)} readonly={false} maxWords={150} placeholder='Optional'/>
            </Box>
            </Stack>
        </DialogContent>

        <DialogActions>
            <ActiveButton onClick={handleComplete} buttonTxt='Submit Review'/>
        </DialogActions>

    </BootstrapDialog>
    );
};
export default ReviewDialog