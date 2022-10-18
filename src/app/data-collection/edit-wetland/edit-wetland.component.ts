import { DataService } from './../../services/dataServices';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';



interface IImage{
  uri:string
}
interface IProposal{
  fid:number
  remarks:string
}
@Component({
  selector: 'app-edit-wetland',
  templateUrl: './edit-wetland.component.html',
  styleUrls: ['./edit-wetland.component.css']
})
export class EditWetlandComponent implements OnInit {
  selectedFeatureId:number = Number(sessionStorage.getItem('wetlandFid'));
  selectedFeatureProperty = JSON.parse(sessionStorage.getItem('featureProperties')!);
  detailsAdded:boolean = false;
  images:IImage[]= [];
  editWetlandForm = new FormGroup({
    remarks:new FormControl('')
  }); 
  wetLandDetails = {} as IProposal;
  selectedSpatialPlanId = Number(sessionStorage.getItem('selectedSpatialPlanId'));
  constructor(
    private router:Router,
    private dataService:DataService
  ) { }

  ngOnInit(): void {

    this.dataService.getWetlandDetails(this.selectedFeatureId).subscribe(res=>{
      this.wetLandDetails = res.rows[0]
      this.editWetlandForm.patchValue({
       remarks:res.rows[0].remarks
     })
     })
 
     this.getImages()
  }

  takePhoto(){
    this.router.navigate(['camera'])
  }

  saveData(){
    this.wetLandDetails.fid = this.selectedFeatureId;
    this.wetLandDetails.remarks = this.editWetlandForm.get('remarks')?.value!;

    this.dataService.updateWetlandRemakrs(this.wetLandDetails).subscribe(res=>{
      console.log(res)
      this.dataService.markWetlandAsCompleted(this.selectedFeatureId).subscribe(res=>{
        console.log(res)
        window.location.reload();
      })
     
    })
    
  }

  getImages(){
    this.dataService.getImages(sessionStorage.getItem("featureType")!,this.selectedFeatureId).subscribe(res=>{
      this.images = res
      console.log(this.images)
    })
  }

  goBackToMap(){
    this.router.navigate(['map'])
  }

}
