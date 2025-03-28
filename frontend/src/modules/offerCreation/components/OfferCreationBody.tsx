import ImageUploader from './ImageUploader';
import styles from './OfferCreation.module.css'
import {Box, Divider} from "@mui/material";
import OfferForm from './OfferForm';
import CategorySelector from './CategorySelector';
import TaskDescriptionSection from './TaskDescriptionSection';
import ActiveButton from '../../shared/components/ActiveClickButton';
import TimeSelection from './TimeSelection';

const OfferCreationBody = () => {
    return (
        <section>
            <div className={styles.offerCreationWrapper}>
                <ImageUploader/>
                <OfferForm/>
            </div>

            <Divider/>
            <TimeSelection/>
            <Divider/>
            <CategorySelector/>
            <Divider/>
            <TaskDescriptionSection/>

            <Box sx={{display: "flex", justifyContent: "center", mb: 4}}>
                <ActiveButton buttonTxt="Create Offer"/>
            </Box>
        </section>
    )
  };

export default OfferCreationBody;