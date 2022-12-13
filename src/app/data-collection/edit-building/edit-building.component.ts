import { ExistancyStatus, AssociativePositions, OwnerShipTypes, BuildingHeights, YesNoOptions, BuildingUse, AgeOfStructure, BuildingStyles, StructureType, PrimaryStructureMaterials, RoofTypes, RoofMaterials, ToiletTypes, ToiletModes, ParkingOptions, IBuilding } from './../../services/staticData';
import { Router } from '@angular/router';
import { DataService } from './../../services/dataServices';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface IImage{
  uri:string
}




@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.css']
})

export class EditBuildingComponent implements OnInit {
  detailsAdded:boolean = false;
  images =[] as IImage[]
  selectedBuildingFeature={
    buildingId:1
  } 


  //form options
  existancyStatus:String[]= ExistancyStatus;
  associativePositions:String[]=AssociativePositions;
  ownershipTypes:String[]=OwnerShipTypes;
  floors:String[]=BuildingHeights;
  jamthogOptions:String[]=YesNoOptions;
  basementOptions:String[]=YesNoOptions;
  buildingUses:String[]=BuildingUse;
  ageOptions:String[]=AgeOfStructure;
  renovationOptions:String[]=YesNoOptions;
  buildingStyles:String[]=BuildingStyles;
  structureTypes:String[]=StructureType;
  materialTypes:String[]=PrimaryStructureMaterials;
  roofTypes:String[]=RoofTypes;
  roofMaterials:String[]=RoofMaterials;
  toiletTypes:String[]=ToiletTypes;
  toiletModes:String[]=ToiletModes;
   yesNoOptions:String[]=YesNoOptions;
  parkingOptions:String[]=ParkingOptions;


  editBuildingForm = new FormGroup({
    existancyStatus:new FormControl(''),
    associativePosition:new FormControl(''),
    ownership:new FormControl(''),
    floors:new FormControl(''),
    jamthog:new FormControl(''),
    basement:new FormControl(''),
    use:new FormControl(''),
    age:new FormControl(''),
    rennovation:new FormControl(''),
    rennovationRemarks:new FormControl(''),
    style:new FormControl(''),
    type:new FormControl(''),
    material:new FormControl(''),
    roofType:new FormControl(''),
    roofMaterial:new FormControl(''),
    toiletMode:new FormControl(''),
    toiletType: new FormControl(''),
    roadAccess:new FormControl(''),
    parking:new FormControl(''),
    remarks: new FormControl(''),
  });

   buildingDetails = {
    rennovationRemarks:"NA",
    remarks:"NA"
  } as IBuilding;

  constructor(
    private dataService:DataService,
    private router:Router
  ) { }


  ngOnInit(): void {
    
  }

  fetchDataIfExists(){
   //fetch and update
  }

  goBackToMap(){
    this.router.navigate(['map'])
  }

  getImages(){
    //getbuilding images
  }

  saveData(){
    this.buildingDetails.structureId = 1;
    this.buildingDetails.existancyStatus =  this.getFormValue('existancyStatus');
    this.buildingDetails.associativePosition = this.getFormValue('associativePosition');
    this.buildingDetails.ownership = this.getFormValue('ownership');
    this.buildingDetails.floors = this.getFormValue('floors');
    this.buildingDetails.jamthog = this.getFormValue("jamthog");
    this.buildingDetails.basement = this.getFormValue('basement');
    this.buildingDetails.use = this.getFormValue("use");
    this.buildingDetails.age = this.getFormValue('age');
    this.buildingDetails.rennovation = this.getFormValue("rennovation");
    this.buildingDetails.rennovationRemarks = this.getFormValue('rennovationRemarks');
    this.buildingDetails.style = this.getFormValue('style');
    this.buildingDetails.type = this.getFormValue('type');
    this.buildingDetails.material = this.getFormValue('material');
    this.buildingDetails.roofType = this.getFormValue('roofType');
    this.buildingDetails.roofMaterial= this.getFormValue('roofMaterial');
    this.buildingDetails.toiletMode = this.getFormValue('toiletMode');
    this.buildingDetails.toiletType = this.getFormValue('toiletType');
    this.buildingDetails.roadAccess = this.getFormValue("roadAccess");
    this.buildingDetails.parking = this.getFormValue('parking');
    this.buildingDetails.remarks = this.getFormValue("remarks");
    
    console.log(this.buildingDetails)
    //updare data or post data
  }

  getFormValue(controlName:string){
    return this.editBuildingForm.get(controlName)?.value!;

  }
  takePhoto(){
    this.router.navigate(['camera'])
  }

}
