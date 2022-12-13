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
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
})
export class AddMemberComponent implements OnInit {
  unitId: any;
  householdId: any;
  buildingFeatureId = Number(sessionStorage.getItem('buildingFeatureId'));

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

  addMemberForm = new FormGroup({
    unitId: new FormControl(''),
    householdId: new FormControl(''),
    name: new FormControl(''),
    age: new FormControl(''),
    gender: new FormControl(''),
    occupation: new FormControl(''),
    educationLevel: new FormControl(''),
    workplace: new FormControl(''),
    travelMode: new FormControl(''),
  });

  ngOnInit(): void {
    this.unitId = Number(this.route.snapshot.paramMap.get('unitId'));
    this.householdId = Number(this.route.snapshot.paramMap.get('householdId'));
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
      .CreateMember(this.memberDetails)
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
    return this.addMemberForm.get(controlName)?.value!;
  }

  backToHouseHold() {
    this.router.navigate(['editHousehold', this.unitId, this.householdId]);
  }
}
