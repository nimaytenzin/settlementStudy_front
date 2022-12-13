import { Router } from '@angular/router';
import {
  UnitUses,
  YesNoOptions,
  UnitOwnershipTypes,
  BusinessType,
  BusinessTurnOvers,
  IUnit,
} from './../../services/staticData';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/dataServices';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css'],
})
export class AddUnitComponent implements OnInit {
  buildingFeatureId: number = Number(
    sessionStorage.getItem('buildingFeatureId')
  );
  isLocked: boolean = false;
  unitDetails = {} as IUnit;

  unitUse: String = '';
  bedRooms: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  addUnitForm = new FormGroup({
    isLocked: new FormControl(''),
    number: new FormControl(null),
    floorLevel: new FormControl(null),
    bedrooms: new FormControl(null),
    use: new FormControl(null),
    ownership: new FormControl(null),
    rent: new FormControl(null),

    businessName: new FormControl(null),
    businessType: new FormControl(null),
    businessTurnover: new FormControl(null),
    businessContact: new FormControl(null),

    institutionName: new FormControl(null),
    institutionEstablishmentYear: new FormControl(null),
    institutionStaffs: new FormControl(null),
    institutionStudents: new FormControl(null),
    institutionContact: new FormControl(null),

    religiousInstitionName: new FormControl(null),
    religiousInstituionEstablishmentYear: new FormControl(null),
    religiousInstitutionMonks: new FormControl(null),
    religiousInstitutionLopons: new FormControl(null),
    religiousInstitutionContact: new FormControl(null),

    officeName: new FormControl(null),
    officeType: new FormControl(null),
    officeEstablishmentYear: new FormControl(null),
    officeContact: new FormControl(null),

    remarks: new FormControl(null),
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

  constructor(
    private dataService: DataService,
    private router: Router,
    private toastService: HotToastService
  ) {}

  ngOnInit(): void {}

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
    this.unitDetails.businessContact = this.getFormValue('usinessContact');

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

    console.log(this.unitDetails);
    this.dataService
      .CreateUnit(this.unitDetails)
      .pipe(
        this.toastService.observe({
          loading: 'Saving',
          success: 'Saved',
          error: 'Opps Error chi',
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  getFormValue(controlName: string) {
    return this.addUnitForm.get(controlName)?.value!;
  }

  backToBuilding() {
    this.router.navigate(['editBuilding']);
  }
}
