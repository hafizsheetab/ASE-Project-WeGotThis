const PriceModeEnum = {
    FIXED: {
        displayValue: "fixed",
        id: 1,
    },
    NEGOTIATION: {
        displayValue: "negotiation",
        id: 2,
    },
    getAsArray: () => {
        const ara = [];
        ara.push(PriceModeEnum.FIXED, PriceModeEnum.NEGOTIATION);
        return ara;
    },
    getFromId: (id) => {
        switch (id) {
            case 1:
                return PriceModeEnum.FIXED;
            case 2:
                return PriceModeEnum.NEGOTIATION;
            default:
                return null;
        }
    },
};

const OfferTypeEnum = {
    OFFERING: {
        displayValue: "offering",
        id: 1,
    },
    SEEKING: {
        displayValue: "seeking",
        id: 2,
    },
    getAsArray: () => {
        const ara = [];
        ara.push(OfferTypeEnum.OFFERING, OfferTypeEnum.SEEKING);
        return ara;
    },
    getFromId: (id) => {
        switch (id) {
            case 1:
                return OfferTypeEnum.OFFERING;
            case 2:
                return OfferTypeEnum.SEEKING;
            default:
                return null;
        }
    },
};

const OfferCategoryEnum = {
    DOG: {
        displayValue: "Dog",
        id: 1,
    },
    WALKING: {
        displayValue: "Walking",
        id: 2,
    },
    CLEANING: {
        displayValue: "Cleaning",
        id: 3,
    },
    SHOPPING: {
        displayValue: "Shopping",
        id: 4,
    },
    DEVELOPMENT: {
        displayValue: "Development",
        id: 5,
    },
    getAsArray: () => {
        const ara = [];
        ara.push(
            OfferCategoryEnum.DOG,
            OfferCategoryEnum.WALKING,
            OfferCategoryEnum.CLEANING,
            OfferCategoryEnum.SHOPPING,
            OfferCategoryEnum.DEVELOPMENT
        );
        return ara;
    },
    getFromId: (id) => {
        switch (id) {
            case 1:
                return OfferCategoryEnum.DOG;
            case 2:
                return OfferCategoryEnum.WALKING;
            case 3:
                return OfferCategoryEnum.CLEANING;
            case 4:
                return OfferCategoryEnum.SHOPPING;
            case 5:
                return OfferCategoryEnum.DEVELOPMENT;

            default:
                return null;
        }
    },
};

const OfferStatusEnum = {
    REQUESTED: {
        displayValue: "requested",
        id: 1,
    },
    REJECTED: {
        displayValue: "rejected",
        id: 2,
    },
    ACCEPTED: {
        displayValue: "accepted",
        id: 3,
    },
    COMPLETED: {
        displayValue: "completed",
        id: 4,
    },
    getAsArray: () => {
        const ara = [];
        ara.push(
            OfferStatusEnum.REQUESTED,
            OfferStatusEnum.REJECTED,
            OfferStatusEnum.ACCEPTED,
            OfferStatusEnum.COMPLETED
        );
        return ara;
    },
    getFromId: (id) => { 
        switch (id) {
            case 1:
                return OfferStatusEnum.REQUESTED;
            case 2:
                return OfferStatusEnum.REJECTED;
            case 3:
                return OfferStatusEnum.ACCEPTED;
            case 4:
                return OfferStatusEnum.COMPLETED;
            default:
                return null;
        }
    }
}

module.exports = { PriceModeEnum, OfferTypeEnum, OfferCategoryEnum, OfferStatusEnum };
