import { IBuilding, IUnit, IHousehold, IMember } from './staticData';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export interface IPlot {
  plotFeatureId: number;
  developmentStatus: string;
  use: string;
  remarks: string;
}

export interface IProposal {
  fid: number;
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

export interface IFootpath {
  fid: number;
  lap_id: number;
  d_status: string;
  width: number;
  lighting: number;
  friendliness: string;
  remarks: string;
}
@Injectable({
  providedIn: 'root',
})
export class DataService {
  API_URL = 'http://localhost:3010';

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  fileUploadHeaders = {
    headers: new HttpHeaders({}),
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  // Plot Features

  getPlotsShapefile() {
    return this.http
      .get<any>(`${this.API_URL}/plot-shape`)
      .pipe(catchError(this.handleError));
  }

  markPlotAsDone(plotFeatureId: number, data: any) {
    return this.http
      .patch<any>(`${this.API_URL}/plot-shape/set-done/${plotFeatureId}`, data)
      .pipe(catchError(this.handleError));
  }

  //Plots Table
  postPlotDetails(plotDetails: IPlot) {
    return this.http
      .post<any>(`${this.API_URL}/plot`, plotDetails, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  findAPlotByPlotId(plotFeatureId: number) {
    return this.http
      .get<any>(
        `${this.API_URL}/plot/plotId/${plotFeatureId}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  updatePlotDetails(plotFeatureId: number, plotDetails: IPlot) {
    return this.http
      .patch<any>(
        `${this.API_URL}/plot/${plotFeatureId}`,
        plotDetails,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  uploadPlotImage(item: any, plotFeatureId: number) {
    console.log(this.API_URL, 'plot-image/', plotFeatureId);
    return this.http
      .post<any>(
        `${this.API_URL}/plot-image/${plotFeatureId}`,
        item,
        this.fileUploadHeaders
      )
      .pipe(catchError(this.handleError));
  }

  getPlotImages(plotFeatureId: number) {
    return this.http
      .get<any>(
        `${this.API_URL}/plot-image/${plotFeatureId}`,
        this.fileUploadHeaders
      )
      .pipe(catchError(this.handleError));
  }

  //BUILDINGS
  GetBuildingShapeFile() {
    return this.http
      .get<any>(`${this.API_URL}/building-shape`)
      .pipe(catchError(this.handleError));
  }

  CreateBuilding(data: IBuilding) {
    return this.http
      .post<any>(`${this.API_URL}/building`, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  findBuildngByFeatureId(buildingFeatureId: number) {
    return this.http
      .get<any>(
        `${this.API_URL}/building/fid/${buildingFeatureId}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  updateBuildingDetails(buildingFeatureId: number, buildingDetails: IBuilding) {
    return this.http
      .patch<any>(
        `${this.API_URL}/building/fid/${buildingFeatureId}`,
        buildingDetails,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  UploadBuildingImage(item: any, buildingFeatureId: number) {
    return this.http
      .post<any>(
        `${this.API_URL}/building-image/${buildingFeatureId}`,
        item,
        this.fileUploadHeaders
      )
      .pipe(catchError(this.handleError));
  }
  GetBuildingImages(buildingFeatureId: number) {
    return this.http
      .get<any>(
        `${this.API_URL}/building-image/fid/${buildingFeatureId}`,
        this.fileUploadHeaders
      )
      .pipe(catchError(this.handleError));
  }

  MarkBuildingShapeAsComplete(featureId: number) {
    return this.http
      .patch<any>(
        `${this.API_URL}/building-shape/set-done/${featureId}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  //UNITS
  CreateUnit(data: IUnit) {
    return this.http
      .post<any>(`${this.API_URL}/unit`, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  GetAllUnitsByBuilding(buildingFeatureId: number) {
    return this.http
      .get<any>(
        `${this.API_URL}/unit/building/${buildingFeatureId}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  GetUnitDetails(id: number) {
    return this.http
      .get<any>(`${this.API_URL}/unit/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  UpdateUnitDetails(id: number, unitDetails: IUnit) {
    return this.http
      .patch<any>(`${this.API_URL}/unit/${id}`, unitDetails, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //HOUSEHOLDS
  CreateHousehold(data: IHousehold) {
    return this.http
      .post<any>(`${this.API_URL}/household`, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  GetAllHouseholdsByUnit(unitId: number) {
    return this.http
      .get<any>(`${this.API_URL}/household/unit/${unitId}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  GetHouseholdDetails(id: number) {
    return this.http
      .get<any>(`${this.API_URL}/household/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  UpdateHouseholdDetails(id: number, householdDetails: IHousehold) {
    return this.http
      .patch<any>(
        `${this.API_URL}/household/${id}`,
        householdDetails,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  //HOUSEHOLDS
  CreateMember(data: IMember) {
    return this.http
      .post<any>(`${this.API_URL}/member`, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  GetAllMemberByHousehold(householdId: number) {
    return this.http
      .get<any>(
        `${this.API_URL}/member/household/${householdId}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  GetMemberDetails(id: number) {
    return this.http
      .get<any>(`${this.API_URL}/member/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  UpdateMemberDetails(id: number, memberDetails: IMember) {
    return this.http
      .patch<any>(
        `${this.API_URL}/member/${id}`,
        memberDetails,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
}
