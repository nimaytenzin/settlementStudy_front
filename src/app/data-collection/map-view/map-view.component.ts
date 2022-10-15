import { Router } from '@angular/router';
import { DataService } from './../../services/dataServices';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  googleSatUrl = "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}";
  cartoPositronUrl = "https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png";
  map!: L.Map;
  plotMap = {} as L.GeoJSON;
  roadMap = {} as L.GeoJSON;
  buildingMap = {} as L.GeoJSON;

  selectedFeature = {}

  selectedSpatialPlanId = Number(sessionStorage.getItem('selectedSpatialPlanId'))

  ngOnInit(): void {
    this.renderMap()
    this.fetchGeojson()
  }


  renderMap() {
    var cartoMap = L.tileLayer(this.cartoPositronUrl);
    var satelliteMap = L.tileLayer(this.googleSatUrl);

    this.map = L.map('map', {
      zoomControl: false,
      layers: [cartoMap],
      attributionControl: false,
      renderer: L.canvas({ tolerance: 3 })
    }).setView([27.4712, 89.64191,], 13);
  }



  fetchGeojson () {
    const featureTypeSelected = sessionStorage.getItem("featureType");
    if(featureTypeSelected === "Plots"){this.fetchPlotsGeojson()};
    if(featureTypeSelected === "Roads"){this.fetchRoadsGeojson()};
    if(featureTypeSelected === "Buildings"){this.fetchBuildingGeojson()};
  }

  resetHighlight(e: any) {
    var layer = e.target;
    layer.setStyle({
      weight: 0.5,
      opacity: 1,
      color: "black",
      fillOpacity: .5
    });
  }

   

  fetchPlotsGeojson(){
    this.dataService.getPlotsByPlan(this.selectedSpatialPlanId).subscribe(res => {
      this.plotMap = L.geoJSON(res, {
        style: function (feature) {
          return {
            fillColor: feature?.properties.done === 'true' ? 'green' : 'red',
            weight: 0.5,
            opacity: 1,
            color: "black",
            fillOpacity: .5
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
            'click': (e) => {
              this.map.fitBounds(e.target.getBounds())
              this.selectedFeature = e.target.feature.properties

            },
            'dblclick': (e) => {
              console.log("Double Click enter to view details")
              console.log(e)
              sessionStorage.setItem("plotFid", e.target.feature.properties.gid)
              this.router.navigate(['editPlot'])
            }
          });
        }
      })
      this.map.addLayer(this.plotMap)
      this.map.fitBounds(this.plotMap.getBounds())
    })
  }

  fetchRoadsGeojson(){
    this.dataService.getRoadsByPlan(this.selectedSpatialPlanId).subscribe(res => {
      this.plotMap = L.geoJSON(res, {
        style: function (feature) {
          return {
            weight: 1,
            opacity: 1,
            color: feature?.properties.done === 'true' ? 'green' : 'red',
            fillOpacity: .5
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
            'click': (e) => {
              this.map.fitBounds(e.target.getBounds())
              this.selectedFeature = e.target.feature.properties

            },
            'dblclick': (e) => {
              console.log("Double Click enter to view details")
              console.log(e)
              sessionStorage.setItem("roadFid", e.target.feature.properties.gid)
              this.router.navigate(['editRoad'])
            }
          });
        }
      })
      this.map.addLayer(this.plotMap)
      this.map.fitBounds(this.plotMap.getBounds())
    })
  }


  
  fetchBuildingGeojson(){
    this.dataService.getBuildingsByPlan(this.selectedSpatialPlanId).subscribe(res => {
      this.buildingMap = L.geoJSON(res, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            radius : 4,
            fillColor :feature.properties.done ==='true'?'red':'green',
            color : feature.properties.done ==='true'?'red':'green',
            weight : 1,
            opacity : 1,
            fillOpacity : 1
        });
      },
      onEachFeature:  (feature, layer) => {
        layer.on('click',(e) => {
         sessionStorage.setItem('buildingFid', feature.properties.structure_)
         this.router.navigate(['editBuilding'])
        });
      }, 
      })

      this.map.addLayer(this.buildingMap)
      this.map.fitBounds(this.buildingMap.getBounds())
    }) 
  }








}

