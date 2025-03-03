module.exports = (entityId) => {
    return {
      en: {
        user: {
            invalidCredentials: "INVALID CREDENTIALS ERROR MESSAGE - EN",
            alreadyExists: "ALREADY EXISTS ERROR MESSAGE - EN",
            notFound: "NOT FOUND ERROR MESSAGE - EN"

        },
        general: {
            missingHeader: "MISSING HEADER ERROR MESSAGE - EN",
            invalidToken: "INVALID TOKEN ERROR MESSAGE - EN",
            invalidUser: "INVALID USER ERROR MESSAGE - EN",
            noPermission: "USER HAS NO PERMISSION MESSAGE - EN",
            system: "SYSTEM GENERATED UNKNOWN ERROR - EN",
            formError: "ERROR GENERATED RELATED TO FORM - EN",
            unsupportedParameters: "UNSUPPORTED PARAMETERS IN REQUEST BODY - EN"
        }
      },
      de: {
        user: {
            invalidCredentials: "INVALID CREDENTIALS ERROR MESSAGE - BN",
            alreadyExists: "ALREADY EXISTS ERROR MESSAGE - BN",
            notFound: "NOT FOUND ERROR MESSAGE - BN"

        },
        general: {
            missingHeader: "MISSING HEADER ERROR MESSAGE - BN",
            invalidToken: "INVALID TOKEN ERROR MESSAGE - BN",
            invalidUser: "INVALID USER ERROR MESSAGE - BN",
            noPermission: "USER HAS NO PERMISSION MESSAGE - BN",
            system: "SYSTEM GENERATED UNKNOWN ERROR - BN",
            formError: "ERROR GENERATED RELATED TO FORM - BN",
            unsupportedParameters: "UNSUPPORTED PARAMETERS IN REQUEST BODY - BN"
        }
      }
    }
}