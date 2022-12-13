import { DataService, IPlot } from './../../services/dataServices';
import { DevelopmentStatuses, PlotUses } from './../../services/staticData';
import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef, Type } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

type Content = string | TemplateRef<any> | Type<any>;

interface IImage {
  uri: string;
  filename: string;
}

@Component({
  selector: 'app-edit-plot',
  templateUrl: './edit-plot.component.html',
  styleUrls: ['./edit-plot.component.css'],
})
export class EditPlotComponent implements OnInit {
  constructor(
    private router: Router,
    private dataService: DataService,
    private toastService: HotToastService
  ) {}

  plotFeatureId: number = Number(sessionStorage.getItem('plotFeatureId'));
  selectedFeatureType = sessionStorage.getItem('featureType');

  developmentstatuses: String[] = DevelopmentStatuses;
  plotUses: String[] = PlotUses;

  plotFeatureProperty = JSON.parse(
    sessionStorage.getItem('featureProperties')!
  );

  motivationalMessages: Content[] = [
    'You are the Best',
    'GoodJob 👏',
    'Dra dra Anay Bay bay go ! la zay mi di',
    'Keep going ! ',
    'CDRD loves you ❤️ ',
  ];

  detailsAdded: boolean = false;

  editPlotForm = new FormGroup({
    developmentStatus: new FormControl(''),
    use: new FormControl(''),
    remarks: new FormControl(''),
  });

  images = [] as IImage[];

  plotDetails = {} as IPlot;

  ngOnInit(): void {
    this.fetchDataIfExists();
    this.getImages();
  }

  fetchDataIfExists() {
    this.dataService.findAPlotByPlotId(this.plotFeatureId).subscribe((res) => {
      if (res) {
        this.toastService.success('Plot Details Loaded', { duration: 800 });
        this.detailsAdded = true;
        this.editPlotForm.patchValue({
          developmentStatus: res.developmentStatus,
          use: res.use,
          remarks: res.remarks,
        });
      } else {
        this.detailsAdded = false;
      }
    });
  }

  goBackToMap() {
    this.router.navigate(['map']);
  }

  getImages() {
    this.dataService.getPlotImages(this.plotFeatureId).subscribe((res) => {
      this.images = res;
      console.log(this.images);
    });
  }

  saveData() {
    this.plotDetails.plotFeatureId = this.plotFeatureId;
    this.plotDetails.developmentStatus =
      this.editPlotForm.get('developmentStatus')?.value!;
    this.plotDetails.use = this.editPlotForm.get('use')?.value!;
    this.plotDetails.remarks = this.editPlotForm.get('remarks')?.value!;
    if (this.detailsAdded) {
      this.dataService
        .updatePlotDetails(this.plotFeatureId, this.plotDetails)
        .pipe(
          this.toastService.observe({
            loading: 'Updating',
            success: 'Updated',
            error: 'Opps Error chi',
          })
        )
        .subscribe((res) => {
          this.toastService.success('Plot Details Updated', { duration: 800 });
        });
    } else {
      this.dataService.postPlotDetails(this.plotDetails).subscribe((res) => {
        if (res) {
          this.toastService.success('Plot Details Added', { duration: 800 });
          this.throwMotivationalMessage();
          this.detailsAdded = true;
          this.dataService
            .markPlotAsDone(this.plotFeatureId, {})
            .subscribe((resp) => {
              if (resp) {
              }
            });
        }
      });
    }
  }
  takePhoto() {
    this.router.navigate(['camera']);
  }

  throwMotivationalMessage() {
    var rand =
      this.motivationalMessages[
        (Math.random() * this.motivationalMessages.length) | 0
      ];
    this.toastService.show(rand, { duration: 5000 });
  }
}
