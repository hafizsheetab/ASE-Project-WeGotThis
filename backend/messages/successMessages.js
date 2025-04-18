

module.exports = (entityId) => {
    return {
      en: {
        auth: {
          login: "SUCCESS MESSAGE OF USER LOGIN SERVICE - EN",
          register: "SUCCESS MESSAGE OF USER REGISTER SERVICE - EN" ,
          forgotPassword:'SUCCESS MESSAGE OF FORGOT PASSWORD SERVICE - EN',
          resetPassword: "SUCCESS MESSAGE OF RESET PASSWORD SERVICE - EN"
        },
        user: {
          getSelf: `SUCCESS MESSAGE OF GETTING SELF USER - EN WITH ENTITY ID ${entityId}`,
          changeSelf: `SUCCESS MESSAGE OF CHANGING SELF USER WITH ENTITY ID ${entityId} - EN`,
          changePic: `SUCCESS MESSAGE OF CHANGING SELF PIC WITH ENTITY ID ${entityId} - EN`
        },
        offer:{
            createOffer: "SUCCESS MESSAGE OF CREATING OFFER SERVICE - EN",
            editOffer:"SUCCESS MESSAGE OF EDITING OFFER SERVICE - EN",
            getOffers: "SUCCESS MESSAGE OF GETTING OFFERS SERVICE - EN",
            getOffer: "SUCCESS MESSAGE OF GETTING OFFER SERVICE - EN",
            deleteOffer: "SUCCESS MESSAGE OF DELETING OFFER SERVICE - EN"
        }
      },
      de: {
        auth: {
          login: "SUCCESS MESSAGE OF USER LOGIN SERVICE - DE",
          register: "SUCCESS MESSAGE OF USER REGISTER SERVICE - DE"
        },
        user: {
          getSelf: `SUCCESS MESSAGE OF GETTING SELF USER - DE WITH ENTITY ID ${entityId}`,
          changeSelf: `SUCCESS MESSAGE OF CHANGING SELF USER WITH ENTITY ID ${entityId} - DE`,
          changePic: `SUCCESS MESSAGE OF CHANGING SELF PIC WITH ENTITY ID ${entityId} - DE` 
        },
        offer:{
            createOffer: "SUCCESS MESSAGE OF CREATING OFFER SERVICE - DE",
            editOffer:"SUCCESS MESSAGE OF EDITING OFFER SERVICE - DE",
            getOffer: "SUCCESS MESSAGE OF GETTING OFFER SERVICE - DE",
            getOffers: "SUCCESS MESSAGE OF GETTING OFFERS SERVICE - DE",
            deleteOffer: "SUCCESS MESSAGE OF DELETING OFFER SERVICE- DE"
        }
      }
    }
}