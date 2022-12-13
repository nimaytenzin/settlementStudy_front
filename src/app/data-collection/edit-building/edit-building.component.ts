import {
  ExistancyStatus,
  AssociativePositions,
  OwnerShipTypes,
  BuildingHeights,
  YesNoOptions,
  BuildingUse,
  AgeOfStructure,
  BuildingStyles,
  StructureType,
  PrimaryStructureMaterials,
  RoofTypes,
  RoofMaterials,
  ToiletTypes,
  ToiletModes,
  ParkingOptions,
  IBuilding,
  IUnit,
} from './../../services/staticData';
import { Router } from '@angular/router';
import { DataService } from './../../services/dataServices';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Content } from '@ngneat/overview';

interface IImage {
  uri: string;
  filename: string;
}

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.css'],
})
export class EditBuildingComponent implements OnInit {
  detailsAdded: boolean = false;
  images = [] as IImage[];

  buildingFeatureId = Number(sessionStorage.getItem('buildingFeatureId'));
  selectedFeatureType = sessionStorage.getItem('featureType');
  //form options
  isLocked: String[] = YesNoOptions;
  existancyStatus: String[] = ExistancyStatus;
  associativePositions: String[] = AssociativePositions;
  ownershipTypes: String[] = OwnerShipTypes;
  floors: String[] = BuildingHeights;
  jamthogOptions: String[] = YesNoOptions;
  basementOptions: String[] = YesNoOptions;
  buildingUses: String[] = BuildingUse;
  ageOptions: String[] = AgeOfStructure;
  renovationOptions: String[] = YesNoOptions;
  buildingStyles: String[] = BuildingStyles;
  structureTypes: String[] = StructureType;
  materialTypes: String[] = PrimaryStructureMaterials;
  roofTypes: String[] = RoofTypes;
  roofMaterials: String[] = RoofMaterials;
  toiletTypes: String[] = ToiletTypes;
  toiletModes: String[] = ToiletModes;
  yesNoOptions: String[] = YesNoOptions;
  parkingOptions: String[] = ParkingOptions;

  editBuildingForm = new FormGroup({
    isLocked: new FormControl(''),
    existancyStatus: new FormControl(''),
    associativePosition: new FormControl(''),
    ownership: new FormControl(''),
    floors: new FormControl(''),
    jamthog: new FormControl(''),
    basement: new FormControl(''),
    use: new FormControl(''),
    age: new FormControl(''),
    rennovation: new FormControl(''),
    rennovationRemarks: new FormControl(''),
    style: new FormControl(''),
    type: new FormControl(''),
    material: new FormControl(''),
    roofType: new FormControl(''),
    roofMaterial: new FormControl(''),
    toiletMode: new FormControl(''),
    toiletType: new FormControl(''),
    roadAccess: new FormControl(''),
    parking: new FormControl(''),
    remarks: new FormControl(''),
  });

  buildingDetails = {
    rennovationRemarks: 'NA',
    remarks: 'NA',
  } as IBuilding;

  units = [] as IUnit[];

  constructor(
    private dataService: DataService,
    private router: Router,
    private toastService: HotToastService
  ) {}

  ngOnInit(): void {
    this.fetchDataIfExists();
    this.getImages();
    sessionStorage.removeItem('plotFeatureId');
    this.getUnits();
  }

  fetchDataIfExists() {
    this.dataService
      .findBuildngByFeatureId(this.buildingFeatureId)
      .subscribe((res) => {
        if (res) {
          this.toastService.success('Data Loaded');
          console.log(res);
          this.detailsAdded = true;
          let data: IBuilding = res;
          // this.editBuildingForm.patchValue({
          //   isLocked: data.isLocked,
          //   existancyStatus: data.existancyStatus,
          //   associativePosition: data.associativePosition,
          //   ownership: data.ownership,
          //   floors: data.floors,
          //   jamthog: data.jamthog,
          //   basement: data.basement,
          //   use: data.use,
          //   age: data.age,
          //   rennovation: data.rennovation,
          //   rennovationRemarks: data.rennovationRemarks,
          //   style: data.style,
          //   type: data.type,
          //   material: data.material,
          //   roofType: data.roofType,
          //   roofMaterial: data.roofMaterial,
          //   toiletMode: data.toiletMode,
          //   toiletType: data.toiletType,
          //   roadAccess: data.roadAccess,
          //   parking: data.parking,
          //   remarks: data.remarks,
          // });

          this.editBuildingForm.patchValue({
            ...data,
          });
        }
      });
  }

