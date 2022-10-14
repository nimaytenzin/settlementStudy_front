import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export interface IPlot{
    fid:number;
    lap_id:number;
    plot_id:string;
    d_status:string | null;
    plot_use:string;
    max_height:string;
    setback_e:string;
    parking:number;
    remarks:string;
  }

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



    // Plot Features

    getPlotsByPlan(lap_id:number){
        return this.http
        .get<any>(`${this.API_URL}/shapefile/get-plots/${lap_id}`, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        )
    }

    getPlotDetails(featureId:number){
        return this.http
        .get<any>(`${this.API_URL}/plots/get-plot/${featureId}`, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        ) 
    }

    postPlotDetails(plotDetails:IPlot){
        return this.http
        .post<any>(`${this.API_URL}/plots/add-plot/`,plotDetails, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        )  
    }

    updatePlotDetails(featureId:number, plotDetails:IPlot){
        return this.http
        .put<any>(`${this.API_URL}/plots/update-plot/${featureId}`,plotDetails, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        )  
    }
    markPlotShapefileAsCompleted(featureId:number){
        return this.http
        .put<any>(`${this.API_URL}/plots/set-done/${featureId}`, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        )   
    }


    //images
    uploadImage(item: any){
        return this.http
          .post<any>(`${this.API_URL}/images/add-image`,item,this.httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }



}
