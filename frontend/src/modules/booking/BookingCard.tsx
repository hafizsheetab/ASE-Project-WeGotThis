import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import testImg from "../../assets/test.png";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useState } from "react";
import TodayIcon from "@mui/icons-material/Today";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { Stack } from "@mui/material";
import { useMatch, useNavigate } from "react-router-dom";
import ContextStore from "../../utils/ContextStore";
import { acceptBookingRequest, completeBookingRequest, rejectBookingRequest } from "./services";
import ReviewDialog from "./ReviewDialog";


type BookingCardProps = {
    title: string;
    requestedOn: string;
    type: string;
    availability: string;
    location: string;
    originalPrice: number;
    priceMode: number;
    newPrice?: number;
    statusType: string;
    requestId: string;
    offerId: string;
    userEmail: string;
    hasReview : boolean;
    loadArray: () => void
};

const BookingCard: React.FC<BookingCardProps> = ({
    title,
    requestedOn,
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
    hasReview,
    loadArray
}) => {
    const store = useContext(ContextStore);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const CardMenu = () => (
        <>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => window.location.href = `mailto:${userEmail}`}>Chat</MenuItem>
            <MenuItem onClick={() => navigate(`/offer/${offerId}`)}>View Offer</MenuItem>
            <MenuItem onClick={() => navigate(`/profile`)}>View User</MenuItem>
          </Menu>
        </>
      );

      
    const cardActionRequested = () => {
        return (
            <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
            >
                {requestId !== store.context.user.id ? (
                    <>
                        <Button
                            size="small"
                            color="primary"
                            onClick={async () => {
                              await acceptBookingRequest(store, offerId, requestId)
                              loadArray()
                            }}
                        >
                            Accept
                        </Button>
                        <Button size="small" color="primary"
                        onClick={async () => {
                            await rejectBookingRequest(store, offerId, requestId)
                            loadArray()
                        }}
                        >
                            Reject
                        </Button>
                    </>
                    ) : (
                        <Button size="small" color="primary"
                        onClick={async () => {
                            await rejectBookingRequest(store, offerId, requestId) //// TODO: WITHDRAW -> REPLACE  
                            loadArray()
                        }}
                        >
                            Withdraw
                        </Button>
                    )
                }
                <IconButton
                    aria-label="settings"
                    onClick={handleClick}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <MoreVertIcon />
                </IconButton>
                <CardMenu/>
            </CardActions>
        );
    };

    const cardActionRejected = () => {
        return (
            <Typography color="error" sx={{ py: 1, px: 2 }}>
                Rejected
            </Typography>
        );
    };

    const cardActionAccepted = () => {
        return (
            <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
            >
                <Button size="small" color="primary" onClick={async () => {
                  await completeBookingRequest(store, offerId, requestId) //// -> CHANGE IT NEEDS TO HAVE CONFIRM SERVICE AND CONFIRM PAYMENT FROM BOTH SIDES (OWNER & REQUEST USER)
                  loadArray()
                }}>
                    {type == "seeking" ? "Confirm Service" : "Confirm Payment"}
                </Button>
                <IconButton
                    aria-label="settings"
                    onClick={handleClick}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <MoreVertIcon />
                </IconButton>
                <CardMenu/>
            </CardActions>
        );
    };

    const cardActionRating = () => {
        return (
            <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
            >
                <Button size="small" color="primary" onClick={() => setIsDialogOpen(true)}>
                    Give Review
                </Button>
                <IconButton
                    aria-label="settings"
                    onClick={handleClick}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <MoreVertIcon />
                </IconButton>
                <CardMenu/>
            </CardActions>
        );
    };

    const cardActionOffer = () => {
        return (
            <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
            >
                <IconButton
                    aria-label="settings"
                    onClick={handleClick}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <MoreVertIcon />
                </IconButton>
                <CardMenu/>
            </CardActions>
        );
    };

    const cardActionFinished = () => (
        hasReview? (
            <Typography color="success.dark" sx={{ py: 1, px: 2 }}>Completed</Typography>
        ) : cardActionRating()
    );

    const selectCardAction = () => {
        switch (statusType) {
            case "requested":
                return cardActionRequested();
            case "rejected":
                return cardActionRejected();
            case "accepted":
                return cardActionAccepted();
            case "completed":
                return cardActionFinished();
            case "offer":
                return cardActionOffer();
            default:
                return <></>;
        }
    };

    return (
        <Card
            sx={{ margin: "2em 0", backgroundColor: "inherit", border: "none" }}
        >
            <CardHeader
                action={selectCardAction()}
                title={title}
                subheader={`Requested on: ${requestedOn}`}
            />

            <CardActionArea sx={{ display: "flex" }}>
                <CardMedia
                    sx={{ flexBasis: "30%" }}
                    component="img"
                    height="100"
                    image={testImg}
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
                        {availability}
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
                        {newPrice && priceMode == 2 && (
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

            <ReviewDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
        </Card>
    );
};

export default BookingCard;
