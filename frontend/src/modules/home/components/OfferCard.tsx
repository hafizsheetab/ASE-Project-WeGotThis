import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Stack,
} from "@mui/material";
import ActiveButton from "../../shared/components/ActiveClickButton";
import {useNavigate} from "react-router-dom";
import TodayIcon from '@mui/icons-material/Today';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { calculateDuration, getReadableDateTimeString } from "../../shared/services";
import { OfferCardProps } from "../Types";

const OfferCard: React.FC<OfferCardProps> = ({offer}) => {
    const navigate = useNavigate();

    const handleViewOffer = () => {
        navigate(`/offer/${offer.id}`);
    };

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "strech",
                padding: "2em 1em",
                gap: 1
            }}
        >
           
            <Stack direction="row" spacing={{xs: 0, sm: 3}} sx={{width: "100%"}}>
                <Stack spacing={2} style={{flex: 0.8}} sx={{display: {xs: 'none', sm:'block'}}}>
                    <CardMedia
                        component="img"
                        src={offer.imageUrl}
                        alt={offer.title}
                        sx={{
                            height: 150,
                            borderRadius: 2,
                            objectFit: "cover",
                        }}
                    />

                    <ActiveButton
                        size="small"
                        variant="outlined"
                        buttonTxt="View Offer"
                        color="secondary"
                        onClick={handleViewOffer}
                    />
                </Stack>

                <CardContent sx={{flex: 1.5, p: 0, "&:last-child": {paddingBottom: 0}}}>
                    <Typography variant="h6" fontWeight={700} lineHeight={1.25}>
                        {offer.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                        Service {offer.type.displayValue}
                    </Typography>

                    <Box>
                        <Typography variant="body2" style={{verticalAlign: 'middle',display: 'inline-flex'}}>
                            <TodayIcon fontSize="small" sx={{marginRight: ".2em"}}/>
                            {getReadableDateTimeString(offer.startTime)}; ~ {calculateDuration(offer.startTime, offer.endTime)}
                        </Typography>
                        <br/>
                        <Typography variant="body2" style={{verticalAlign: 'middle',display: 'inline-flex'}}>
                            <NearMeOutlinedIcon fontSize="small" sx={{marginRight: ".2em"}}/>
                            {offer.location.split(',').slice(-2).join(', ')}
                        </Typography>
                        <br/>
                        <Typography variant="body2" style={{verticalAlign: 'middle',display: 'inline-flex'}}>
                            <LocalOfferOutlinedIcon fontSize="small" sx={{marginRight: ".2em"}}/>
                            {offer.price} CHF&nbsp;
                            <Typography  component="span"
                                variant="body2" color="textSecondary"> {offer.priceMode.id == 2? "(Negotiable)" : "(Fixed)"}</Typography>
                        </Typography>
                    </Box>

                    <Box
                        style={{
                            marginTop: "1em",
                            maxHeight: "5em",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3,
                        }}
                        >
                        <Typography variant="body2">{offer.description}</Typography>
                    </Box>

                   <Box sx={{display: {xs: 'block', sm: 'none'}, marginTop: '1.5em'}}>
                    <ActiveButton
                            size="small"
                            variant="outlined"
                            buttonTxt="View Offer"
                            color="secondary"
                            onClick={handleViewOffer}
                        />
                   </Box>

                </CardContent>
            </Stack>

        </Card>
    );
};

export default OfferCard;