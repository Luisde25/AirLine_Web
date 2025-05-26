import { Injectable } from '@angular/core';
import { CityAddDto } from '../../dtos/cityDto';

@Injectable({
  providedIn: 'root'
})
export class CityStorageService {
  private cities: CityAddDto[] = [];

  getCities(): CityAddDto[] {
    return this.cities;
  }

  addCity(city: CityAddDto): void {
    this.cities.push(city);
  }

  cityExists(newCity: CityAddDto): boolean {
    return this.cities.some(
      c => c.country === newCity.country && c.department === newCity.department && c.city === newCity.city
    );
  }
}
