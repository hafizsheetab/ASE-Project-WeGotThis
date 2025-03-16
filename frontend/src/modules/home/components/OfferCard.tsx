import React from "react";
import styles from "./Home.module.css";

interface OfferCardProps {
  title: string;
  description: string;
  category: string;
  availability: string;
  price: string;
  imageUrl: string;
}

const OfferCard: React.FC<OfferCardProps> = ({
  title,
  description,
  category,
  availability,
  imageUrl,
}) => {
  return (
    <div className={styles.offerCard}>
      <img src={imageUrl} alt={title} className={styles.offerImage} />
      <div className={styles.offerContent}>
        <h3 className={styles.offerTitle}>{title}</h3>
        <span className={styles.offerCategory}>{category}</span>
        <span className={styles.offerAvailability}>{availability}</span>
        <p className={styles.offerDescription}>{description}</p>
        <button className={styles.offerButton}>View Offer</button>
      </div>
    </div>
  );
};

export default OfferCard;
