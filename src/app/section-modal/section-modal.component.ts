import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AppserviceService ,section} from '../services/appservice.service';
import { ApiServiceService } from '../httpService/api-service.service';
 
 

@Component({
  selector: 'app-section-modal',
  templateUrl: './section-modal.component.html',
  styleUrls: ['./section-modal.component.scss'],
})
export class SectionModalComponent implements OnInit {
 
  section:section ;
  
  constructor(private appService:ApiServiceService,private navParam:NavParams,private modalCtrl:ModalController,) { }

  ngOnInit() { 
    if (this.navParam.get('sectId') == undefined) {
     
      this.section = {
         title: this.navParam.get('title'),
       shortDescr: this.navParam.get('shortDescr'),
      imgUrl:this.navParam.get('imgUrl')

       }
    } else {
      this.section = {
        id: this.navParam.get('sectId'),
        title: this.navParam.get('title'),
        shortDescr: this.navParam.get('shortDescr'),
      imgUrl:this.navParam.get('imgUrl')

      } 
    }

  }

  closeMe(){
    this.modalCtrl.dismiss()
  }

addSection(){
  if ( this.section.id == undefined) {  
    this.section.imgUrl ="def"
  this.appService.createSection(this.section).subscribe((data)=>{
    if (data.message == "Post Created") {
      this.modalCtrl.dismiss()
    } else {
      
    }
  })
 
  } else { 
  this.appService.updateSection(this.section).subscribe((data)=>{
    if (data.message == "Post Updated") {
      this.modalCtrl.dismiss()
    } else {
      
    }
  })
   
  }
}

deleteSection(){
  this.appService.deleteSection(this.section.id).subscribe((data)=>{
    if (data.message == "Post Deleted") {
      this.modalCtrl.dismiss()
    } else {
      
    }
  }) 
}

}
