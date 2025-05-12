import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import { useContext, useEffect, useState } from "react";
import TodayIcon from "@mui/icons-material/Today";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { Stack } from "@mui/material";
import ContextStore from "../../../utils/ContextStore";
import ReviewDialog from "./ReviewDialog";
import { BookingCardProps } from "../Types";
import { getDateTimeString, getReadableDateTimeString } from "../../shared/services";
import { OpenAlert } from "../../shared/Types";
import AlertToast from "../../shared/components/AlertToast";
import CardActionsSection from "./CardActionSelection";

const BookingCard: React.FC<BookingCardProps> = ({
    title,
    type,
    availability,
    location,
    originalPrice,
    priceMode,
    newPrice,
    statusType,
    requestId,
    offerId,
    userEmail,
    loadArray,
    request,
    offerOwnerId
}) => {
    const store = useContext(ContextStore);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const open = Boolean(anchorEl);
    const [madeByMe, setMadeByMe] = useState(false);
    const [openAlert, setOpenAlert] = useState<OpenAlert>({
            open: false,
            message: "",
            severity: "error"
        });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setMadeByMe(requestId !== store.context.user.id)
    }, [madeByMe, requestId, store.context.user.id])

    const cardAction = (
        <CardActionsSection
            statusType={statusType}
            store={store}
            offerId={offerId}
            requestId={requestId}
            userEmail={userEmail}
            madeByMe={madeByMe}
            type={type}
            anchorEl={anchorEl}
            open={open}
            handleClick={handleClick}
            handleClose={handleClose}
            loadArray={loadArray}
            setOpenAlert={setOpenAlert}
            request={request}
            setIsDialogOpen={setIsDialogOpen}
            offerOwnerId={offerOwnerId}
        />
    )

    
    return (
        <Card
            sx={{ margin: "2em 0", backgroundColor: "white", border: "none" }}
        >
            <CardHeader
                action={cardAction}
                title={title}
                subheader={`Requested on: ${getDateTimeString(request.time)}`}
            />

            <CardActionArea sx={{ display: "flex" }}>
                <CardMedia
                    sx={{ flexBasis: "30%" }}
                    component="img"
                    height="100"
                    image={request.offer.imageUrl}
                    alt="requested offer"
                />

                <CardContent sx={{ flex: "1" }}>
                    <Typography variant="body2" color="textSecondary">
                        Service {type}
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{
                            verticalAlign: "middle",
                            display: "inline-flex",
                            marginTop: ".4em",
                        }}
                    >
                        <TodayIcon
                            fontSize="small"
                            sx={{ marginRight: ".2em" }}
                        />
                        {getReadableDateTimeString(availability)}
                    </Typography>
                    <br />
                    <Typography
                        variant="body2"
                        style={{
                            verticalAlign: "middle",
                            display: "inline-flex",
                        }}
                    >
                        <NearMeOutlinedIcon
                            fontSize="small"
                            sx={{ marginRight: ".2em" }}
                        />
                        {location}
                    </Typography>
                    <br />
                    <Stack direction="row">
                        <LocalOfferOutlinedIcon
                            fontSize="small"
                            sx={{ marginRight: ".2em" }}
                        />
                        <Typography
                            variant="body2"
                            color={newPrice ? "info" : "info"}
                        >
                            {originalPrice} CHF
                        </Typography>
                        {typeof newPrice === "number" && priceMode === 2 && (
                            <>
                                <Typography variant="body2">
                                    &nbsp;-&nbsp;
                                </Typography>
                                <Typography variant="body2" color="error">
                                    Proposed: {newPrice} CHF
                                </Typography>
                            </>
                        )}

                    </Stack>
                </CardContent>
            </CardActionArea>

            <ReviewDialog
                open={isDialogOpen}
                onClose={() => {
                    loadArray()
                    setIsDialogOpen(false)
                }}
                offerId={offerId}
                requestId={requestId}
            />

            <AlertToast text={openAlert.message} open={openAlert.open} severity={openAlert.severity} handleClose={() => {
                setOpenAlert({...openAlert, open:false});
            }}/>
        </Card>
    );
};

export default BookingCard;
