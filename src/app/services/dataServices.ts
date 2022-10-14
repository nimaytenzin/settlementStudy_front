import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    API_URL = "http://202.144.157.89/cdrs/api";

    constructor(
        private http: HttpClient
    ) { }

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }



    getThromdes() {
        return this.http
            .get<any>(`${this.API_URL}/get-thromdes`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }
    getSpatialPlansByThromde(thromdeId: number) {
        return this.http
            .get<any>(`${this.API_URL}/get-laps/${thromdeId}`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    getPlotsByPlan(lap_id:number){
        return this.http
        .get<any>(`${this.API_URL}/shapefile/get-plots/${lap_id}`, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        )
      }


}
