import { Injectable, HttpException } from '@nestjs/common';
import { cars } from './car.mock';

@Injectable()
export class CarService {
  private carsToDrive = cars;

  public getCars() {
    return this.carsToDrive;
  }

  public postCar(car) {
    return this.carsToDrive.push(car);
  }

  public getCarById(id: number): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const car = this.carsToDrive.find((car) => car.id === carId);
      if (!car) {
        throw new HttpException('Car Not Found', 404);
      }
      return resolve(car);
    });
  }

  public deleteCarById(id: number): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const index = this.carsToDrive.findIndex((car) => car.id === carId);

      if (index === -1) {
        throw new HttpException('Car Not Found', 404);
      }
      this.carsToDrive.splice(index, 1);
      return resolve(this.carsToDrive);
    });
  }

  public putCarById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const index = this.carsToDrive.findIndex((car) => car.id === carId);

      if (index === -1) {
        throw new HttpException('Car Not Found', 404);
      }

      this.carsToDrive[index][propertyName] = propertyValue;
      return resolve(this.carsToDrive[index]);
    });
  }
}
