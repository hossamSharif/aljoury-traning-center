import { Component, OnInit } from '@angular/core';
import { AppserviceService ,section ,offer ,teacher} from '../services/appservice.service';
import { Observable } from 'rxjs';
import { ModalController, NavController } from '@ionic/angular';
import { SectionModalComponent } from '../section-modal/section-modal.component';
import { TeacherModalComponent } from '../teacher-modal/teacher-modal.component';
import { ImgModalComponent } from '../img-modal/img-modal.component';
import { OfferModalComponent } from '../offer-modal/offer-modal.component';
import { ApiServiceService } from '../httpService/api-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  CustomEvent =
  {
    detail:{value:""}
    
  }
   sectionSegm: string = 'sectionsDe'; 
   imgUrl: any=null;

   sections:Array<any[]>; 
   offers:Array<any[]>;
   teachers:Array<any[]>; 
user:any;
  //  sections:Observable<section[]>; 
  //  offers:Observable<offer[]>; 
  //  teachers:Observable<teacher[]>; 
  constructor(private actv :ActivatedRoute,private appService:ApiServiceService,private modalCtrl:ModalController,private navCtrl:NavController) { 
  //  this.user = this.actv.snapshot.paramMap.get('user')
  //   console.log('lksdjfksjdlfs',this.user)
  }

  async sectionModal(sectId,title,shortDescr,imgUrl) {
    const modal = await this.modalCtrl.create({
      component: SectionModalComponent,
      componentProps: {
       sectId: sectId ,
       title: title,
       shortDescr:shortDescr,
       imgUrl:imgUrl
      } 
    });
    modal.present()
    modal.onDidDismiss().then(()=>{
      this.appService.getSection().subscribe((data)=>{
        if(data.message == "No Posts Found"){
  
        }else{
          this.sections = data
        }
       
      })
    })
  }





  async sectionModalN() {
    const modal1 = await this.modalCtrl.create({
      component: SectionModalComponent
    });
    modal1.present()
    modal1.onDidDismiss().then(()=>{
      this.appService.getSection().subscribe((data)=>{
        if(data.message == "No Posts Found"){
  
        }else{
          this.sections = data
        }
       
      })
    })


  }

  async offerModal(offId,sectionId,title,price,price_note,dailyTime,hourCount,start,shortDescr,teacher,imgUrl,newLbl) {
    const modal2 = await this.modalCtrl.create({
      component: OfferModalComponent,
      componentProps: {
       offerId: offId,
       sectionId:sectionId,
       title:title,
       price:price,
       price_note:price_note,
       dailyTime:dailyTime,
       hourCount:hourCount,
       start:start,
       shortDescr:shortDescr,
       teacher:teacher,
       imgUrl:imgUrl,
       newLbl: newLbl 
      }

    });
    modal2.present()
    modal2.onDidDismiss().then(()=>{
      this.appService.getOffer().subscribe((data)=>{
        if(data.message == "No Posts Found"){
  
        }else{
          this.offers = data
        }
       
      })
    })



  }

  async offerModalN() {
    const modal12 = await this.modalCtrl.create({
      component: OfferModalComponent

    });
    modal12.present()
    modal12.onDidDismiss().then(()=>{
      this.appService.getOffer().subscribe((data)=>{
        if(data.message == "No Posts Found"){
  
        }else{
          this.offers = data
        }
       
      })
    })
  }


  
  async teacherModal(teachId,name,shortDescr,imgUrl) {
    const modal3 = await this.modalCtrl.create({
      component: TeacherModalComponent,
      componentProps: {
       teachId: teachId,
       name: name,
        shortDescr:shortDescr,
        imgUrl:imgUrl
      } 
    });
    modal3.onDidDismiss().then(()=>{
      this.appService.getTeacher().subscribe((data)=>{
        if(data.message == "No Posts Found"){
  
        }else{
          this.teachers = data
        }
       
      })
    })
    modal3.present() ;
   
  }

 

  async teacherModalN() {
    const modal13 = await this.modalCtrl.create({
      component: TeacherModalComponent
    });
    modal13.present()
    modal13.onDidDismiss().then(()=>{
      this.appService.getTeacher().subscribe((data)=>{
        if(data.message == "No Posts Found"){
  
        }else{
          this.teachers = data
        }
       
      })
    })
  }


  
  async imgModalSection(sectId,title,shortDescr,imgUrl) {
    const modal4 = await this.modalCtrl.create({
      component: ImgModalComponent,
      componentProps: {
        title: title,
        shortDescr:shortDescr,
        imgUrl:imgUrl,
       type:'section',
       sectId:sectId
      }

    });
    modal4.present()
    modal4.onDidDismiss().then(()=>{
      this.appService.getSection().subscribe((data)=>{
        if(data.message == "No Posts Found"){
  
        }else{
          this.sections = data
        }
       
      })
    })

  }



  async imgModalTeacher(teachId,name,shortDescr,imgUrl) {
    const modal4 = await this.modalCtrl.create({
      component: ImgModalComponent,
      componentProps: {
        ImgUrl: imgUrl,
        type:'teacher', 
        teachId: teachId,
         name: name,
         shortDescr:shortDescr,
         imgUrl:imgUrl
      }

    });
    modal4.present()
    modal4.onDidDismiss().then(()=>{
      this.appService.getTeacher().subscribe((data)=>{
        if(data.message == "No Posts Found"){
  
        }else{
          this.teachers = data
        }
       
      })
    })
  }

  async imgModalOffer(offId,sectionId,title,price,price_note,dailyTime,hourCount,start,shortDescr,teacher,imgUrl) {
    const modal4 = await this.modalCtrl.create({
      component: ImgModalComponent,
      componentProps: { 
       type:'offer',
       offerId:offId, 
       sectionId:sectionId,
       title:title,
       price:price,
       price_note:price_note,
       dailyTime:dailyTime,
       hourCount:hourCount, 
       start:start,
       shortDescr:shortDescr,
       teacher:teacher,
       imgUrl:imgUrl
      }

    });
    modal4.present()
    modal4.onDidDismiss().then(()=>{
      this.appService.getOffer().subscribe((data)=>{
        if(data.message == "No Posts Found"){
  
        }else{
          this.offers = data
        }
       
      })
    })
  }

  segmentChanged(event) { 
   this.CustomEvent=event 
    this.sectionSegm = this.CustomEvent.detail.value  
    if (this.sectionSegm == 'sectionsDe'){
      this.appService.getSection().subscribe((data)=>{
        console.log(data)
       
        if(data.message == "No Posts Found"){
  
        }else{
          console.log(data)
          this.sections = data
          console.log(this.sections)
  
        }
       
      })
    } else if(this.sectionSegm == 'offers'){
      this.appService.getOffer().subscribe((data)=>{
        if(data.message == "No Posts Found"){
  
        }else{
          this.offers = data
        }
       
      })

    } else if(this.sectionSegm == 'teachers'){
      this.appService.getTeacher().subscribe((data)=>{
        if(data.message == "No Posts Found"){
  
        }else{
          this.teachers = data
        }
       
      })

    } else if(this.sectionSegm == 'general'){

    }
  }
 
  ngOnInit() { 
    this.appService.getSection().subscribe((data)=>{
      console.log(data)
     
      if(data.message == "No Posts Found"){

      }else{
        console.log(data)
        this.sections = data
        console.log(this.sections)

      }
     
    })
    this.appService.getTeacher().subscribe((data)=>{
      if(data.message == "No Posts Found"){

      }else{
        this.teachers = data
      }
     
    })
    this.appService.getOffer().subscribe((data)=>{
      if(data.message == "No Posts Found"){

      }else{
        this.offers = data
      }
     
    })
    // this.sections = this.appService.getSections(); 
    // this.offers = this.appService.getOffers();
    // this.teachers = this.appService.getTeachers();
  }

}
