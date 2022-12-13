import { DataService } from './../../services/dataServices';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private location: Location,
    private toastService: HotToastService
  ) {}

  fileUploaded = false;
  fid = 0;
  featureTypeSelected = sessionStorage.getItem('featureType');
  fileName = '';
  plotFeatureId: number = Number(sessionStorage.getItem('plotFeatureId'));
  buildingFeatureId: number = Number(
    sessionStorage.getItem('buildingFeatureId')
  );

  ngOnInit(): void {}

  handleUpload(event: any) {
    const file = event.target.files[0];

    let formData = new FormData();
    formData.append('file', file);

    if (this.featureTypeSelected === 'Plots') {
      this.dataService
        .uploadPlotImage(formData, this.plotFeatureId)
        .pipe(
          this.toastService.observe({
            loading: 'Uploading! Atsi gu zhu na',
            success: 'Ya tupchi',
            error: 'Error',
          })
        )
        .subscribe((res) => {
          if (res) {
            this.fileUploaded = true;
          }
        });
    }
  }

  goBack() {
    this.location.back();
  }
}
