const PriceModeEnum = {
    FIXED: {
        displayValue: "fixed",
        id: 1
    },
    NEGOTIATION:  {
        displayValue: "negotiation",
        id: 2
    },
    getAsArray: () => {
        const ara = []
        ara.push(PriceModeEnum.FIXED, PriceModeEnum.NEGOTIATION)
        return ara
    },
    getFromId: (id) => {
        switch(id){
            case 1:
                return PriceModeEnum.FIXED
            case 2:
                return PriceModeEnum.NEGOTIATION
            default:
                return null
        }
    }
}

const OfferTypeEnum = {
    OFFERING: {
        displayValue: "offering",
        id: 1
    },
    SEEKING: {
        displayValue: "seeking",
        id: 2
    },
    getAsArray: () => {
        const ara = []
        ara.push(OfferTypeEnum.OFFERING, OfferTypeEnum.SEEKING)
        return ara
    },
    getFromId: (id) => {
        switch(id){
            case 1:
                return OfferTypeEnum.OFFERING
            case 2:
                return OfferTypeEnum.SEEKING
            default:
                return null
        }
    }
}

const OfferCategoryEnum = {
    CATEGORY_1:
    {
        displayValue: "category1",
        id: 1,
        subCategory: {
            SUB_1: {
                displayValue: "C_1_SUB_1",
                id: 1
            },
            SUB_2: {
                displayValue: "C_1_SUB_2",
                id: 2
            },
            getAsArray: () => {
                const ara = []
                ara.push(OfferCategoryEnum.CATEGORY_1.subCategory.SUB_1, OfferCategoryEnum.CATEGORY_1.subCategory.SUB_2)
                return ara
            },
            getFromId: (id) => {
                switch(id){
                    case 1:
                        return OfferCategoryEnum.CATEGORY_1.subCategory.SUB_1
                    case 2:
                        return OfferCategoryEnum.CATEGORY_1.subCategory.SUB_2
                    default:
                        return null
                }
            }
        }
    },
    CATEGORY_2:
    {
        displayValue: "category2",
        id: 2,
        subCategory: {
            SUB_1: {
                displayValue: "C_2_SUB_1",
                id: 1
            },
            SUB_2: {
                displayValue: "C_2_SUB_2",
                id: 2
            },
            getAsArray: () => {
                const ara = []
                ara.push(OfferCategoryEnum.CATEGORY_2.subCategory.SUB_1, OfferCategoryEnum.CATEGORY_2.subCategory.SUB_2)
                return ara
            },
            getFromId: (id) => {
                switch(id){
                    case 1:
                        return OfferCategoryEnum.CATEGORY_2.subCategory.SUB_1
                    case 2:
                        return OfferCategoryEnum.CATEGORY_2.subCategory.SUB_2
                    default:
                        return null
                }
            }
        }
    },
    getAsArray: () => {
        const ara = []
        const category1 = {id: OfferCategoryEnum.CATEGORY_1.id, displayValue: OfferCategoryEnum.CATEGORY_1.displayValue, subCategories: OfferCategoryEnum.CATEGORY_1.subCategory.getAsArray()}
        ara.push(category1)
        const category2 = {id: OfferCategoryEnum.CATEGORY_2.id, displayValue: OfferCategoryEnum.CATEGORY_2.displayValue, subCategories: OfferCategoryEnum.CATEGORY_2.subCategory.getAsArray()}
        ara.push(category2)
        return ara
    },
    getFromId: (categoryId, subcategoryId) => {
        let category = {}
        switch(categoryId){
            case 1:
                category = {...OfferCategoryEnum.CATEGORY_1, subCategory: OfferCategoryEnum.CATEGORY_1.subCategory.getFromId(subcategoryId)}
                break
            case 2:
                category = {...OfferCategoryEnum.CATEGORY_2, subCategory: OfferCategoryEnum.CATEGORY_2.subCategory.getFromId(subcategoryId)}
                break
            default:
                category = null
        }
        return category
    }
}

module.exports = {PriceModeEnum, OfferTypeEnum, OfferCategoryEnum}