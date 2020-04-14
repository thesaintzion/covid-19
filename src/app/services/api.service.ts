import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
covid_19_url = 'https://coronavirus-19-api.herokuapp.com';



  constructor(private http: HttpClient) { }

  getGlobal(){
    return this.http.get<any>(`${this.covid_19_url}/all`);
  }

  getCountries(){
    return this.http.get<any>(`${this.covid_19_url}/countries`);
  }

  getCountryFlags(){
    return this.http.get<any>(`https://restcountries.eu/rest/v2/all`);
  }


 
}
