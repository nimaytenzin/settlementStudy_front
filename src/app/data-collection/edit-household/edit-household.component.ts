import { FormControl, FormGroup } from '@angular/forms';
import { IHousehold, YesNoOptions } from './../../services/staticData';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/dataServices';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-edit-household',
  templateUrl: './edit-household.component.html',
  styleUrls: ['./edit-household.component.css'],
})
export class EditHouseholdComponent implements OnInit {
  unitId: any;
  householdId: any;
  buildingFeatureId: number = Number(
    sessionStorage.getItem('buildingFeatureId')
  );
  householdDetails = {} as IHousehold;

  addHouseholdForm = new FormGroup({
    buildingFeatureId: new FormControl(),
    unitId: new FormControl(),

    zhisar: new FormControl(),
    zhisarFrom: new FormControl(),

    membersStayingOut: new FormControl(),
    membersStayingIn: new FormControl(),
    khimsaAcres: new FormControl(),
    kamzhingAcres: new FormControl(),
    chhuzhingAcres: new FormControl(),
    yaks: new FormControl(),
    cows: new FormControl(),
    horses: new FormControl(),
    poultry: new FormControl(),
    vehicles: new FormControl(),

    tv: new FormControl(),
    mobile: new FormControl(),
    lpg: new FormControl(),
    electricUtensils: new FormControl(),

    foodCrops: new FormControl(),
    cashCrops: new FormControl(),
    incomeSource: new FormControl(),
    annualIncomeRange: new FormControl(),
  });

  yesNoOptions: String[] = YesNoOptions;
  members: any[] = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: HotToastService
  ) {}

  ngOnInit(): void {
    this.unitId = Number(this.route.snapshot.paramMap.get('unitId'));
    this.householdId = Number(this.route.snapshot.paramMap.get('householdId'));
    this.fetchData();
    this.fetchMembers();
  }

  fetchData() {
    this.dataService.GetHouseholdDetails(this.householdId).subscribe((res) => {
      if (res) {
        let data: IHousehold = res;
        this.addHouseholdForm.patchValue({ ...data });
      }
    });
  }

  fetchMembers() {
    this.dataService
      .GetAllMemberByHousehold(this.householdId)
      .subscribe((res) => {
        if (res) {
          this.members = res;
        }
      });
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

    this.dataService
      .UpdateHouseholdDetails(this.householdId, this.householdDetails)
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
    return this.addHouseholdForm.get(controlName)?.value!;
  }

  backToUnit() {
    this.router.navigate(['editUnit', this.unitId]);
  }

  addMember() {
    this.router.navigate(['addMember', this.unitId, this.householdId]);
  }

  editMember(member: any) {
    this.router.navigate([
      'editMember',
      this.unitId,
      this.householdId,
      member.id,
    ]);
  }
}
