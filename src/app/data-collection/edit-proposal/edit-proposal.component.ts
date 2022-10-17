import { DataService, IProposal } from './../../services/dataServices';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface IImage{
  uri:string
}

@Component({
  selector: 'app-edit-proposal',
  templateUrl: './edit-proposal.component.html',
  styleUrls: ['./edit-proposal.component.css']
})
export class EditProposalComponent implements OnInit {

  constructor(
    private router:Router,
    private dataService:DataService
  ) { }

  selectedFeatureId:number = Number(sessionStorage.getItem('proposalFid'));
  selectedFeatureProperty = JSON.parse(sessionStorage.getItem('featureProperties')!);
  detailsAdded:boolean = false;
  images:IImage[]= [];
  editProposalForm = new FormGroup({
    remarks:new FormControl('')
  }); 
  proposalDetails = {} as IProposal;
  selectedSpatialPlanId = Number(sessionStorage.getItem('selectedSpatialPlanId'));
  
  ngOnInit(): void {
    this.dataService.getProposalDetails(this.selectedFeatureId).subscribe(res=>{
     this.proposalDetails = res.rows[0]
     this.editProposalForm.patchValue({
      remarks:res.rows[0].remarks
    })
    })

    this.getImages()
    
  }

  takePhoto(){
    this.router.navigate(['camera'])
  }

  saveData(){
    this.proposalDetails.fid = this.selectedFeatureId;
    this.proposalDetails.remarks = this.editProposalForm.get('remarks')?.value!;

    this.dataService.updateProposalRemarks(this.proposalDetails).subscribe(res=>{
      console.log(res)
      this.dataService.markProposalShapefileAsCompleted(this.selectedFeatureId).subscribe(res=>{
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
