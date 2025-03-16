"use client";
import ActiveClickButton from "../../modules/offerCreation/components/ActiveClickButton";
import CategorySelector from "../../modules/offerCreation/components/CategorySelector";
import DescriptionField from "../../modules/offerCreation/components/DescriptionField";
import Divider from "../../modules/offerCreation/components/Divider";
import ImageUploader from "../../modules/offerCreation/components/ImageUploader";
import OfferForm from "../../modules/offerCreation/components/OfferForm";
import styles from './OfferCreation.module.css'

const OfferCreation = () => {
    return (
        <section>
            <div className={styles.flexHorizontal}>
                <ImageUploader/>
                <OfferForm/>
            </div>  
            <Divider/>
            <CategorySelector/>
            <Divider/>
            <DescriptionField placeholder="Describe your task"/>

            <ActiveClickButton buttonTxt="Create Offer"/>
        </section>
    )
  };
  
  export default OfferCreation;
  