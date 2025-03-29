import ImageUploader from './ImageUploader';
import styles from './OfferCreation.module.css'
import {Box, Divider} from "@mui/material";
import OfferForm from './OfferForm';
import CategorySelector from './CategorySelector';
import TaskDescriptionSection from './TaskDescriptionSection';
import ActiveButton from '../../shared/components/ActiveClickButton';
import TimeSelection from './TimeSelection';
import { useContext, useEffect, useState } from 'react';
import { getOfferCreationTemplate } from '../services';
import ContextStore from '../../../utils/ContextStore';
import { OfferTemplateResponse } from '../Types';

const OfferCreationBody = () => {
    const store = useContext(ContextStore)
    const [template, setTemplate] = useState<OfferTemplateResponse>({
        priceModes: [],
        offerCategories: [],
        offerTypes: []
    })
    useEffect(() => {
        (async () => {
            const response  = await getOfferCreationTemplate(store)
            if("status" in response){
                return
            }
            setTemplate(response)
        })()
    },[])
    return (
        <section>
            <div className={styles.offerCreationWrapper}>
                <ImageUploader/>
                <OfferForm initialValues={{template}}/>
            </div>

            <Divider/>
            <TimeSelection/>
            <Divider/>
            <CategorySelector initialValues={{template}}/>
            <Divider/>
            <TaskDescriptionSection/>

            <Box sx={{display: "flex", justifyContent: "center", mb: 4}}>
                <ActiveButton buttonTxt="Create Offer"/>
            </Box>
        </section>
    )
  };

export default OfferCreationBody;