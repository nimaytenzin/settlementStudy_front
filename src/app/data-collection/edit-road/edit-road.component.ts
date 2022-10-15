import { TrafficFlowDirection } from './../../services/staticData';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IRoad } from 'src/app/services/dataServices';
import { DevelopmentStatuses } from 'src/app/services/staticData';



@Component({
  selector: 'app-edit-road',
  templateUrl: './edit-road.component.html',
  styleUrls: ['./edit-road.component.css']
})
export class EditRoadComponent implements OnInit {

  constructor() { }
  fid = sessionStorage.getItem("roadFid")
  roadDetails = {
    row:0,
    median:0,
    parking_left:0,
    parking_right:0,
    path_left:0,
    path_right:0,
    light_left:0,
    light_right:0,
    drains_left:0,
    drains_right:0
  } as IRoad;


  // fid: number;
// lap_id:number;
// d_status:string;
// t_flow: string;
// row:number;
// lanes:number;
// carriage_width:number;
// median:number;
// parking_left:number;
// parking_right:number;
// path_left:number;
// path_right:number;
// light_left:number;
// light_right:number;
// drains_left:number;
// drains_right:number;
// remarks:string;


  editRoadForm = new FormGroup({
    developmentStatus:new FormControl(''),
    trafficFlow:new FormControl(''),
    lanes:new FormControl(''),
    carriageWidth: new FormControl(''),
    remarks:new FormControl('')
  });

  developmentstatuses:String[] = DevelopmentStatuses;
  trafficFlow:String[] = TrafficFlowDirection;
  
  ngOnInit(): void {

  }




  saveData(){
    this.roadDetails.fid = 1;
    this.roadDetails.lap_id = Number(sessionStorage.getItem('selectedSpatialPlanId'));
    this.roadDetails.d_status = this.editRoadForm.get('developmentStatus')?.value!;
    this.roadDetails.t_flow = this.editRoadForm.get('trafficFlow')?.value!;
    this.roadDetails.lanes = Number(this.editRoadForm.get('lanes')?.value!);
    this.roadDetails.carriage_width = Number(this.editRoadForm.get('carriageWidth')?.value!);
    this.roadDetails.remarks = this.editRoadForm.get('remarks')?.value!;

  
    
  }

  goBackToMap(){

  }

}
