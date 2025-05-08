import React from "react";
import {
  CardActions,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardMenu from "./BookingCardMenu";
import { acceptBookingRequest, completeBookingRequest, rejectBookingRequest, withdrawBookingRequest } from "../services";
import { getSelf } from "../../account/services";
import { ContextData, ContextStoreData, OpenAlert } from "../../shared/Types";

interface Props {
    statusType: string;
    store: ContextStoreData<ContextData>;
    offerId: string;
    requestId: string;
    userEmail: string;
    madeByMe: boolean;
    type: string;
    anchorEl: HTMLElement | null;
    open: boolean;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleClose: () => void;
    loadArray: () => void;
    setOpenAlert: (val: OpenAlert) => void;
    request: {
        user: { id: string | number };
        requestOwnerComplete?: boolean;
        offer: { owner: { id: string | number } };
        offerOwnerComplete?: boolean;
        requestOwnerReview?: boolean;
        offerOwnerReview?: boolean;
    };
    hasReview: boolean;
    setIsDialogOpen: (val: boolean) => void;
    offerOwnerId: string | number;
}

const CardActionsSection: React.FC<Props> = ({
    statusType,
    store,
    offerId,
    requestId,
    userEmail,
    madeByMe,
    type,
    anchorEl,
    open,
    handleClick,
    handleClose,
    loadArray,
    setOpenAlert,
    request,
    hasReview,
    setIsDialogOpen,
    offerOwnerId
}) => {
    const cardMenu = (
        <CardMenu
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
            offerId={offerId}
            userEmail={userEmail}
            madeByMe={madeByMe}
            offerOwnerId={offerOwnerId}
        />
    );

    const cardActionRequested = () => (
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
            {madeByMe ? (
                <>
                    <Button
                        size="small"
                        color="primary"
                        onClick={async () => {
                        const response = await acceptBookingRequest(store, offerId, requestId);
                        if ("status" in response) {
                            setOpenAlert({ open: true, message: response.popupMessage, severity: "error" });
                            return;
                        }
                        loadArray();
                        }}
                    >
                        Accept
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={async () => {
                        const response = await rejectBookingRequest(store, offerId, requestId);

                        if ("status" in response) {
                            setOpenAlert({ open: true, message: response.popupMessage, severity: "error" });
                            return;
                        }

                        loadArray();
                        }}
                    >
                        Reject
                    </Button>
                </>
            ) : (
                <Button
                    size="small"
                    color="primary"
                    onClick={async () => {
                        const response = await withdrawBookingRequest(store, offerId, requestId); // TODO: replace with withdraw
                        if ("status" in response) {
                            setOpenAlert({ open: true, message: response.popupMessage, severity: "error" });
                            return;
                        }
                        loadArray();
                    }}
                    >
                    Withdraw
                </Button>
            )}
            <IconButton aria-label="settings" onClick={handleClick} aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
                <MoreVertIcon />
            </IconButton>
            {cardMenu}
        </CardActions>
    );

    const cardActionRejected = () => (
        <Typography color="error" sx={{ py: 1, px: 2 }}>
            Rejected
        </Typography>
    );

    const onClickComplete = async () => {
        const response = await completeBookingRequest(store, offerId, requestId);
        if ("status" in response) {
            setOpenAlert({ open: true, message: response.popupMessage, severity: "error" });
            return;
        }

        const userResponse = await getSelf(store, store.context.token);
        if (!("status" in userResponse)) {
            store.setContext({ ...store.context, user: userResponse });
            loadArray();
        } else {
            setOpenAlert({ open: true, message: userResponse.popupMessage, severity: "error" });
            return;
        }
    };

    const cardActionAccepted = () => (
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
            {request.user.id === store.context.user.id && !request.requestOwnerComplete && (
                <Button size="small" color="primary" onClick={onClickComplete}>
                {type === "seeking" ? "Confirm Service" : "Confirm Payment"}
                </Button>
            )}

            {request.offer.owner.id === store.context.user.id && !request.offerOwnerComplete && (
                <Button size="small" color="primary" onClick={onClickComplete}>
                {type === "seeking" ? "Confirm Payment" : "Confirm Service"}
                </Button>
            )}

            <IconButton aria-label="settings" onClick={handleClick} aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
                <MoreVertIcon />
            </IconButton>
            {cardMenu}
        </CardActions>
    );

    const cardActionRating = () => (
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
            {store.context.user.id === request.user.id && !request.requestOwnerReview && (
                <Button size="small" color="primary" onClick={() => setIsDialogOpen(true)}>
                Give Review
                </Button>
            )}
            {store.context.user.id === request.offer.owner.id && !request.offerOwnerReview && (
                <Button size="small" color="primary" onClick={() => setIsDialogOpen(true)}>
                Give Review
                </Button>
            )}
            <IconButton aria-label="settings" onClick={handleClick} aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
                <MoreVertIcon />
            </IconButton>
            {cardMenu}
        </CardActions>
    );

    const cardActionOffer = () => (
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton aria-label="settings" onClick={handleClick} aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
                <MoreVertIcon />
            </IconButton>
            {cardMenu}
        </CardActions>
    );

    const cardActionFinished = () =>
        hasReview ? (
        <Typography color="success.dark" sx={{ py: 1, px: 2 }}>
            Completed
        </Typography>
        ) : (
        cardActionRating()
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

    return <>{selectCardAction()}</>;
    };

export default CardActionsSection;
