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

type OfferCardProps = {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    availability: string;
    price: string;
    imageUrl: string;
};

const OfferCard: React.FC<OfferCardProps> = ({
                                                 id,
                                                 title,
                                                 description,
                                                 category,
                                                 tags,
                                                 availability,
                                                 price,
                                                 imageUrl,
                                             }) => {
    const navigate = useNavigate();

    const handleViewOffer = () => {
        navigate(`/offer/${id}`);
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
                    src={imageUrl}
                    alt={title}
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
                    {tags?.map((tag, idx) => (
                        <Chip key={idx} label={tag} color="primary"/>
                    ))}
                </Stack>
            </Box>

            <Divider orientation="vertical" flexItem/>

            <CardContent sx={{flex: 1, p: 0, "&:last-child": {paddingBottom: 0}}}>
                <Typography variant="h5" fontWeight={700}>
                    {title}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary" sx={{mb: 1}}>
                    {category}
                </Typography>

                <Typography variant="body2" sx={{mb: 0.5}}>
                    <strong>Next Availability:</strong> {availability}
                </Typography>
                <Typography variant="body2" sx={{mb: 1}}>
                    <strong>Price:</strong> {price}
                </Typography>

                <Typography variant="body2">{description}</Typography>
            </CardContent>
        </Card>
    );
};

export default OfferCard;