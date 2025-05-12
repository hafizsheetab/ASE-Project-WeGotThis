module.exports = (entityId) => {
    return {
        en: {
            auth: {
                invalidCredentials: "Invalid email or password. Please try again.",
                alreadyExists: "An account with this email already exists.",
                notFound: "The requested user or resource could not be found."
            },
            general: {
                missingHeader: "A required header is missing from the request.",
                invalidToken: "Authentication failed due to an invalid or expired token.",
                invalidLocale: "The selected language or locale is not supported.",
                invalidUser: "The specified user is invalid or does not exist.",
                noPermission: "You do not have permission to perform this action.",
                system: "An unexpected error occurred. Please try again later.",
                formError: "There was an error processing the form. Please check your input.",
                unsupportedParameters: "The request contains unsupported or invalid parameters."
            },
            offer: {
                notFound: "The requested offer was not found.",
                notOwner: "You are not authorized for this offer.",
                owner: "You are the owner of this offer.",
                alreadyRequested: "You have already requested this offer.",
                notAvailable: "This offer is no longer available.",
                noRequests: "You have not made any requests yet.",
                requestNotFound: "The requested item could not be found.",
                requestAlreadyProcessed: "This request has already been processed."
            }
        },
        de: {
            auth: {
                invalidCredentials: "E-Mail oder Passwort sind ungültig. Bitte versuchen Sie es erneut.",
                alreadyExists: "Ein Konto mit dieser E-Mail-Adresse existiert bereits.",
                notFound: "Der angeforderte Benutzer oder die Ressource wurde nicht gefunden."
            },
            general: {
                missingHeader: "Ein erforderlicher Header fehlt in der Anfrage.",
                invalidToken: "Authentifizierung fehlgeschlagen. Das Token ist ungültig oder abgelaufen.",
                invalidLocale: "Die gewählte Sprache oder Region wird nicht unterstützt.",
                invalidUser: "Der angegebene Benutzer ist ungültig oder existiert nicht.",
                noPermission: "Sie haben keine Berechtigung für diese Aktion.",
                system: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
                formError: "Beim Verarbeiten des Formulars ist ein Fehler aufgetreten. Bitte überprüfen Sie Ihre Eingaben.",
                unsupportedParameters: "Die Anfrage enthält nicht unterstützte oder ungültige Parameter."
            },
            offer: {
                notFound: "Das angeforderte Angebot wurde nicht gefunden.",
                notOwner: "Sie sind nicht berechtigt, dieses Angebot zu bearbeiten.",
                owner: "Sie sind der Eigentümer dieses Angebots.",
                alreadyRequested: "Sie haben dieses Angebot bereits angefragt.",
                notAvailable: "Dieses Angebot ist nicht mehr verfügbar.",
                noRequests: "Sie haben noch keine Anfragen gestellt.",
                requestNotFound: "Die angeforderte Anfrage wurde nicht gefunden.",
                requestAlreadyProcessed: "Diese Anfrage wurde bereits bearbeitet."
            }
        }
    }
}