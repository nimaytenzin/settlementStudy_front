import { DataService } from './../../services/dataServices';
import { Component, OnInit } from '@angular/core';

export interface IZhicharBuilding{
  attic:boolean,
  basement:boolean,
  buildingMaterial:string,
  buildingOwnership:string,
  buildingStyle:string,
  buildingType:string,
  buildingUse:string,
  cidOwner:string,
  constructionYear:string,
  existancyStatus:string,
  floors:string,
  structure_id:number,
  jamthog:boolean,
  nameOfBuildingOwner:string
}

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.css']
})

export class EditBuildingComponent implements OnInit {

  zhicharBuildingDetails!: IZhicharBuilding;
  
  constructor(
    private dataService:DataService
  ) { }


  ngOnInit(): void {
    this.dataService.getZhicharBuildingDetails(Number(sessionStorage.getItem("buildingFid"))).subscribe(res=>{
      console.log(res)
      this.zhicharBuildingDetails = res.data;
      
    })
  }

}
