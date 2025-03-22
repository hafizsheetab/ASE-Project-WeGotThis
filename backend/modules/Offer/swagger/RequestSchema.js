
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateOfferRequest:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          example: "Dog Walking Service"
 *        description:
 *          type: string
 *          example: "I can walk your dog for 30 minutes."
 *        images:
 *          type: array
 *          items:
 *            type: string
 *          example:
 *            - "https://example.com/image.jpg"
 *        location:
 *          type: object
 *          properties:
 *            address:
 *               type: string
 *               example: "New York, NY"
 *        priceMode:
 *          type: string
 *          enum: [fixed, negotiation]
 *          example: "fixed"
 *        price:
 *          type: number
 *          example: 20
 *        availability:
 *          type: boolean
 *          default: true
 *          example: true
 *        type:
 *          type: string
 *          enum: [offering, seeking]
 *          example: "offering"
 *        categories:
 *          type: array
 *          items:
 *            type: string
 *          example:
 *            - "pet-care"
 *            - "dog-walking"
 *        estimatedTime:
 *          type: number
 *          description: Estimated duration in minutes
 *          example: 60
 *        status:
 *          type: string
 *          enum: [active, inactive]
 *          default: active
 *          example: "active"
 *    EditOfferRequest:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          example: "Updated Dog Walking Service"
 *        description:
 *          type: string
 *          example: "Updated description for dog walking service."
 *        images:
 *          type: array
 *          items:
 *            type: string
 *          example:
 *            - "https://example.com/new-image.jpg"
 *        price:
 *          type: number
 *          example: 25
 *        categories:
 *          type: array
 *          items:
 *            type: string
 *          example:
 *            - "pet-care"
 *            - "dog-walking"
 *        availability:
 *          type: boolean
 *          example: false
 *        status:
 *          type: string
 *          enum: [active, inactive]
 *          example: "inactive"
 */
