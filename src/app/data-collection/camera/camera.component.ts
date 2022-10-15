import { DataService } from './../../services/dataServices';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) { }



  ngOnInit(): void {

  }



  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let jsonObject = {
        "fid": 3,
        "ftype": "Plot",
        "uri": reader.result
      }
      this.dataService.uploadImage(jsonObject).subscribe(response => {
        console.log(response)
      })

    };
  }

}
