import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Divider, Box, CircularProgress, Stack, Typography} from "@mui/material";
import OfferForm from "../../offerCreation/components/OfferForm";
import TimeSelection from "../../offerCreation/components/TimeSelection";
import CategorySelector from "../../offerCreation/components/CategorySelector";
import TaskDescriptionSection from "../../offerCreation/components/TaskDescriptionSection";
import ActiveButton from "../../shared/components/ActiveClickButton";
import ImageUploader from "../../offerCreation/components/ImageUploader";
import { getOneOffer } from "../../home/services";
import ContextStore from "../../../utils/ContextStore";
import { OfferRequestBody, OfferTemplateResponse } from "../../offerCreation/Types";
import AlertToast from "../../shared/components/AlertToast";
import { getOfferCreationTemplate } from "../../offerCreation/services";

const OfferEditBody = () => {
    const {offerId} = useParams();
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>();
    const [openAlert, setOpenAlert] = useState({
        open: false,
        message: ""
    });
    const store = useContext(ContextStore);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<OfferRequestBody>({
        title: "",
        description: "",
        location: "",
        priceModeId: 0,
        price: 0,
        typeId: 0,
        categoryIds: [],
        startTime: 0,
        endTime: 0,
        availability: true,
    });

    const [template, setTemplate] = useState<OfferTemplateResponse>({
            priceModes: [],
            offerCategories: [],
            offerTypes: []
    })

    const [formError, setFormError] = useState({
        titleError: false,
        locationError: false,
        descriptionError: false,
    });

    useEffect(() => {
        (async () => {
            if (!offerId) {
                setLoadError("No Offer ID provided");
                setLoading(false);
                return;
            }

            const offer = await getOneOffer(offerId, store);
            if ("status" in offer) return;

            setFormData({
                title: offer.title,
                description: offer.description,
                location: offer.location,
                priceModeId: offer.priceMode.id,
                price: offer.price,
                typeId: offer.type.id,
                categoryIds: offer.categories.map(cat => cat.id),
                startTime: offer.startTime,
                endTime: offer.endTime,
                availability: offer.availability
            });

            setImage(null); // reset image; optionally preload from offer.image
            setLoading(false);

            const response  = await getOfferCreationTemplate(store)
            if("status" in response){
                return
            }
            console.log(response)
            setTemplate(response)
        })();
    }, [offerId]);

    const setTime = (startTime: number, endTime: number) => {
        setFormData({...formData, startTime, endTime});
    };

    const addCategory = (ids: number[]) => {
        const categoryIds = structuredClone(formData.categoryIds);
        categoryIds.push(...ids);
        setFormData({...formData, categoryIds});
    };

    const removeCategory = (id: number) => {
        const categoryIds = formData.categoryIds.filter(catId => catId !== id);
        setFormData({...formData, categoryIds});
    };

    const setDescription = (value: string) => {
        setFormData({...formData, description: value});
    };

    const handleUpdate = async () => {
        setFormError({
            titleError: formData.title.length <= 7,
            locationError: formData.location === "",
            descriptionError: formData.description.length <= 0,
        });

        if (!image) {
            setOpenAlert({...openAlert, open: true, message: "Image is missing"});
            return;
        }

        if (Object.values(formError).includes(true)) {
            setOpenAlert({...openAlert, open: true, message: "Form is not fully filled out"});
            return;
        }

        console.log("Saving update...", formData);
        //const response = await updateOffer(offerId, formData, store); //TODO UPDATE
        // if ("status" in response) {
        //     console.log("Update failed", response);
        //     return;
        // }

        // if (image) {
        //     const imageFormData = new FormData();
        //     imageFormData.append("image", image, image.name);
        //     const imageResponse = await uploadOfferImage(imageFormData, store, response.id);
        //     if ("status" in imageResponse) {
        //         return;
        //     }
        // }

        navigate("/home");
    };

    if (loading) return <CircularProgress/>;
    if (loadError) return <Typography color="error">{loadError}</Typography>;


    return (
        <Box sx={{width: "90%", padding: "2em 5em 3em"}}>
            <Stack direction="row" spacing={2} sx={{
                justifyContent: "space-between",
                alignItems: "center",
                my: 1,
                gap: "5em"
            }} useFlexGap>
                <ImageUploader initialImage={ image ? URL.createObjectURL(image) : undefined} setFile={setImage}/>
                <OfferForm initialValues={{
                    title: formData.title,
                    radioValue: String(formData.typeId),
                    location: formData.location,
                    price: formData.price.toString(),
                    priceType: template.priceModes.find(pm => pm.id === formData.priceModeId)?.displayValue || "",
                    template}} formData={formData} setFormData={setFormData} setError={formError}/>
            </Stack>

            <Divider/>
            <TimeSelection 
                initialValues={{
                    startTime: new Date(formData.startTime),
                    endTime: new Date(formData.endTime),
                }}
                setTime={setTime}
            />
            <Divider/>
            <CategorySelector initialValues={{template}} categoryIds={formData.categoryIds} addCategory={addCategory} removeCategory={removeCategory}/>
            <Divider/>
            <TaskDescriptionSection maxWordsCount={150} value={formData.description} setValue={setDescription} hasError={formError.descriptionError}/>
            
            <Box sx={{display: "flex", justifyContent: "center", mb: 4}}>
                <ActiveButton style={{width: "20%"}} buttonTxt="Save Changes" type='submit' onClick={handleUpdate}/>
            </Box>

            <AlertToast text={openAlert.message} open={openAlert.open} severity='error' handleClose={() => {
                setOpenAlert({...openAlert, open: false});
            }}/>
        </Box>
    );
};

export default OfferEditBody