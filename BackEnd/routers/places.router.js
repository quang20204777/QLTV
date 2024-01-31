const express = require('express')
const placesRouter = express.Router()
const { authenticate } = require('../middleware/authentication')
const { adminAuthorize, userAuthorize, userOtherSchoolAuthorize, allAuthorize } = require('../middleware/authorization')
const { getAllPlace, createPlace, deletePlace, updatePosition, getPlaceById, findPlaceByPositionPlace, placeUser } = require('../controller/place.controller')
const { checkPlace, checkPositionPlace } = require('../middleware/validation')

placesRouter.get('/getAllPlace', authenticate, userAuthorize, getAllPlace)
placesRouter.post('/createPlace', authenticate, adminAuthorize, createPlace)
placesRouter.delete('/deletePlace/:id', authenticate, adminAuthorize, checkPlace, deletePlace)
placesRouter.put('/updatePosition/:id', authenticate, adminAuthorize, checkPlace, updatePosition)
placesRouter.get('/findById/:id', authenticate, userAuthorize, checkPlace, getPlaceById)
placesRouter.get('/findplacebypositionplace/:positionPlace', authenticate, allAuthorize, findPlaceByPositionPlace)
placesRouter.put('/placeUser', authenticate, userAuthorize, checkPositionPlace, placeUser)

module.exports = {
    placesRouter
}