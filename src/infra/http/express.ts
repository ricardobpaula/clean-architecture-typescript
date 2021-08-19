import express from 'express'
import ExpressAdapter from '../../adapter/ExpressAdapter'
import ParkingLotController from '../../controller/ParkingLotController'

const app = express()

app.get('/parkingLots/:code', ExpressAdapter.create(ParkingLotController.getParkingLot))

app.listen(3333)