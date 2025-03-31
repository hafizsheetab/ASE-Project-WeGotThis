import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import styles from '../offerCreation/components/OfferCreation.module.css'
import {
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    Divider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    Button,
    Link,
    CircularProgress,
    Card,
    Paper,
} from "@mui/material";
import ImageUploader from "../offerCreation/components/ImageUploader";
import OfferForm from "../offerCreation/components/OfferForm";
import { OfferResponseBody } from "../offerCreation/Types";
import { getOneOffer } from "../home/services";
import ContextStore from "../../utils/ContextStore";
import dayjs from "dayjs";

const OfferViewBody: React.FC = () => {
    const {offerId} = useParams();
    const [offer, setOffer] = useState<OfferResponseBody | null>(null);

    const [negotiable, setNegotiable] = useState(false);
    const [newPrice, setNewPrice] = useState("");
    const [availability, setAvailability] = useState("");


    const store = useContext(ContextStore)
    useEffect(() => {
        (async () => {
            if(offerId){
                const response = await getOneOffer(offerId, store)
                if("status" in response){
                    return
                }
                setOffer(response)
            }
        })()
    }, [offerId]);

    useEffect(() => {
        if (offer) {
            setNegotiable(offer.priceMode.id === 2);
            setAvailability(dayjs(offer.startTime).toISOString());
        }
    }, [offer]);

    if (!offer) {
        return <CircularProgress/>;
    }

    const handleNegotiableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNegotiable(e.target.checked);
    };

    const handleChat = () => {
        console.log("Chat clicked clicked"); //todo
    };

    const handleSendRequest = () => {
        console.log("Send Request with data:", {
            newPrice,
            availability,
            negotiable,
        });
    };

    const wordCount = offer.description
        .split(/\s+/)
        .filter(Boolean).length;

    return (

        <Paper sx={
            {
                width : "70%", 
                padding: "2em",
                margin: "4em auto"
            }}> 
            <Box
            sx={{
                maxWidth: 1000,
                mx: "auto",
                mt: 4,
                px: 2,
                display: "flex",
                flexDirection: "column",
                gap: 3,
            }}
        >
            <Box sx={{display: "flex", flexWrap: "wrap", gap: 3}}>
                <Box
                    sx={{
                        flex: "0 0 300px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            height: 300,
                            border: "1px solid #ccc",
                            borderRadius: 2,
                            backgroundColor: "#f3f4f6",
                            backgroundImage: offer.imageUrl
                                ? `url('${offer.imageUrl}')`
                                : "url('https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fb707cecb19022155ef85c595c58bf811f0e8827f21cea70f32d42de1d417c80d')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />

                    <Box>
                        <Typography variant="body2" sx={{fontWeight: "bold", mb: 1}}>
                            Offer Creator:{" "}
                            <Link
                                href="#"
                                underline="hover"
                                sx={{ml: 0.5, cursor: "pointer"}}
                            >
                                {offer.owner.firstName + " " + offer.owner.lastName}
                            </Link>
                        </Typography>
                        <Button variant="outlined" onClick={handleChat}>
                            Chat
                        </Button>
                    </Box>
                </Box>

                <Box sx={{flex: 1, display: "flex", flexDirection: "column", gap: 2}}>
                    <Typography variant="h4" fontWeight="bold">
                        {offer.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {offer.description}
                    </Typography>

                    <Typography variant="body2">
                        <strong>Location:</strong> {offer.location}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Estimated Duration:</strong> {dayjs(offer.endTime).diff(offer.startTime)} minutes
                    </Typography>

                    <Typography variant="body2">
                        <strong>Price:</strong> {offer.price}
                    </Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={negotiable}
                                onChange={handleNegotiableChange}
                                disabled
                            />
                        }
                        label="Negotiable Price"
                    />

                    <Box sx={{maxWidth: 200}}>
                        <TextField
                            label="New Price"
                            size="small"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            placeholder="Enter a new price"
                            fullWidth
                        />
                    </Box>

                    {/* <FormControl size="small" sx={{maxWidth: 200}}>
                        <InputLabel>Availabilities</InputLabel>
                        <Select
                            label="Availabilities"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                        >
                            {offer.availabilities.map((time) => (
                                <MenuItem key={time} value={time}>
                                    {time}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}

                    <Box sx={{display: "flex", justifyContent: "center", mt: 2}}>
                        <Button variant="contained" color="secondary" onClick={handleSendRequest}>
                            Send Request
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Divider/>
            <Box sx={{mt: 1}}>
                <Typography variant="h5" sx={{mb: 2}}>
                    Description
                </Typography>
                <Typography variant="body2" sx={{whiteSpace: "pre-line"}}>
                    {offer.description}
                </Typography>
                <Box sx={{textAlign: "right", mt: 1, color: "text.secondary"}}>
                    {wordCount} words
                </Box>
            </Box>
        </Box>
        </Paper>

    );
};

export default OfferViewBody;