import {
  UnitUses,
  YesNoOptions,
  UnitOwnershipTypes,
  BusinessType,
  BusinessTurnOvers,
  IUnit,
  IHousehold,
} from './../../services/staticData';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/dataServices';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.css'],
})
export class EditUnitComponent implements OnInit {
  buildingFeatureId: number = Number(
    sessionStorage.getItem('buildingFeatureId')
  );
  detailsAdded: boolean = false;
  isLocked: boolean = false;
  unitDetails = {} as IUnit;
  unitId: any;

  unitUse: String = '';
  bedRooms: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  editUnitForm = new FormGroup({
    isLocked: new FormControl(),
    number: new FormControl(),
    floorLevel: new FormControl(),
    bedrooms: new FormControl(),
    use: new FormControl(),
    ownership: new FormControl(),
    rent: new FormControl(),

    businessName: new FormControl(),
    businessType: new FormControl(),
    businessTurnover: new FormControl(),
    businessContact: new FormControl(),

    institutionName: new FormControl(),
    institutionEstablishmentYear: new FormControl(),
    institutionStaffs: new FormControl(),
    institutionStudents: new FormControl(),
    institutionContact: new FormControl(),

    religiousInstitionName: new FormControl(),
    religiousInstituionEstablishmentYear: new FormControl(),
    religiousInstitutionMonks: new FormControl(),
    religiousInstitutionLopons: new FormControl(),
    religiousInstitutionContact: new FormControl(),

    officeName: new FormControl(),
    officeType: new FormControl(),
    officeEstablishmentYear: new FormControl(),
    officeContact: new FormControl(),

    remarks: new FormControl(),
  });

  isLockedOptions: String[] = YesNoOptions;
  floorLevels: String[] = ['B', 'G', '1', '2', '3', '4', '5', '6', 'A'];
  unitUses: String[] = UnitUses;
  ownershipTypes: String[] = UnitOwnershipTypes;
  unitNumbers: String[] = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
  ];
  businessTypes: String[] = BusinessType;
  businessTurnovers: String[] = BusinessTurnOvers;

  households: any[] = [];
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: HotToastService
  ) {}

  ngOnInit(): void {
    this.unitId = this.route.snapshot.paramMap.get('unitId');
    this.fetchDataIfExists();
    this.fetchHouseholds();
  }
  fetchDataIfExists() {
    this.dataService.GetUnitDetails(this.unitId).subscribe((res) => {
      if (res) {
        let data: IUnit = res;
        this.unitUse = data.use!;
        this.editUnitForm.patchValue({ ...data });
      }
    });
  }

  fetchHouseholds() {
    this.dataService.GetAllHouseholdsByUnit(this.unitId).subscribe((res) => {
      if (res) {
        this.households = res;
      }
    });
  }

  onIsLockedSelect(target: any) {
    if (target.value === 'Yes') {
      this.isLocked = true;
    } else {
      this.isLocked = false;
    }
  }
  onUnitUseChange(target: any) {
    this.unitUse = target.value;
  }

  saveData() {
    this.unitDetails.buildingFeatureId = Number(this.buildingFeatureId);
    this.unitDetails.isLocked = this.getFormValue('isLocked');
    this.unitDetails.number = this.getFormValue('number');
    this.unitDetails.floorLevel = this.getFormValue('floorLevel');
    this.unitDetails.bedrooms = this.getFormValue('bedrooms');
    this.unitDetails.use = this.getFormValue('use');
    this.unitDetails.ownership = this.getFormValue('ownership');
    this.unitDetails.rent = this.getFormValue('rent');

    this.unitDetails.businessName = this.getFormValue('businessName');
    this.unitDetails.businessType = this.getFormValue('businessType');
    this.unitDetails.businessTurnover = this.getFormValue('businessTurnover');
    this.unitDetails.businessContact = this.getFormValue('businessContact');

    this.unitDetails.institutionName = this.getFormValue('institutionName');
    this.unitDetails.institutionEstablishmentYear = this.getFormValue(
      'institutionEstablishmentYear'
    );
    this.unitDetails.institutionStaffs = this.getFormValue('institutionStaffs');
    this.unitDetails.institutionStudents = this.getFormValue(
      'institutionStudents'
    );
    this.unitDetails.institutionContact =
      this.getFormValue('institutionContact');

    this.unitDetails.religiousInstitionName = this.getFormValue(
      'religiousInstitionName'
    );
    this.unitDetails.religiousInstituionEstablishmentYear = this.getFormValue(
      'religiousInstituionEstablishmentYear'
    );
    this.unitDetails.religiousInstitutionLopons = this.getFormValue(
      'religiousInstitutionMonks'
    );
    this.unitDetails.religiousInstitutionLopons = this.getFormValue(
      'religiousInstitutionLopons'
    );
    this.unitDetails.religiousInstitutionContact = this.getFormValue(
      'religiousInstitutionContact'
    );

    this.unitDetails.officeName = this.getFormValue('officeName');
    this.unitDetails.officeType = this.getFormValue('officeType');
    this.unitDetails.officeEstablishmentYear = this.getFormValue(
      'officeEstablishmentYear'
    );
    this.unitDetails.officeContact = this.getFormValue('officeContact');

    this.unitDetails.remarks = this.getFormValue('remarks');

    this.dataService
      .UpdateUnitDetails(this.unitId, this.unitDetails)
      .pipe(
        this.toastService.observe({
          loading: 'Updating',
          success: 'Updated',
          error: 'Opps Error chi',
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  getFormValue(controlName: string) {
    return this.editUnitForm.get(controlName)?.value!;
  }
  backToBuilding() {
    this.router.navigate(['editBuilding']);
  }
  addHousehold() {
    this.router.navigate(['addHousehold', this.unitId]);
  }
  editHousehold(household: any) {
    this.router.navigate(['editHousehold', this.unitId, household.id]);
  }
}
