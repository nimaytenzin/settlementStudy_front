import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dataServices';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


interface IThromde {
  id: number;
  thromde_name: string;
}

interface ISpatialPlan{
  id:number;
  lap_name:string;
}

interface ITypes{
  id:number,
  name:string
}


@Component({
  selector: 'app-select-zone',
  templateUrl: './select-zone.component.html',
  styleUrls: ['./select-zone.component.css']
})
export class SelectZoneComponent implements OnInit {


  constructor(
    private router: Router,
    private dataService: DataService,
    private fb:FormBuilder
  ) { }

  title = 'cdrsAngular';
  thromdes:IThromde[] =[];
  spatialPlans:ISpatialPlan[]=[];


  selectedThromde = 0; 
  selectedSpatialPlan = {} as ISpatialPlan

  types:ITypes[]=[
    {id: 1, name: "Plots" },
    {id: 2, name: "Buildings" },
    {id: 3, name: "Roads" },
    {id: 4, name: "Footpaths" },
    {id: 4, name: "Proposals" },
    {id:5,name:"Wetlands"}
  ]
  //forms
  planSelectForm = new FormGroup({
    selectedThromde:new FormControl(''),
    selectedSpatialPlan: new FormControl(''),
    featureType: new FormControl('')
    
  });
  

  ngOnInit(): void {
    this.dataService.getThromdes().subscribe(res=>{
      console.log(res)
      this.thromdes = res
    })
  }

  onThromdeSelect(){
    this.dataService.getSpatialPlansByThromde(Number(this.planSelectForm.get('selectedThromde')?.value)).subscribe(res => {
      this.spatialPlans =res
      console.log(res)
    })
  }
  goToMapView(){
    let selectedSpatialPlan = this.planSelectForm.get('selectedSpatialPlan')?.value
    let selectedFeatureType = this.planSelectForm.get('featureType')?.value
    if(
        !selectedSpatialPlan
      ){
        alert("Please select a Spatial Plan")
        return
      }
    if(!selectedFeatureType){
      alert("Please select a Feature Type")
      return 
    }
    sessionStorage.setItem("selectedSpatialPlanId",String(selectedSpatialPlan))
    sessionStorage.setItem("featureType",String(selectedFeatureType))
    this.router.navigate(['map'])
  }

}