  goBackToMap() {
    this.router.navigate(['map']);
  }

  getImages() {
    this.dataService
      .GetBuildingImages(this.buildingFeatureId)
      .subscribe((res) => {
        console.log(res);
        if (res) {
          this.images = res;
        }
      });
  }
  getUnits() {
    this.dataService
      .GetAllUnitsByBuilding(this.buildingFeatureId)
      .subscribe((res) => {
        if (res) {
          this.units = res;
        }
      });
  }

  saveData() {
    this.buildingDetails.buildingFeatureId = this.buildingFeatureId;
    this.buildingDetails.isLocked = this.getFormValue('isLocked');
    this.buildingDetails.existancyStatus = this.getFormValue('existancyStatus');
    this.buildingDetails.associativePosition = this.getFormValue(
      'associativePosition'
    );
    this.buildingDetails.ownership = this.getFormValue('ownership');
    this.buildingDetails.floors = this.getFormValue('floors');
    this.buildingDetails.jamthog = this.getFormValue('jamthog');
    this.buildingDetails.basement = this.getFormValue('basement');
    this.buildingDetails.use = this.getFormValue('use');
    this.buildingDetails.age = this.getFormValue('age');
    this.buildingDetails.rennovation = this.getFormValue('rennovation');
    this.buildingDetails.rennovationRemarks =
      this.getFormValue('rennovationRemarks');
    this.buildingDetails.style = this.getFormValue('style');
    this.buildingDetails.type = this.getFormValue('type');
    this.buildingDetails.material = this.getFormValue('material');
    this.buildingDetails.roofType = this.getFormValue('roofType');
    this.buildingDetails.roofMaterial = this.getFormValue('roofMaterial');
    this.buildingDetails.toiletMode = this.getFormValue('toiletMode');
    this.buildingDetails.toiletType = this.getFormValue('toiletType');
    this.buildingDetails.roadAccess = this.getFormValue('roadAccess');
    this.buildingDetails.parking = this.getFormValue('parking');
    this.buildingDetails.remarks = this.getFormValue('remarks');

    console.log(this.buildingDetails);
    if (this.detailsAdded) {
      this.dataService
        .updateBuildingDetails(this.buildingFeatureId, this.buildingDetails)
        .pipe(
          this.toastService.observe({
            loading: 'Updating',
            success: 'Updated',
            error: 'Opps Error chi',
          })
        )
        .subscribe((res) => {
          if (res) {
            this.toastService.success('Added Building Updated');
            this.detailsAdded = true;
          }
        });
    } else {
      this.dataService
        .CreateBuilding(this.buildingDetails)
        .pipe(
          this.toastService.observe({
            loading: 'Saving',
            success: 'Saved',
            error: 'Opps Error chi',
          })
        )
        .subscribe((res) => {
          if (res) {
            this.toastService.success('Added Building Details');
            this.detailsAdded = true;
            this.dataService
              .MarkBuildingShapeAsComplete(this.buildingFeatureId)
              .subscribe((res) => {
                this.throwMotivationalMessage();
              });
          }
        });
    }
    //updare data or post data
  }
  throwMotivationalMessage() {
    const motivationalMessages: Content[] = [
      'You are the Best',
      'GoodJob 👏',
      'Dra dra Anay Bay bay go ! la zay mi di',
      'Keep going ! ',
      'CDRD loves you ❤️ ',
    ];
    var rand =
      motivationalMessages[(Math.random() * motivationalMessages.length) | 0];
    this.toastService.show(rand, { duration: 5000 });
  }

  getFormValue(controlName: string) {
    return this.editBuildingForm.get(controlName)?.value!;
  }
  takePhoto() {
    this.router.navigate(['camera']);
  }
  addUnit() {
    sessionStorage.setItem('buildingFeatureId', String(this.buildingFeatureId));
    this.router.navigate(['addUnit']);
  }
  editUnit(unit: any) {
    console.log('DOUBEL CLICK');
    sessionStorage.setItem('buildingFeatureId', String(this.buildingFeatureId));
    this.router.navigate(['editUnit', unit.id]);
  }
}
