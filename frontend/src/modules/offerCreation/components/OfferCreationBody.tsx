import ImageUploader from './ImageUploader';
import { Box, Divider, Stack} from "@mui/material";
import OfferForm from './OfferForm';
import CategorySelector from './CategorySelector';
import TaskDescriptionSection from './TaskDescriptionSection';
import ActiveButton from '../../shared/components/ActiveClickButton';
import TimeSelection from './TimeSelection';
import { useContext, useEffect, useState } from 'react';
import { createOffer, getOfferCreationTemplate, uploadOfferImage } from '../services';
import ContextStore from '../../../utils/ContextStore';
import { OfferRequestBody, OfferTemplateResponse } from '../Types';
import { useNavigate } from 'react-router-dom';
import AlertToast from '../../shared/components/AlertToast';

const OfferCreationBody = () => {
    const nav = useNavigate()
    const [openAlert, setOpenAlert] = useState({
        open: false,
        message: ""
    });

    const store = useContext(ContextStore)
    const [image, setImage] = useState<File | null>()
    const [formData, setFormData] = useState<OfferRequestBody>({
        title: "",
        description: "",
        location: "",
        priceModeId: 1,
        price: 0,
        typeId: 1,
        categoryIds: new Array<number>(),
        startTime: 0,
        endTime: 0,
        availability: true,
    })

    const [formError, setFormError] = useState({
        titleError: false,
        locationError: false,
        descriptionError: false,
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
        <Box sx={
            {
                width : "90%",
                padding: {xs: "2em 2em 3em", smd: "2em 5em 3em"}
            }}> 
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{
                    justifyContent: "space-between",
                    alignItems: {xs: 'strech', md: "center"},
                    my: 1,
                    gap: "5em"
                }}useFlexGap
               >
                <ImageUploader setFile={setImage}/>
                <OfferForm initialValues={{template}} formData={formData} setFormData={setFormData} setError={formError}/>
            </Stack>

            <Divider/>
            <TimeSelection setTime = {setTime} />
            <Divider/>
            <CategorySelector initialValues={{template}} addCategory = {addCategory} removeCategory = {removeCategory} categoryIds={formData.categoryIds}/>
            <Divider/>
            <TaskDescriptionSection maxWordsCount={150} value={formData.description} setValue={setDescription} hasError={formError.descriptionError}/>

            <Box sx={{display: "flex", justifyContent: "center", mb: 4}}>
                <ActiveButton style={{marginTop: "1em"}} buttonTxt="Create Offer" type='submit' onClick={async() => {


                    setFormError(prevError => ({
                        ...prevError,
                        titleError: formData.title.length <= 5,
                        locationError: formData.location == "",
                        descriptionError: formData.description.length <= 10,
                    }));

                    if(!image){
                        setOpenAlert({...openAlert, open:true, message:"Image is missing"});
                        return
                    }

                    if(Object.values(formError).includes(true)){
                        setOpenAlert({...openAlert, open: true, message:"Form is not fully filled out"})
                        return
                    }
                    
                    const response = await createOffer(formData, store)
                    if("status" in response){
                        setOpenAlert({...openAlert, open: true, message: response.popupMessage})
                        return
                    }

                    const imageFormData = new FormData()
                    imageFormData.append("image", image, image.name)
                    const imageResponse = await uploadOfferImage(imageFormData, store, response.id)
                    
                    if("status" in imageResponse){
                        setOpenAlert({...openAlert, open: true, message:imageResponse.popupMessage})
                        return
                    }
                    nav("/offer")
                }}/>
            </Box>

            <AlertToast text={openAlert.message} open={openAlert.open} severity='error' handleClose={() => {
                setOpenAlert({...openAlert, open:false});
            }}/>
        </Box>
    )
  };

export default OfferCreationBody;