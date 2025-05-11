

module.exports = (entityId) => {
    return {
        en: {
            auth: {
                login: "Login successful. Welcome back!",
                register: "Registration completed successfully. Welcome aboard!",
                forgotPassword: "Password reset email sent successfully.",
                resetPassword: "Your password has been reset successfully."
            },
            user: {
                getSelf: `User data retrieved successfully (ID: ${entityId}).`,
                changeSelf: `Your profile has been updated successfully (ID: ${entityId}).`,
                changePic: `Your profile picture has been updated successfully (ID: ${entityId}).`
            },
            offer: {
                createOffer: "Offer created successfully.",
                editOffer: "Offer updated successfully.",
                getOffers: "Offers retrieved successfully.",
                getOffer: "Offer details retrieved successfully.",
                deleteOffer: "Offer deleted successfully."
            }
        },
        de: {
            auth: {
                login: "Anmeldung erfolgreich. Willkommen zurück!",
                register: "Registrierung erfolgreich abgeschlossen. Willkommen!",
                forgotPassword: "E-Mail zum Zurücksetzen des Passworts wurde erfolgreich gesendet.",
                resetPassword: "Ihr Passwort wurde erfolgreich zurückgesetzt."
            },
            user: {
                getSelf: `Benutzerdaten erfolgreich abgerufen (ID: ${entityId}).`,
                changeSelf: `Ihr Profil wurde erfolgreich aktualisiert (ID: ${entityId}).`,
                changePic: `Ihr Profilbild wurde erfolgreich aktualisiert (ID: ${entityId}).`
            },
            offer: {
                createOffer: "Angebot erfolgreich erstellt.",
                editOffer: "Angebot erfolgreich bearbeitet.",
                getOffers: "Angebote erfolgreich abgerufen.",
                getOffer: "Angebotsdetails erfolgreich abgerufen.",
                deleteOffer: "Angebot erfolgreich gelöscht."
            }
        }

    }

}