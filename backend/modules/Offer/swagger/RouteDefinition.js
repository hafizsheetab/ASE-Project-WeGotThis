/**
 * @openapi
 * "/v1/offer/create":
 *   post:
 *     security:
 *       - Locale: []
 *       - ApiToken: []
 *     tags:
 *       - Offer
 *     summary: Create a new offer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateOfferRequest"
 *     responses:
 *       "201":
 *         description: Offer created successfully
 *
 * "/v1/offer/edit/{offerId}":
 *   put:
 *     security:
 *       - Locale: []
 *       - ApiToken: []
 *     tags:
 *       - Offer
 *     summary: Edit an existing offer
 *     parameters:
 *       - in: path
 *         name: offerId
 *         required: true
 *         description: ID of the offer to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/EditOfferRequest"
 *     responses:
 *       "200":
 *         description: Offer updated successfully
 *
 * "/v1/offer/get/{offerId}":
 *   get:
 *     security:
 *       - Locale: []
 *       - ApiToken: []
 *     tags:
 *       - Offer
 *     summary: Get details of a single offer
 *     parameters:
 *       - in: path
 *         name: offerId
 *         required: true
 *         description: ID of the offer to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Offer retrieved successfully
 *
 * "/v1/offer/getAll":
 *   get:
 *     security:
 *       - Locale: []
 *       - ApiToken: []
 *     tags:
 *       - Offer
 *     summary: Get a list of all offers
 *     responses:
 *       "200":
 *         description: List of offers retrieved successfully
 *
 * "/v1/offer/delete/{offerId}":
 *   delete:
 *     security:
 *       - Locale: []
 *       - ApiToken: []
 *     tags:
 *       - Offer
 *     summary: Delete an offer
 *     parameters:
 *       - in: path
 *         name: offerId
 *         required: true
 *         description: ID of the offer to delete
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Offer deleted successfully
 */
