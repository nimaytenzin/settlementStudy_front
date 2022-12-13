import { FormControl, FormGroup } from '@angular/forms';
import { IHousehold, YesNoOptions } from './../../services/staticData';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/dataServices';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-add-household',
  templateUrl: './add-household.component.html',
  styleUrls: ['./add-household.component.css'],
})
export class AddHouseholdComponent implements OnInit {
  unitId: any;
  buildingFeatureId: number = Number(
    sessionStorage.getItem('buildingFeatureId')
  );
  householdDetails = {} as IHousehold;

  addHouseholdForm = new FormGroup({
    buildingFeatureId: new FormControl(''),
    unitId: new FormControl(''),

    zhisar: new FormControl(''),
    zhisarFrom: new FormControl(''),

    membersStayingOut: new FormControl(''),
    membersStayingIn: new FormControl(''),
    khimsaAcres: new FormControl(''),
    kamzhingAcres: new FormControl(''),
    chhuzhingAcres: new FormControl(''),
    yaks: new FormControl(''),
    cows: new FormControl(''),
    horses: new FormControl(''),
    poultry: new FormControl(''),
    vehicles: new FormControl(''),

    tv: new FormControl(''),
    mobile: new FormControl(''),
    lpg: new FormControl(''),
    electricUtensils: new FormControl(''),

    foodCrops: new FormControl(''),
    cashCrops: new FormControl(''),
    incomeSource: new FormControl(''),
    annualIncomeRange: new FormControl(''),
  });

  yesNoOptions: String[] = YesNoOptions;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: HotToastService
  ) {}

  ngOnInit(): void {
    this.unitId = Number(this.route.snapshot.paramMap.get('unitId'));
  }

  saveData() {
    this.householdDetails.buildingFeatureId = this.buildingFeatureId;
    this.householdDetails.unitId = this.unitId;
    this.householdDetails.zhisar = this.getFormValue('zhisar');
    this.householdDetails.zhisarFrom = this.getFormValue('zhisarFrom');
    this.householdDetails.membersStayingIn =
      this.getFormValue('membersStayingIn');
    this.householdDetails.membersStayingOut =
      this.getFormValue('membersStayingOut');
    this.householdDetails.khimsaAcres = this.getFormValue('khimsaAcres');
    this.householdDetails.kamzhingAcres = this.getFormValue('kamzhingAcres');
    this.householdDetails.chhuzhingAcres = this.getFormValue('chhuzhingAcres');
    this.householdDetails.yaks = this.getFormValue('yaks');
    this.householdDetails.cows = this.getFormValue('cows');
    this.householdDetails.horses = this.getFormValue('horses');
    this.householdDetails.poultry = this.getFormValue('poultry');
    this.householdDetails.vehicles = this.getFormValue('vehicles');
    this.householdDetails.tv = this.getFormValue('tv');
    this.householdDetails.mobile = this.getFormValue('mobile');
    this.householdDetails.lpg = this.getFormValue('lpg');
    this.householdDetails.electricUtensils =
      this.getFormValue('electricUtensils');
    this.householdDetails.foodCrops = this.getFormValue('foodCrops');
    this.householdDetails.cashCrops = this.getFormValue('cashCrops');
    this.householdDetails.incomeSource = this.getFormValue('incomeSource');
    this.householdDetails.annualIncomeRange =
      this.getFormValue('annualIncomeRange');

    console.log(this.householdDetails);
    this.dataService
      .CreateHousehold(this.householdDetails)
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
    return this.addHouseholdForm.get(controlName)?.value!;
  }

  backToUnit() {
    this.router.navigate(['editUnit', this.unitId]);
  }
}
