import { DataService } from './../../services/dataServices';
import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  constructor(
    private dataService:DataService
  ) { }

  public webcamImage!: WebcamImage;
  
  ngOnInit(): void {
  }
  uploadImg(){
    if(this.webcamImage){
      let jsonObject = {
        "fid":2,
        "ftype":"Plot",
        "uri":this.webcamImage.imageAsDataUrl
      }
      console.log(jsonObject)
      this.dataService.uploadImage(jsonObject).subscribe(response=>{
        console.log(response)
    })
  }
}


  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }


}
