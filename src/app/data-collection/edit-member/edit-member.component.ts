import {
  EducationLevels,
  IMember,
  TravelModes,
} from './../../services/staticData';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/dataServices';
import { Genders, Occupations } from 'src/app/services/staticData';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css'],
})
export class EditMemberComponent implements OnInit {
  unitId: any;
  householdId: any;
  buildingFeatureId = Number(sessionStorage.getItem('buildingFeatureId'));
  memberId: any;

  genders: String[] = Genders;
  occupations: String[] = Occupations;
  educationLevels: String[] = EducationLevels;
  travelModes: String[] = TravelModes;

  memberDetails = {} as IMember;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: HotToastService
  ) {}

  editMemberForm = new FormGroup({
    unitId: new FormControl(),
    householdId: new FormControl(),
    name: new FormControl(),
    age: new FormControl(),
    gender: new FormControl(),
    occupation: new FormControl(),
    educationLevel: new FormControl(),
    workplace: new FormControl(),
    travelMode: new FormControl(),
  });

  ngOnInit(): void {
    this.unitId = Number(this.route.snapshot.paramMap.get('unitId'));
    this.householdId = Number(this.route.snapshot.paramMap.get('householdId'));
    this.memberId = Number(this.route.snapshot.paramMap.get('memberId'));
    this.fetchData();
  }

  fetchData() {
    this.dataService.GetMemberDetails(this.memberId).subscribe((res) => {
      if (res) {
        let data: IMember = res;
        this.editMemberForm.patchValue({ ...data });
      }
    });
  }
  save() {
    this.memberDetails.unitId = this.unitId;
    this.memberDetails.householdId = this.householdId;
    this.memberDetails.name = this.getFormValue('name');
    this.memberDetails.age = this.getFormValue('age');
    this.memberDetails.gender = this.getFormValue('gender');
    this.memberDetails.occupation = this.getFormValue('occupation');
    this.memberDetails.educationLevel = this.getFormValue('educationLevel');
    this.memberDetails.travelMode = this.getFormValue('travelMode');
    this.memberDetails.workplace = this.getFormValue('workplace');

    this.dataService
      .UpdateMemberDetails(this.memberId, this.memberDetails)
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
    return this.editMemberForm.get(controlName)?.value!;
  }

  backToHouseHold() {
    this.router.navigate(['editHousehold', this.unitId, this.householdId]);
  }
}
