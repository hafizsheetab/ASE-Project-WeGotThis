

module.exports = (entityId) => {
    return {
      en: {
        user: {
          login: "SUCCESS MESSAGE OF USER LOGIN SERVICE - EN",
          create: "SUCCESS MESSAGE OF USER CREATE SERVICE - EN",
          getOne: `SUCCESS MESSAGE OF GETTING ONE USER - EN WITH ENTITY ID ${entityId}` 
        }
      },
      de: {
        user: {
          login: "SUCCESS MESSAGE OF USER LOGIN SERVICE - BN",
          create: "SUCCESS MESSAGE OF USER CREATE SERVICE - BN",
          getOne: `SUCCESS MESSAGE OF GETTING ONE USER - BN WITH ENTITY ID ${entityId}` 
        }
      }
    }
}