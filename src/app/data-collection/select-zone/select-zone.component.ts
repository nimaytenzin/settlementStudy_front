import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dataServices';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

interface ITypes {
  id: number;
  name: string;
}

@Component({
  selector: 'app-select-zone',
  templateUrl: './select-zone.component.html',
  styleUrls: ['./select-zone.component.css'],
})
export class SelectZoneComponent implements OnInit {
  constructor(
    private router: Router,
    private dataService: DataService,
    private fb: FormBuilder
  ) {}

  title = 'cdrsAngular';
  settlements: String[] = ['Uesuna', 'Tshangkha'];

  selectedThromde = 0;

  types: ITypes[] = [
    { id: 1, name: 'Plots' },
    { id: 2, name: 'Buildings' },
  ];
  //forms
  selectSettlementForm = new FormGroup({
    selectedSettlement: new FormControl(''),
    featureType: new FormControl(''),
  });

  ngOnInit(): void {}

  goToMapView() {
    let selectedSettlement =
      this.selectSettlementForm.get('selectedSettlement')?.value;
    let selectedFeatureType =
      this.selectSettlementForm.get('featureType')?.value;
    if (!selectedSettlement) {
      alert('Please select a Spatial Plan');
      return;
    }
    if (!selectedFeatureType) {
      alert('Please select a Feature Type');
      return;
    }
    sessionStorage.setItem('selectedSettlement', String(selectedSettlement));
    sessionStorage.setItem('featureType', String(selectedFeatureType));
    this.router.navigate(['map']);
  }
}
