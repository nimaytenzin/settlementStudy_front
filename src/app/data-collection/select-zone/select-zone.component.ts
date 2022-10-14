import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dataServices';
import { FormsModule } from '@angular/forms';


interface Thromde {
  id: number;
  thromde_name: string;
}

interface SpatialPlan{
  id:number;
  lap_name:string;
}

interface Types{
  id:number,
  name:string
}


@Component({
  selector: 'app-select-zone',
  templateUrl: './select-zone.component.html',
  styleUrls: ['./select-zone.component.css']
})
export class SelectZoneComponent implements OnInit {

  title = 'cdrsAngular';
  thromdes:Thromde[] =[];
  spatialPlans:SpatialPlan[]=[];

  selectedThromde = 0;
  types:Types[]=[
    {id: 1, name: "Plots" },
    {id: 2, name: "Buildings" },
    {id: 3, name: "Roads" },
    {id: 4, name: "Footpaths" },
    {id: 4, name: "Points" }

  ]

  constructor(
    
    private dataService: DataService
  ) { }
  ngOnInit(): void {
    this.dataService.getThromdes().subscribe(res=>{
      console.log(res)
      this.thromdes = res
    })
  }

  onThromdeSelect(){
    console.log("SELECTING THROMDE")
    console.log(this.selectedThromde)
    this.dataService.getSpatialPlansByThromde(this.selectedThromde).subscribe(res => {
      this.spatialPlans =res
      console.log(res)
      
    })
  }

}
