import EnterParkingLot from "../src/core/usecase/EnterParkingLot"
import GetParkingLot from "../src/core/usecase/GetParkingLot"
import ParkingLotRepositoryMemory from "../src/infra/repository/ParkingLotRepositoryMemory"
import ParkingLotRepositorySQL from "../src/infra/repository/ParkingLotRepositorySQL"


test('Should get parking lot', async function(){    
    const parkingLotRepositorySQL = new ParkingLotRepositorySQL()
    const getParkingLot = new GetParkingLot(parkingLotRepositorySQL)
    const parkingLot = await getParkingLot.execute('shopping')
    expect(parkingLot.code).toBe('shopping')
})

test('Should enter parking lot', async function(){    
    const parkingLotRepositorySQL = new ParkingLotRepositorySQL()
    const enterParkingLot = new EnterParkingLot(parkingLotRepositorySQL)
    const getParkingLot = new GetParkingLot(parkingLotRepositorySQL)
    const parkingLotBeforeEnter = await getParkingLot.execute('shopping')
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0)
    await enterParkingLot.execute('shopping','MMM-0001', new Date('2021-08-18T10:00:00'))
    const parkingLotAfterEnter = await getParkingLot.execute('shopping')
    expect(parkingLotAfterEnter.occupiedSpaces).toBe(1)
})

test.skip('Should be closed', async function(){    
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory()
    const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory)
    const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory)
    const parkingLotBeforeEnter = await getParkingLot.execute('shopping')
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0)
    await enterParkingLot.execute('shopping','MMM-0001', new Date('2021-08-18T23:00:00'))
    const parkingLotAfterEnter = await getParkingLot.execute('shopping')
    expect(parkingLotAfterEnter.occupiedSpaces).toBe(1)
})

test.skip('Should be full', async function(){    
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory()
    const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory)
    const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory)
    const parkingLotBeforeEnter = await getParkingLot.execute('shopping')
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0)
    await enterParkingLot.execute('shopping','MMM-0001', new Date('2021-08-18T10:00:00'))
    await enterParkingLot.execute('shopping','MMM-0001', new Date('2021-08-18T10:00:00'))
    await enterParkingLot.execute('shopping','MMM-0001', new Date('2021-08-18T10:00:00'))
    await enterParkingLot.execute('shopping','MMM-0001', new Date('2021-08-18T10:00:00'))
    await enterParkingLot.execute('shopping','MMM-0001', new Date('2021-08-18T10:00:00'))
    await enterParkingLot.execute('shopping','MMM-0001', new Date('2021-08-18T10:00:00'))
    const parkingLotAfterEnter = await getParkingLot.execute('shopping')
    expect(parkingLotAfterEnter.occupiedSpaces).toBe(1)
})