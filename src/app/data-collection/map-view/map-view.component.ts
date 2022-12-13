import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from './../../services/dataServices';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HotToastService } from '@ngneat/hot-toast';

interface ITypes {
  id: number;
  name: string;
}
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
    private http: HttpClient,
    private toastService: HotToastService
  ) {}

  googleSatUrl = 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}';
  cartoPositronUrl =
    'https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png';
  map!: L.Map;
  plotMap = {} as L.GeoJSON;

  buildingMap = {} as L.GeoJSON;

  latitude!: number;
  longitude!: number;
  accuracy!: number;

  dataLoaded: boolean = false;
  selectedFeature = {};

  types = ['Plots', 'Buildings'];
  featureTypeSelected = sessionStorage.getItem('featureType');

  ngOnInit(): void {
    this.renderMap();
    this.fetchGeojson();
  }

  renderMap() {
    var satelliteMap = L.tileLayer(this.googleSatUrl);
    this.map = L.map('map', {
      zoomControl: false,
      layers: [satelliteMap],
      attributionControl: false,
      renderer: L.canvas({ tolerance: 3 }),
    }).setView([27.4712, 89.64191], 13);
  }
  fetchGeojson() {
    const featureTypeSelected = sessionStorage.getItem('featureType');
    if (featureTypeSelected === 'Plots') {
      this.fetchPlotsGeojson();
    }
    if (featureTypeSelected === 'Buildings') {
      this.fetchBuildingGeojson();
    }
  }

  resetHighlight(e: any) {
    var layer = e.target;
    layer.setStyle({
      weight: 0.5,
      opacity: 1,
      color: 'black',
      fillOpacity: 0.5,
    });
  }

  fetchPlotsGeojson() {
    this.dataService
      .getPlotsShapefile()
      .pipe(
        this.toastService.observe({
          loading: 'Loading Shapefiles all the way from DHS office la',
          success: 'Loaded',
          error: 'Opps',
        })
      )
      .subscribe((res: any) => {
        this.dataLoaded = true;
        let geojson = res[0][0].jsonb_build_object;
        this.plotMap = L.geoJSON(geojson, {
          style: function (feature) {
            return {
              fillColor:
                feature?.properties.isCompleted === 'true' ? 'green' : 'red',
              weight: 0.5,
              opacity: 1,
              color: 'black',
              fillOpacity: 0.5,
            };
          },
          onEachFeature: (feature, layer) => {
            layer.on({
              mouseover: (e) => {
                e.target.setStyle({
                  weight: 2,
                  color: 'yellow',
                });
              },
              mouseout: this.resetHighlight,
              click: (e) => {
                this.map.fitBounds(e.target.getBounds());
                this.selectedFeature = e.target.feature.properties;
                sessionStorage.setItem(
                  'plotFeatureId',
                  e.target.feature.properties.plotFeatureId
                );
                sessionStorage.setItem(
                  'featureProperties',
                  JSON.stringify(e.target.feature.properties)
                );
              },
            });
          },
        });
        this.map.addLayer(this.plotMap);
        this.map.fitBounds(this.plotMap.getBounds());
      });
  }

  fetchBuildingGeojson() {}

  onFeatureTypeChange(event: any) {
    sessionStorage.setItem('featureType', event.target.value);
    window.location.reload();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      const iconRetinaUrl = 'assets/mymarker.png';
      const iconUrl = 'assets/mymarker.png';

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;
          this.accuracy = position.coords.accuracy;

          L.circle([this.latitude, this.longitude], { radius: 20 }).addTo(
            this.map
          );
          this.map.flyTo([this.latitude, this.longitude], 19);
        },
        (err) => {},
        options
      );
    }
  }

  goToEdit() {
    if (this.featureTypeSelected === 'Plots') {
      this.router.navigate(['editPlot']);
    }

    if (this.featureTypeSelected === 'Buildings') {
    }
  }
}
