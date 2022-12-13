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
  API_URL = 'http://localhost:3000';

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

  markPlotShapefileAsCompleted(featureId: number) {
    return this.http
      .put<any>(`${this.API_URL}/plots/set-done/${featureId}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //images
  uploadImage(item: any) {
    return this.http
      .post<any>(`${this.API_URL}/images/add-image`, item, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getImages(ftype: string, fid: number) {
    return this.http
      .get<any>(
        `${this.API_URL}/images/get-image/${ftype}/${fid}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  //roads
  getRoadsByPlan(planId: number) {
    return this.http
      .get<any>(
        `${this.API_URL}/shapefile/get-roads/${planId}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  getRoadSegmentDetails(roadFeatureId: number) {
    return this.http
      .get<any>(
        `${this.API_URL}/roads/get-road/${roadFeatureId}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  postRoadSegmentDetails(roadDetails: any) {
    return this.http
      .post<any>(
        `${this.API_URL}/roads/add-road`,
        roadDetails,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  updateRoadSegmentDetails(roadDetails: any, roadFeatureId: number) {
    return this.http
      .put<any>(
        `${this.API_URL}/roads/update-road/${roadFeatureId}`,
        roadDetails,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  markRoadShapefileAsCompleted(featureId: number) {
    return this.http
      .put<any>(`${this.API_URL}/roads/set-done/${featureId}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //buildings
  getBuildingsByPlan(planId: number) {
    return this.http
      .get<any>(
        `${this.API_URL}/shapefile/get-buildings/${planId}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getZhicharBuildingDetails(structureId: number) {
    return this.http
      .get<any>(
        `https://zhichar.ddnsfree.com/hpi/building/get/${structureId}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  //footpaths

  getFootpathsByPlan(planId: number) {
    return this.http
      .get<any>(
        `${this.API_URL}/shapefile/get-footpaths/${planId}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getFootpathDetails(footpathFid: number) {
    return this.http
      .get<any>(
        `${this.API_URL}/footpaths/get-path/${footpathFid}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  postFootpathDetails(footpathDetails: any) {
    return this.http
      .post<any>(
        `${this.API_URL}/footpaths/add-path`,
        footpathDetails,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  updateFootpathDetails(fid: number, footpathDetails: any) {
    return this.http
      .put<any>(
        `${this.API_URL}/footpaths/update-path/${fid}`,
        footpathDetails,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  footpathSetDone(fid: number) {
    return this.http
      .put<any>(`${this.API_URL}/footpaths/set-done/${fid}'`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //wetland
  getWetlandsBySpatialPlan(spatialPlanId: number) {
    return this.http
      .get<any>(`${this.API_URL}/shapefile/get-wetlands/${spatialPlanId}`)
      .pipe(catchError(this.handleError));
  }

  markWetlandAsCompleted(featureId: number) {
    return this.http
      .put<any>(
        `${this.API_URL}/wetlands/set-done/${featureId}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  updateWetlandRemakrs(proposalDetails: IProposal) {
    return this.http
      .put<any>(
        `${this.API_URL}/wetlands/updateRemarks`,
        proposalDetails,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getWetlandDetails(proposalFeatureId: number) {
    return this.http
      .get<any>(
        `${this.API_URL}/wetlands/getDetails/${proposalFeatureId}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  //proposals
  getProposalsBySpatialPlan(spatialPlanId: number) {
    return this.http
      .get<any>(`${this.API_URL}/shapefile/get-proposals/${spatialPlanId}`)
      .pipe(catchError(this.handleError));
  }

  markProposalShapefileAsCompleted(featureId: number) {
    return this.http
      .put<any>(
        `${this.API_URL}/proposals/set-done/${featureId}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  //unimplemented
  updateProposalRemarks(proposalDetails: IProposal) {
    return this.http
      .put<any>(
        `${this.API_URL}/proposals/updateRemarks`,
        proposalDetails,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  //unimplemented
  getProposalDetails(proposalFeatureId: number) {
    return this.http
      .get<any>(
        `${this.API_URL}/proposals/getDetails/${proposalFeatureId}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
}
