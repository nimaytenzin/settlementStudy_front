import { DataService } from './../../services/dataServices';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  googleSatUrl = "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}";
  cartoPositronUrl = "https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png";
  map!: L.Map;
  plotMap = {} as L.GeoJSON;
  selectedFeature ={}

  selectedSpatialPlanId = Number(sessionStorage.getItem('selectedSpatialPlanId'))

  ngOnInit(): void {
    this.renderMap()
    this.fetchGeojson()

    console.log("SELECTED SPATIAL PLAN",this.selectedSpatialPlanId)
  
  }


  renderMap() {
    var cartoMap = L.tileLayer(this.cartoPositronUrl);
    var satelliteMap = L.tileLayer(this.googleSatUrl);

    this.map = L.map('map', {
      zoomControl: false,
      layers: [cartoMap],
      attributionControl:false,
      renderer: L.canvas({ tolerance: 3 })
    }).setView([27.4712, 89.64191,], 13);
  }

  fetchGeojson() {
    var highlight = {
      'fillColor': 'yellow',
      'weight': 2,
      'opacity': 1
    };

    let lap_id = 6

    function highlightFeature(e: any) {
      var layer = e.target;

     

    }

    function resetHighlight(e: any) {
      var layer = e.target;
      layer.setStyle({
        weight: 0.5,
        opacity: 1,
        color: "black",
        fillOpacity: .5
      });
    }

   


    this.dataService.getPlotsByPlan(this.selectedSpatialPlanId).subscribe(res => {
    
      this.plotMap = L.geoJSON(res, {
        style: function (feature) {
          return {
            fillColor: feature?.properties.done === 'true' ? 'red' : 'green',
            weight: 0.5,
            opacity: 1,
            color: "black",
            fillOpacity: .5
          };
        },
        onEachFeature: (feature, layer) => {
          layer.on({
            mouseover: (e)=>{
              e.target.setStyle({
                weight: 2,
                color: 'yellow',
              });
            },
            mouseout: resetHighlight,
            'click':(e)=>{
              this.map.fitBounds(e.target.getBounds())
              this.selectedFeature = e.target.feature.properties
              console.log(e.target.feature.properties)
            },
            'dblclick':(e)=>{
              console.log("Double Click enter to view details")
              console.log(e)
              
            }
          });
        }
      })



      this.map.addLayer(this.plotMap)
      this.map.fitBounds(this.plotMap.getBounds())

    })



  }







}

