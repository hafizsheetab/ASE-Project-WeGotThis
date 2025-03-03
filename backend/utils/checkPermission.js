const OtherBankRecipient = require("../controller/recipient/Model/OtherBankRecipient");
const KoriRecipient = require("../controller/recipient/Model/KoriRecipient");
const MfsRecipient = require("../controller/recipient/Model/MfsRecipient");
const Nominee = require("../controller/nominee/Model/Nominee");
const EntityNames = require("../middleware/EntityNames");
const Product = require("../Model/Product");

const checkPermission = async (entityName, entityId, userId) => {
    try {
        let entity;
        // if (entityName === EntityNames.otherBankRecipient) {
        //     entity = OtherBankRecipient;
        // }else if(entityName === EntityNames.koriRecipient){
        //     entity = KoriRecipient;
        // }else if(entityName === EntityNames.mfsRecipient){
        //     entity = MfsRecipient;
        // }else if(entityName === EntityNames.nominee){
        //     entity = Nominee;
        // }else if(entityName == EntityNames.casa){
        //     entity = Product
        // }
        // let document = await entity.findById(entityId);
        // if (!document) {
        //     return false;
        // }
        // if(document.user.toString() === String(userId)){
        //     return true
        // }
        return true
    } catch (err) {
        console.log(err);
        return false
    }
};

module.exports = checkPermission
