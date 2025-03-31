import ImageUploader from './ImageUploader';
import styles from './OfferCreation.module.css'
import {Box, Divider} from "@mui/material";
import OfferForm from './OfferForm';
import CategorySelector from './CategorySelector';
import TaskDescriptionSection from './TaskDescriptionSection';
import ActiveButton from '../../shared/components/ActiveClickButton';
import TimeSelection from './TimeSelection';
import { useContext, useEffect, useState } from 'react';
import { createOffer, getOfferCreationTemplate, uploadOfferImage } from '../services';
import ContextStore from '../../../utils/ContextStore';
import { OfferRequestBody, OfferTemplateResponse } from '../Types';
import { showAlert } from '../../shared/services';
import { useNavigate } from 'react-router-dom';

const OfferCreationBody = () => {
    const nav = useNavigate()
    const store = useContext(ContextStore)
    const [image, setImage] = useState<File | null>()
    const [formData, setFormData] = useState<OfferRequestBody>({
        title: "",
        description: "",
        location: "",
        priceModeId: 0,
        price: 0,
        typeId: 0,
        categoryIds: new Array<number>(),
        startTime: 0,
        endTime: 0,
        availability: true,

    })
    const setTime = (startTime: number, endTime: number) => {
        setFormData({...formData, startTime, endTime})
    }
    const addCategory = (ids: number[]) => {
        const categoryIds = structuredClone(formData.categoryIds)
        categoryIds.push(...ids)
        setFormData({...formData, categoryIds})
    }
    const removeCategory = (id: number) => {
        const categoryIds = structuredClone(formData.categoryIds)
        setFormData({...formData, categoryIds: categoryIds.filter(vId => vId !== id)})
    }
    const setDescription = (value: string) => {
        setFormData({...formData, description: value})
    }
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
                <ImageUploader setFile={setImage}/>
                <OfferForm initialValues={{template}} formData={formData} setFormData={setFormData}/>
            </div>

            <Divider/>
            <TimeSelection setTime = {setTime} />
            <Divider/>
            <CategorySelector initialValues={{template}} addCategory = {addCategory} removeCategory = {removeCategory} categoryIds={formData.categoryIds}/>
            <Divider/>
            <TaskDescriptionSection value={formData.description} setValue={setDescription}/>

            <Box sx={{display: "flex", justifyContent: "center", mb: 4}}>
                <ActiveButton buttonTxt="Create Offer" onClick={async() => {
                    if(!image){
                        showAlert("Please Select Image", "error")
                        return
                    }
                    console.log(formData)
                    const response = await createOffer(formData, store)
                    if("status" in response){
                        return
                    }
                    const imageFormData = new FormData()
                    imageFormData.append("image", image, image.name)
                    const imageResponse = await uploadOfferImage(imageFormData, store, response.id)
                    if("status" in imageResponse){
                        return
                    }
                    nav("/home")
                }}/>
            </Box>
        </section>
    )
  };

export default OfferCreationBody;