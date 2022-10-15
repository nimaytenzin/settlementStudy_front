import { Router } from '@angular/router';
import { DataService } from './../../services/dataServices';
import { TrafficFlowDirection } from './../../services/staticData';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IRoad } from 'src/app/services/dataServices';
import { DevelopmentStatuses } from 'src/app/services/staticData';

interface IImage{
  uri:string
}


@Component({
  selector: 'app-edit-road',
  templateUrl: './edit-road.component.html',
  styleUrls: ['./edit-road.component.css']
})
export class EditRoadComponent implements OnInit {

  constructor(
    private dataService:DataService,
    private router:Router
  ) { }
  roadFeatureId = Number(sessionStorage.getItem("roadFid"));
  selectedSpatialPlanId = Number(sessionStorage.getItem('selectedSpatialPlanId'));
  detailsAdded:boolean = false;

  roadDetails = {
    row:0,
    median:0,
    parking_left:0,
    parking_right:0,
    light_left:0,
    light_right:0
  } as IRoad;


  editRoadForm = new FormGroup({
    developmentStatus:new FormControl(''),
    trafficFlow:new FormControl(''),
    lanes:new FormControl(''),
    carriageWidth: new FormControl(''),
    remarks:new FormControl(''),
    drainsLeft:new FormControl(''),
    drainsRight: new FormControl(''),
    footpathLeft:new FormControl(''),
    footpathRight:new FormControl('')
  });
  images=[] as IImage[]


  developmentstatuses:String[] = DevelopmentStatuses;
  trafficFlow:String[] = TrafficFlowDirection;
  
  ngOnInit(): void {
    this.fetchDataIfExists();
    this.getImages();
  }

  fetchDataIfExists(){
    this.dataService.getRoadSegmentDetails(this.roadFeatureId).subscribe(res=>{
      console.log("DATA FROM SERVER", res)
      if(res){
        this.detailsAdded = true;
        this.editRoadForm.patchValue({
          developmentStatus: res.d_status,
          trafficFlow:res.t_flow,
          lanes:res.lanes,
          carriageWidth:res.carriage_width,
          drainsLeft:res.drains_left,
          drainsRight:res.drains_right,
          footpathLeft:res.path_left,
          footpathRight:res.path_right,
          remarks: res.remarks
        })
      }else{
        this.detailsAdded = false;
      }
    })
  }
  
  saveData(){
    this.roadDetails.fid = this.roadFeatureId;
    this.roadDetails.lap_id = this.selectedSpatialPlanId;
    this.roadDetails.row = 0;
    this.roadDetails.light_left = 0;
    this.roadDetails.light_right = 0;
    this.roadDetails.parking_left = 0;
    this.roadDetails.parking_right = 0;

    this.roadDetails.d_status = this.editRoadForm.get('developmentStatus')?.value!;
    this.roadDetails.t_flow = this.editRoadForm.get('trafficFlow')?.value!;
    this.roadDetails.lanes = Number(this.editRoadForm.get('lanes')?.value!);
    this.roadDetails.carriage_width = Number(this.editRoadForm.get('carriageWidth')?.value!);
    this.roadDetails.remarks = this.editRoadForm.get('remarks')?.value!;
    this.roadDetails.drains_left = Number(this.editRoadForm.get('drainsLeft')?.value!);
    this.roadDetails.drains_right = Number(this.editRoadForm.get('drainsRight')?.value!);
    this.roadDetails.path_left = Number(this.editRoadForm.get('footpathLeft')?.value!);
    this.roadDetails.path_right = Number(this.editRoadForm.get('footpathRight')?.value!);
    
    if(this.detailsAdded){
      this.dataService.updateRoadSegmentDetails(this.roadDetails,this.roadFeatureId).subscribe(res=>{
        console.log(res)
      })
    }else{
      this.dataService.postRoadSegmentDetails(this.roadDetails).subscribe(res=>{
        console.log(res,"ADDMING DATA")
        this.dataService.markRoadShapefileAsCompleted(this.roadFeatureId).subscribe(resp=>{
          console.log(resp)
          window.location.reload()
        }) 
      })
    }
  }


  getImages(){
    this.dataService.getImages(sessionStorage.getItem("featureType")!,this.roadFeatureId).subscribe(res=>{
      this.images = res
      console.log(this.images)
    })
  }

  
  goBackToMap(){
    this.router.navigate(['map'])
  }

  takePhoto(){
    this.router.navigate(['camera'])
  }
}
