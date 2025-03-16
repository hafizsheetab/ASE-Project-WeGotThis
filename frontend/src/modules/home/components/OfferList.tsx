import OfferCard from "./OfferCard";
import styles from "./Home.module.css";

const mockOffers = [
  {
    title: "Walking Cute Dog",
    description:
      "I need to find a reliable volunteer that can help me walk my dog. I will pay in tips. The dog is very sweet, loves people etc.",
    category: "Service Seeking",
    availability: "Mar 20th, 2025, 11h",
    price: "$0",
    imageUrl: "https://picsum.photos/100",
  },
  {
    title: "Walking Cute Dog",
    description:
      "I need to find a reliable volunteer that can help me walk my dog. I will pay in tips. The dog is very sweet, loves people etc.",
    category: "Service Seeking",
    availability: "Mar 20th, 2025, 11h",
    price: "$0",
    imageUrl: "https://picsum.photos/120",
  },
  {
    title: "Walking Cute Dog",
    description:
      "I need to find a reliable volunteer that can help me walk my dog. I will pay in tips. The dog is very sweet, loves people etc.",
    category: "Service Seeking",
    availability: "Mar 20th, 2025, 11h",
    price: "$0",
    imageUrl: "https://picsum.photos/150",
  },
];

const OfferList = () => {
  return (
    <div className={styles.offerList}>
      {mockOffers.map((offer, index) => (
        <OfferCard
          key={index}
          title={offer.title}
          description={offer.description}
          category={offer.category}
          availability={offer.availability}
          price={offer.price}
          imageUrl={offer.imageUrl}
        />
      ))}
    </div>
  );
};

export default OfferList;