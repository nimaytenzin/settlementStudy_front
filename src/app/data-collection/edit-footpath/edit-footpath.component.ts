import { Router } from '@angular/router';
import { DataService, IFootpath } from './../../services/dataServices';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DevelopmentStatuses } from 'src/app/services/staticData';

interface IImage{
  uri:string
}


@Component({
  selector: 'app-edit-footpath',
  templateUrl: './edit-footpath.component.html',
  styleUrls: ['./edit-footpath.component.css']
})
export class EditFootpathComponent implements OnInit {

  constructor(
    private dataService:DataService,
    private router:Router
  ) { }

  footpathFeatureId = Number(sessionStorage.getItem('footpathFid'));
  selectedSpatialPlanId = Number(sessionStorage.getItem('selectedSpatialPlanId'));

  detailsAdded:boolean = false;
  developmentstatuses:String[] = DevelopmentStatuses;
  images=[] as IImage[];
  
  editFootpathForm = new FormGroup({
    developmentStatus:new FormControl(''),
    width:new FormControl(''),
    remarks:new FormControl('')
  })

  // fid: number;
  // lap_id:number;
  // d_status:string;
  // width:number;
  // lighting:number;
  // friendliness:string;
  // remarks:string;

  footpathDetails = {
    friendliness:"NA",
    lighting:0
  } as IFootpath;

  ngOnInit(): void {
    this.fetchDataIfExists();
    this.getImages();
  }

  takePhoto(){
    this.router.navigate(['camera'])
  }

  fetchDataIfExists(){
    this.dataService.getFootpathDetails(this.footpathFeatureId).subscribe(res=>{
      console.log("DATA FROM SERVER FPATH", res)
      if(res){
        this.detailsAdded = true;
        this.editFootpathForm.patchValue({
          developmentStatus: res.d_status,
          width:res.width,
          remarks:res.remarks
        })
      }else{
        this.detailsAdded = false;
      }
    })
  }


  getImages(){
    this.dataService.getImages(sessionStorage.getItem("featureType")!,this.footpathFeatureId).subscribe(res=>{
      this.images = res
      console.log(this.images)
    })
  }


  saveData(){
    this.footpathDetails.lap_id = this.selectedSpatialPlanId;
    this.footpathDetails.fid = this.footpathFeatureId!;
    this.footpathDetails.width = Number(this.editFootpathForm.get('width')?.value!);
    this.footpathDetails.d_status = this.editFootpathForm.get('developmentStatus')?.value!;
    this.footpathDetails.remarks = this.editFootpathForm.get('remarks')?.value!;
    this.footpathDetails.lighting = 0;
    
    console.log(this.footpathDetails)
    if(this.detailsAdded){
      this.dataService.updateFootpathDetails(this.footpathFeatureId, this.footpathDetails).subscribe(res=>{
        console.log(res)
      })
    }else{
      this.dataService.postFootpathDetails(this.footpathDetails).subscribe(res=>{
        this.dataService.footpathSetDone(this.footpathFeatureId).subscribe(resp=>{
          window.location.reload()
        })
      })
    }

  }
  goBackToMap(){
    this.router.navigate(['map'])
  }

}
