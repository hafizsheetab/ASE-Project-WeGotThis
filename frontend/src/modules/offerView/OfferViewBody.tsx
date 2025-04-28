import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
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
    Stack,
    Avatar,
    useTheme,
    Switch,
} from "@mui/material";
import { OfferResponseBody } from "../offerCreation/Types";
import { getOneOffer } from "../home/services";
import ContextStore from "../../utils/ContextStore";
import dayjs from "dayjs";
import ActiveButton from "../shared/components/ActiveClickButton";
import CategoryList from "../shared/components/CategoryChipDisplay";
import TaskDescriptionSection from "../offerCreation/components/TaskDescriptionSection";
import { AddRequestToOfferRequestBody } from "./Types";
import { addRequestToOffer, getSelf } from "./services";
import { UserResponse } from "../shared/Types";

const OfferViewBody: React.FC = () => {
    const nav = useNavigate()
    const {offerId} = useParams();
    const theme = useTheme();
    const [offer, setOffer] = useState<OfferResponseBody | null>(null);

    const [negotiable, setNegotiable] = useState(false);
    const [newPrice, setNewPrice] = useState("");

    const [sendRequest, setSendRequest] = useState({
        disabled: false,
        text: "Send Request"
    })

    const [user, setUser] = useState<UserResponse>({
            firstName: "",
            lastName: "",
            email: "",
            expire: true,
            id: "",
            phoneNumber: "",
            location: "",
            categories: [],
            imageUrl: "",
        });

    const [owner, setOwner] = useState(false)
    useEffect(() => {
        if(offer){
            if(offer.requests.find(r => r.id === store.context.user.id)){
                setSendRequest({
                    disabled: true,
                    text: "Request already sent"
                })
            }else{
                setSendRequest({
                    disabled: false,
                    text: "Send Request"
                })
            }
            setOwner(offer.owner.id === store.context.user.id)
        }
    },[offer])
    const store = useContext(ContextStore)

    const formatDuration = (startTime: number, endTime: number) => {
        const diffMinutes = dayjs(endTime).diff(dayjs(startTime), "minutes");
    
        if (diffMinutes >= 1440) {
            return `${Math.floor(diffMinutes / 1440)} days`;
        } else if (diffMinutes >= 60) {
            return `${Math.floor(diffMinutes / 60)} hours`;
        } else {
            return `${diffMinutes} minutes`;
        }
    };
    
    useEffect(() => {
        (async () => {
            if(offerId){
                const response = await getOneOffer(offerId, store)
                if("status" in response){
                    return
                }
                setOffer(response)
            }

            const userResponse = await getSelf(store);
            if ("status" in userResponse) {
                return;
            }
            setUser({ ...user, ...userResponse });
        })()
    }, [offerId]);

    if (!offer) {
        return <CircularProgress/>;
    }

    const handleChat = () => {
        window.location.href = `mailto:${user.email}`;
    };

    const handleSendRequest = async() => {
        const payload = {} as AddRequestToOfferRequestBody
        payload.price = newPrice ? Number(newPrice) : offer.price
        const response = await addRequestToOffer(offer.id, payload, store)
        console.log(response)
        if("status" in response){
            return
        }
        setOffer(response)
        nav("/home")
    };
    return (
        <Box sx={{ width : "90%", padding: "2em 5em 3em" }}>

            <Stack direction={{xs: 'column', md: 'row'}} spacing={2} sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    my: 1,
                    gap: "5em"
                }}useFlexGap >

                <Stack spacing={2} 
                    sx={{width: "100%"}}
                    style={{flex: 1, alignSelf:"start", marginTop:"1em"}}>
                    <Box
                        sx={{
                            height: 240,
                            backgroundImage: `url('${offer.imageUrl}')`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            borderRadius: 2,
                            border: "1px solid #e0e0e0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 2,
                        }}
                    />

                    <Stack style={{marginTop: "1em"}} gap={2} direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={1}>
                            <Avatar sx={{bgcolor:theme.palette.primary.main}}>U</Avatar>
                            <Stack>
                                <Typography variant="body2" color={theme.palette.text.secondary}>Creator:</Typography>
                                <Link href="#"
                                    underline="hover"
                                    sx={{cursor: "pointer"}}
                                >
                                    { owner ? "You" : offer.owner.firstName + " " + offer.owner.lastName}
                                </Link>
                            </Stack>
                        </Stack>
                        <ActiveButton buttonTxt="Chat" variant="outlined" onClick={handleChat}/>
                    </Stack>
                </Stack>

                <Stack sx={{flex: 1.5}} spacing={2}>
                    <Box>
                        <h1 style={{marginBottom:".1em"}}> {offer.title} </h1>
                        <Typography variant="body1" color={theme.palette.text.secondary}>
                            Service {offer.type.displayValue}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1">
                            <strong>Location:</strong> {offer.location}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Date :</strong> {dayjs(offer.startTime).format("llll")} - {dayjs(offer.endTime).format("llll")}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Estimated Duration:</strong> {formatDuration(offer.startTime, offer.endTime)}
                        </Typography>
                    </Box>
                    <CategoryList categories={offer.categories} />

                    <Box>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="body1">
                                <strong>Price:</strong> {offer.price} CHF
                            </Typography>
                            { offer.priceMode.id != 2? 
                                <Typography color={theme.palette.text.secondary}>Fixed Price</Typography> : 
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={(e) => setNegotiable(e.target.checked)}
                                            />
                                    }
                                    label="Negotiate?"
                                    labelPlacement="start"
                                />
                            }
                            
                        </Stack>

                        <TextField
                            style={{width: "50%", marginTop:".2em"}}
                            disabled={!negotiable}
                            label="New Price"
                            size="small"
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            placeholder="Enter a new price"
                        />
                    </Box>

                    {!owner&& <ActiveButton disabled={sendRequest.disabled} buttonTxt={sendRequest.text} onClick={handleSendRequest} style={{width: "40%", margin:"2.5em auto"}}/>}
                </Stack>
            </Stack>


        <Divider/>
        <TaskDescriptionSection value={offer.description} readonly={true}/>
    </Box>

    );
};

export default OfferViewBody;