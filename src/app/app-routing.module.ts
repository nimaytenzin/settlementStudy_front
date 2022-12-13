import { EditHouseholdComponent } from './data-collection/edit-household/edit-household.component';
import { AddMemberComponent } from './data-collection/add-member/add-member.component';
import { AddHouseholdComponent } from './data-collection/add-household/add-household.component';
import { AddUnitComponent } from './data-collection/add-unit/add-unit.component';
import { EditUnitComponent } from './data-collection/edit-unit/edit-unit.component';
import { EditBuildingComponent } from './data-collection/edit-building/edit-building.component';
import { CameraComponent } from './data-collection/camera/camera.component';
import { EditPlotComponent } from './data-collection/edit-plot/edit-plot.component';
import { MapViewComponent } from './data-collection/map-view/map-view.component';
import { SelectZoneComponent } from './data-collection/select-zone/select-zone.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditMemberComponent } from './data-collection/edit-member/edit-member.component';

const routes: Routes = [
  { path: '', component: SelectZoneComponent },
  { path: 'map', component: MapViewComponent },
  { path: 'editPlot', component: EditPlotComponent },
  { path: 'camera', component: CameraComponent },
  { path: 'editBuilding', component: EditBuildingComponent },
  { path: 'editUnit/:unitId', component: EditUnitComponent },
  { path: 'addUnit', component: AddUnitComponent },

  { path: 'addHousehold/:unitId', component: AddHouseholdComponent },
  {
    path: 'editHousehold/:unitId/:householdId',
    component: EditHouseholdComponent,
  },

  { path: 'addMember/:unitId/:householdId', component: AddMemberComponent },
  {
    path: 'editMember/:unitId/:householdId/:memberId',
    component: EditMemberComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
