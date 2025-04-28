module.exports = (entityId) => {
    return {
      en: {
        auth: {
            invalidCredentials: "INVALID CREDENTIALS ERROR MESSAGE - EN",
            alreadyExists: "ALREADY EXISTS ERROR MESSAGE - EN",
            notFound: "NOT FOUND ERROR MESSAGE - EN"

        },
        general: {
            missingHeader: "MISSING HEADER ERROR MESSAGE - EN",
            invalidToken: "INVALID TOKEN ERROR MESSAGE - EN",
            invalidLocale: "INVALID LOCALE ERROR MESSAGE - EN",
            invalidUser: "INVALID USER ERROR MESSAGE - EN",
            noPermission: "USER HAS NO PERMISSION MESSAGE - EN",
            system: "SYSTEM GENERATED UNKNOWN ERROR - EN",
            formError: "ERROR GENERATED RELATED TO FORM - EN",
            unsupportedParameters: "UNSUPPORTED PARAMETERS IN REQUEST BODY - EN"
        },
        offer:{
            notFound: "OFFER NOT FOUND ERROR MESSAGE - EN",
            notOwner: "USER IS NOT OWNER OF THE OFFER - EN",
            owner: "USER IS OWNER OF THE OFFER - EN",
            alreadyRequested: "USER ALREADY REQUESTED THE OFFER - EN",
            notAvailable: "OFFER IS NOT AVAILABLE - EN",
            noRequests: "USER HAS NO REQUESTS - EN",
            requestNotFound: "REQUEST NOT FOUND - EN",
            requestAlreadyProcessed: "REQUEST ALREADY PROCESSED - EN"

        }
      },
      de: {
        auth: {
            invalidCredentials: "INVALID CREDENTIALS ERROR MESSAGE - DE",
            alreadyExists: "ALREADY EXISTS ERROR MESSAGE - DE",
            notFound: "NOT FOUND ERROR MESSAGE - DE"

        },
        general: {
            missingHeader: "MISSING HEADER ERROR MESSAGE - DE",
            invalidToken: "INVALID TOKEN ERROR MESSAGE - DE",
            invalidLocale: "INVALID LOCALE ERROR MESSAGE - DE",
            invalidUser: "INVALID USER ERROR MESSAGE - DE",
            noPermission: "USER HAS NO PERMISSION MESSAGE - DE",
            system: "SYSTEM GENERATED UNKNOWN ERROR - DE",
            formError: "ERROR GENERATED RELATED TO FORM - DE",
            unsupportedParameters: "UNSUPPORTED PARAMETERS IN REQUEST BODY - DE"
        },
        offer:{
            notFound: "OFFER NOT FOUND ERROR MESSAGE - DE",
            notOwner: "USER IS NOT OWNER OF THE OFFER - DE",
            owner: "USER IS OWNER OF THE OFFER - DE",
            alreadyRequested: "USER ALREADY REQUESTED THE OFFER - DE",
            notAvailable: "OFFER IS NOT AVAILABLE - DE",
            noRequests: "USER HAS NO REQUESTS - DE",
            requestNotFound: "REQUEST NOT FOUND - DE",
            requestAlreadyProcessed: "REQUEST ALREADY PROCESSED - DE"
        }
      }
    }
}