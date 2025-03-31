import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Stack,
    Chip,
    Divider,
} from "@mui/material";
import ActiveButton from "../../shared/components/ActiveClickButton";
import {useNavigate} from "react-router-dom";
import { OfferResponseBody } from "../../offerCreation/Types";
import dayjs from "dayjs";

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
                alignItems: "flex-start",
                p: 2,
                gap: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    minWidth: 180,
                }}
            >
                <CardMedia
                    component="img"
                    src={offer.imageUrl}
                    alt={offer.title}
                    sx={{
                        width: 180,
                        height: 180,
                        borderRadius: 2,
                        objectFit: "cover",
                    }}
                />

                <ActiveButton
                    buttonTxt="View Offer"
                    color="secondary"
                    onClick={handleViewOffer}
                />

                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {offer.categories?.map((tag, idx) => (
                        <Chip key={idx} label={tag.displayValue} color="primary"/>
                    ))}
                </Stack>
            </Box>

            <Divider orientation="vertical" flexItem/>

            <CardContent sx={{flex: 1, p: 0, "&:last-child": {paddingBottom: 0}}}>
                <Typography variant="h5" fontWeight={700}>
                    {offer.title}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary" sx={{mb: 1}}>
                    {offer.type.displayValue}
                </Typography>

                <Typography variant="body2" sx={{mb: 0.5}}>
                    <strong>Next Availability:</strong> {dayjs(offer.startTime).toISOString()}
                </Typography>
                <Typography variant="body2" sx={{mb: 1}}>
                    <strong>Price:</strong> {offer.price}
                </Typography>

                <Typography variant="body2">{offer.description}</Typography>
            </CardContent>
        </Card>
    );
};

export default OfferCard;