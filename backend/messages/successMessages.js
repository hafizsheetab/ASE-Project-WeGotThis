

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
          getSelf: `SUCCESS MESSAGE OF GETTING SELF USER - EN WITH ENTITY ID ${entityId}` 
        },
      },
      de: {
        auth: {
          login: "SUCCESS MESSAGE OF USER LOGIN SERVICE - DE",
          register: "SUCCESS MESSAGE OF USER REGISTER SERVICE - DE"
        },
        user: {
          getSelf: `SUCCESS MESSAGE OF GETTING SELF USER - DE WITH ENTITY ID ${entityId}` 
        }
      }
    }
}