import { MapViewComponent } from './data-collection/map-view/map-view.component';
import { SelectZoneComponent } from './data-collection/select-zone/select-zone.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: SelectZoneComponent},
  {path: 'map', component: MapViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
