import hapi from '@hapi/hapi'
import HapiAdapter from '../../adapter/HapiAdapter'
import ParkingLotController from '../../controller/ParkingLotController'

const server = new hapi.server({
    port: 3333,
    host: 'localhost'
})

server.route({  
    method: 'GET',
    path: '/parkingLots/{code}',
    handler: HapiAdapter.create(ParkingLotController.getParkingLot)  
})

server.start()