import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AppserviceService ,teacher} from '../services/appservice.service';
import { ApiServiceService } from '../httpService/api-service.service';
@Component({
  selector: 'app-teacher-modal',
  templateUrl: './teacher-modal.component.html',
  styleUrls: ['./teacher-modal.component.scss'],
})
export class TeacherModalComponent implements OnInit {
   
  teacher:teacher
  constructor(private appService:ApiServiceService,private navParam:NavParams,private modalCtrl:ModalController,) { }
   

  ngOnInit() {
    if (this.navParam.get('teachId') == undefined) {

      this.teacher = {
         name: this.navParam.get('name'),
       shortDescr: this.navParam.get('shortDescr'),
       imgUrl:this.navParam.get('imgUrl')
      
      }
    } else {
      this.teacher = {
        id: this.navParam.get('teachId'),
        name: this.navParam.get('name'),
        shortDescr: this.navParam.get('shortDescr'),
      imgUrl:this.navParam.get('imgUrl')

      }
    }
  }
    closeMe(){
      this.modalCtrl.dismiss()
    }
  
  addTeacher() {
    if (this.teacher.id == undefined) {
    this.teacher.imgUrl ="def"
    this.appService.createTeacher(this.teacher).subscribe((data)=>{
      if (data.message == "Post Created") {
        this.modalCtrl.dismiss()
      } else {
        
      }
    })

    //  this.appService.addTeacher(this.teacher)
      this.modalCtrl.dismiss()
    } else {
      this.appService.updateTeacher(this.teacher).subscribe((data)=>{
        if (data.message == "Post Updated") {
          this.modalCtrl.dismiss()
        } else {
          
        }
      })
      // this.appService.updateTeacher(this.teacher)
      // this.modalCtrl.dismiss()
    }
    this.modalCtrl.dismiss() 
  }
  
  deleteTeacher(){
    this.appService.deleteTeacher(this.teacher.id).subscribe((data)=>{
      if (data.message == "Post Deleted") {
        this.modalCtrl.dismiss()
      } else {
        
      }
    })
   // this.modalCtrl.dismiss()

  }

}
