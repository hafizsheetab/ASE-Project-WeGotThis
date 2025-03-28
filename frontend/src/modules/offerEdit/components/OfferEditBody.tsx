import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Divider, Box, CircularProgress} from "@mui/material";
import OfferForm from "../../offerCreation/components/OfferForm";
import TimeSelection from "../../offerCreation/components/TimeSelection";
import CategorySelector from "../../offerCreation/components/CategorySelector";
import TaskDescriptionSection from "../../offerCreation/components/TaskDescriptionSection";
import ActiveButton from "../../shared/components/ActiveClickButton";
import ImageUploader from "../../offerCreation/components/ImageUploader";
import {Offer} from "../../shared/Types/Offer";
import dayjs from "dayjs";
import styles from "../../offerCreation/components/OfferCreation.module.css";

const OfferEditBody = () => {
    const {offerId} = useParams();
    const [loading, setLoading] = useState(true);
    const [offerData, setOfferData] = useState<Offer>();

    useEffect(() => {
        setTimeout(() => {
            setOfferData({
                radioValue: "Service Provider/Volunteer",
                title: "Walking Cute Dog",
                location: "Zurich",
                price: "351",
                priceType: "Fixed",
                startTime: dayjs('2069-04-17T15:30').toDate(),
                description: "Lorem Ipsum dolor sit amet",
                image: "https://picsum.photos/150",
            });
            setLoading(false);
        }, 500);
    }, [offerId]);

    const handleUpdate = () => {
        console.log("Saving update...", offerData);
        // TODO: Submit the updated offer data
    };

    if (loading) return <CircularProgress/>;

    return (
        <section>
            <div className={styles.offerCreationWrapper}>
                <ImageUploader initialImage={offerData?.image}/>
                <OfferForm initialValues={offerData}/>
            </div>
            <Divider/>
            <TimeSelection initialValues={offerData}/>
            <Divider/>
            <CategorySelector initialValues={offerData}/>
            <Divider/>
            <TaskDescriptionSection initialValues={offerData}/>
            <Box sx={{display: "flex", justifyContent: "center", mb: 4}}>
                <ActiveButton buttonTxt="Save Changes" onClick={handleUpdate}/>
            </Box>
        </section>
    );
};

export default OfferEditBody;