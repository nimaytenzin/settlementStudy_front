import { BuildingHeights, DevelopmentStatuses, PlotUses } from './../../services/staticData';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-edit-plot',
  templateUrl: './edit-plot.component.html',
  styleUrls: ['./edit-plot.component.css']
})
export class EditPlotComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  developmentstatuses:String[] = DevelopmentStatuses
  BuildingHeights:String[] = BuildingHeights
  plotUses:String[] = PlotUses

  ngOnInit(): void {
  }

  goBackToMap(){
    this.router.navigate(['map'])
  }

}
