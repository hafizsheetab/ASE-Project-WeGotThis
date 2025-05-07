import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    Divider,
    TextField,
    Link,
    Stack,
    Avatar,
    useTheme,
    LinearProgress,
} from "@mui/material";
import { OfferResponseBody } from "../../offerCreation/Types";
import { getOneOffer } from "../../home/services";
import ContextStore from "../../../utils/ContextStore";
import dayjs from "dayjs";
import ActiveButton from "../../shared/components/ActiveClickButton";
import CategoryList from "../../shared/components/CategoryChipDisplay";
import TaskDescriptionSection from "../../offerCreation/components/TaskDescriptionSection";
import { AddRequestToOfferRequestBody } from "../Types";
import { addRequestToOffer, getSelf } from "../services";
import { OpenAlert, UserResponse } from "../../shared/Types";
import AlertToast from "../../shared/components/AlertToast";
import { calculateDuration, getReadableString } from "../../shared/services";

const OfferViewBody: React.FC = () => {
    const nav = useNavigate()
    const {offerId} = useParams();
    const [owner, setOwner] = useState(false)
    const theme = useTheme();
    const store = useContext(ContextStore)
    const [offer, setOffer] = useState<OfferResponseBody | null>(null);
    const [negotiable, setNegotiable] = useState(false);
    const [newPrice, setNewPrice] = useState("");
    const navigate = useNavigate()
    const [sendRequest, setSendRequest] = useState({
        disabled: false,
        text: "Send Request"
    })
    const [openAlert, setOpenAlert] = useState<OpenAlert>({
            open: false,
            message: "",
            severity: "error"
    });

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
            rating: -1,
            time: new Date(),
            servicesOffered: 0,
            servicesSeeked: 0
        });

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
    
    useEffect(() => {
        (async () => {
            if(offerId){
                const response = await getOneOffer(offerId, store)
                if("status" in response){
                    setOpenAlert({open: true, message: response.popupMessage, severity: "error"})
                    return
                }
                setOffer(response)
            }

            const userResponse = await getSelf(store);

            if ("status" in userResponse) {
                setOpenAlert({open: true, message: userResponse.popupMessage, severity: "error"})
                return;
            }
            setUser({ ...user, ...userResponse });
        })()
    }, [offerId]);

    useEffect(() => console.log(offer))

    if (!offer) {
        return <LinearProgress/>;
    }

    const handleChat = () => {
        if(!owner){
            window.location.href = `mailto:${user.email}`;
        } else {
            setOpenAlert({open: true, message: "You have created this offer", severity: "warning"})
        }
    };

    const handleSendRequest = async() => {
        const payload = {} as AddRequestToOfferRequestBody
        payload.price = newPrice ? Number(newPrice) : offer.price
        const response = await addRequestToOffer(offer.id, payload, store)

        if("status" in response){
            setOpenAlert({open: true, message: response.popupMessage, severity: "error"})
            return
        }

        setOffer(response)
        setOpenAlert({open: true, message: "A request has been sucessfully sent", severity: "success"})
        nav("/home")
    };

    return (
        <Box sx={{ width : "90%", padding: "2em 5em 3em" }}>

            <Stack direction={{xs: 'column', md: 'row'}} spacing={2} sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    my: 1,
                    gap: "5em"
                }} useFlexGap >

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
                                <div
                                onClick={() => {
                                    if(!owner){
                                        navigate(`/profile/${offer.owner.id}`);
                                    } else {
                                        setOpenAlert({open: true, message: "You have created this offer", severity: "warning"})
                                    }
                                }}>
                                <Link 
                                    underline="hover"
                                    sx={{cursor: "pointer"}}
                                >
                                    {offer.owner.firstName + " " + offer.owner.lastName}
                                </Link>
                                </div>
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
                            <strong>Date :</strong> {getReadableString(offer.startTime)} - {getReadableString(offer.endTime)}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Estimated Duration:</strong> {calculateDuration(offer.startTime, offer.endTime)}
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

        <AlertToast text={openAlert.message} open={openAlert.open} severity={openAlert.severity} handleClose={() => {
                        setOpenAlert({...openAlert, open:false});
        }}/>
    </Box>

    );
};

export default OfferViewBody;