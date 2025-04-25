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
import { OfferResponseBody } from "../../offerCreation/Types";
import dayjs from "dayjs";
import CategoryList from "../../shared/components/CategoryChipDisplay";
import {formatDuration} from "../../shared/components/HelperMethods";
import TodayIcon from '@mui/icons-material/Today';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';


type OfferCardProps = {
    offer: OfferResponseBody
};

const OfferCard: React.FC<OfferCardProps> = ({
                                                 offer
                                             }) => {
    const navigate = useNavigate();

    const handleViewOffer = () => {
        navigate(`/offer/${offer.id}`);
    };

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "2em 2em 1em",
                gap: 2
            }}
        >
           
            <Stack direction="row" spacing={3} sx={{width: "100%"}}>
                <Stack spacing={2} style={{flex: 0.8}}>
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
                    <Typography variant="h6" fontWeight={700}>
                        {offer.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                        Service {offer.type.displayValue}
                    </Typography>

                    <Box>
                        <Typography variant="body2" style={{verticalAlign: 'middle',display: 'inline-flex'}}>
                            <TodayIcon fontSize="small" sx={{marginRight: ".2em"}}/>
                            {dayjs(offer.startTime).format("ddd, MMM D, h:mm A")}; ~ {formatDuration(offer.startTime, offer.endTime)}
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
                            <Typography 
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

                </CardContent>
            </Stack>

            <Box sx={{ height: "2em", display: "flex", alignItems: "center" }}>
                <CategoryList size="small" categories={offer.categories} />
            </Box>

        </Card>
    );
};

export default OfferCard;