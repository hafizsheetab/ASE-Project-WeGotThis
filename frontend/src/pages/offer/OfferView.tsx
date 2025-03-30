import OfferViewBody from "../../modules/offerView/OfferViewBody.tsx";

const OfferView = () => {
    return (
        <div style={{minHeight: "100vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
            <OfferViewBody/>
        </div>
    )
};

export default OfferView;