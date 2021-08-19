import ParkingLotAdapter from "../../adapter/ParkingLotAdapter";
import ParkingLot from "../../core/entity/ParkingLot";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";
import database from '../database/database'

export default class ParkingLotRepositorySQL implements ParkingLotRepository {
    
    async getParkingLot(code: string): Promise<ParkingLot> {
        const parkingLot = await database.oneOrNone("select pl.*, count(pc.*) as occupied_spaces from parking_lot pl left join parked_car pc on pc.code = pl.code where pl.code = $1 group by pl.code, pl.capacity, pl.open_hour, pl.close_hour",[code])
        return ParkingLotAdapter.create(parkingLot.code, parkingLot.capacity, parkingLot.open_hour, parkingLot.close_hour, Number(parkingLot.occupied_spaces))
    }
    async saveParkedCar(code: string, plate: string, date: Date) {
        await database.none("insert into parked_car (code, plate, enter_date) values ($1, $2, $3)",[code, plate, date])
    }
    
}