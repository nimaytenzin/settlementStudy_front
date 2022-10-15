import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export interface IPlot {
    fid: number;
    lap_id: number;
    plot_id: string;
    d_status: string | null;
    plot_use: string;
    max_height: string;
    setback_e: string;
    parking: number;
    remarks: string;
}

export interface IRoad {
    fid: number;
    lap_id: number;
    d_status: string;
    t_flow: string;
    row: number;
    lanes: number;
    carriage_width: number;
    median: number;
    parking_left: number;
    parking_right: number;
    path_left: number;
    path_right: number;
    light_left: number;
    light_right: number;
    drains_left: number;
    drains_right: number;
    remarks: string;
}

export interface IFootpath{
    fid: number;
    lap_id:number;
    d_status:string;
    width:number;
    lighting:number;
    friendliness:string;
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

    getPlotsByPlan(lap_id: number) {
        return this.http
            .get<any>(`${this.API_URL}/shapefile/get-plots/${lap_id}`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    getPlotDetails(featureId: number) {
        return this.http
            .get<any>(`${this.API_URL}/plots/get-plot/${featureId}`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    postPlotDetails(plotDetails: IPlot) {
        return this.http
            .post<any>(`${this.API_URL}/plots/add-plot/`, plotDetails, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    updatePlotDetails(featureId: number, plotDetails: IPlot) {
        return this.http
            .put<any>(`${this.API_URL}/plots/update-plot/${featureId}`, plotDetails, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }
    markPlotShapefileAsCompleted(featureId: number) {
        return this.http
            .put<any>(`${this.API_URL}/plots/set-done/${featureId}`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    //images
    uploadImage(item: any) {
        return this.http
            .post<any>(`${this.API_URL}/images/add-image`, item, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getImages(ftype: string, fid: number) {
        return this.http
            .get<any>(`${this.API_URL}/images/get-image/${ftype}/${fid}`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    //roads
    getRoadsByPlan(planId: number) {
        return this.http
            .get<any>(`${this.API_URL}/shapefile/get-roads/${planId}`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }
    getRoadSegmentDetails(roadFeatureId: number) {
        return this.http
            .get<any>(`${this.API_URL}/roads/get-road/${roadFeatureId}`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    postRoadSegmentDetails(roadDetails: any) {
        return this.http
            .post<any>(`${this.API_URL}/roads/add-road`, roadDetails, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
    updateRoadSegmentDetails(roadDetails: any, roadFeatureId: number) {
        return this.http
            .put<any>(`${this.API_URL}/roads/update-road/${roadFeatureId}`, roadDetails, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    markRoadShapefileAsCompleted(featureId: number) {
        return this.http
            .put<any>(`${this.API_URL}/roads/set-done/${featureId}`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    //buildings
    getBuildingsByPlan(planId: number) {
        return this.http
            .get<any>(`${this.API_URL}/shapefile/get-buildings/${planId}`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    getZhicharBuildingDetails(structureId: number) {
        return this.http
            .get<any>(`https://zhichar.ddnsfree.com/hpi/building/get/${structureId}`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    //footpaths

    getFootpathsByPlan(planId:number){
        return this.http
        .get<any>(`${this.API_URL}/shapefile/get-footpaths/${planId}`, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        )
      }

    getFootpathDetails(footpathFid:number) {
        return this.http
            .get<any>(`${this.API_URL}/footpaths/get-path/${footpathFid}`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    postFootpathDetails(footpathDetails:any){
        return this.http
        .post<any>(`${this.API_URL}/footpaths/add-path`, footpathDetails, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
      }
      updateFootpathDetails(fid:number,footpathDetails:any){
        return this.http
        .put<any>(`${this.API_URL}/footpaths/update-path/${fid}`, footpathDetails, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
      }

      footpathSetDone(fid:number){
        return this.http
        .put<any>(`${this.API_URL}/footpaths/set-done/${fid}'`,this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
      }

}
