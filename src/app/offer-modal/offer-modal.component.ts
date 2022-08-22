import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AppserviceService ,offer,offerDetail, student, section} from '../services/appservice.service';
import { Observable } from 'rxjs';
import { ApiServiceService } from '../httpService/api-service.service';
@Component({
  selector: 'app-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.scss'],
})
export class OfferModalComponent implements OnInit {
  CustomEvent =
  {
    detail:{value:""} 
  }
   sectionSegm: string = 'genral'; 
   offer:offer;
   offerDetail:offerDetail;
    offerDetails:Observable<offerDetail[]>; 
    sections:Observable<section[]>;  
   student:student;
   students:Observable<student[]>;
   offerId:String 
   constructor(private appService:ApiServiceService,private navParam:NavParams,private modalCtrl:ModalController,) {
    this.offerDetail ={descrb:'',offerId:''}
    this.student ={name:'',email:'',phone:'',offerId:''}
    this.offerId=  this.navParam.get('offerId')
    }
   
   segmentChanged(event) { 
    this.CustomEvent=event 
     this.sectionSegm = this.CustomEvent.detail.value  
   }
   
   ngOnInit() { 
     this.appService.getSection().subscribe((data)=>{
      this.sections = data
     }); 
    if (this.navParam.get('offerId') == undefined) { 
      this.offer = { 
        sectionId: this.navParam.get('sectionId'), 
        price:this.navParam.get('price'), 
       price_note: this.navParam.get('price_note'), 
       hourCount:this.navParam.get('hourCount'), 
       dailyTime:this.navParam.get('dailyTime'),  
       start:this.navParam.get('start'),  
       title:this.navParam.get('title'),  
       teacher:this.navParam.get('teacher'),
      shortDescr: this.navParam.get('shortDescr'),
      imgUrl:this.navParam.get('imgUrl'),
      newLbl:this.navParam.get('newLbl')

       }
    } else {
        this.appService.getOfferDetails(this.navParam.get('offerId')).subscribe((data)=>{
          this.offerDetails= data
        })

       this.appService.offerStudent(this.navParam.get('offerId')) .subscribe((data)=>{
        this.students= data
       })
     
      this.offer = {
         id:this.navParam.get('offerId'),
         sectionId: this.navParam.get('sectionId'), 
        price:this.navParam.get('price'), 
       price_note: this.navParam.get('price_note'), 
       hourCount:this.navParam.get('hourCount'),  
       dailyTime:this.navParam.get('dailyTime'),  
       start:this.navParam.get('start'),  
       title:this.navParam.get('title'),  
       teacher:this.navParam.get('teacher'),
      shortDescr: this.navParam.get('shortDescr'),
      imgUrl:this.navParam.get('imgUrl'),  
      newLbl:this.navParam.get('newLbl')

      }
      this.offerDetail.offerId = this.offer.id
      this.student.offerId = this.offer.id
    }
   
    }
  
    closeMe(){
      this.modalCtrl.dismiss()
    }
    // sectionChange(eve){

    //   this.offer.sectionId= eve
    //   // console.log()

    // }
    addOffer(){
      if (this.offer.id == undefined) {
        this.offer.imgUrl ="def" 
        this.appService.createOffer(this.offer).subscribe((data)=>{
          if (data.message == "Post Created") {
            this.modalCtrl.dismiss()
          } else {

          }
            
        })
       
      } else {
        this.appService.updateOffer(this.offer).subscribe((data)=>{
          if (data.message == "Post Updated") {
            this.modalCtrl.dismiss()
          } else {
            
          }
        })
        
      }
     
    }

    addOfferDetail(){
      this.offerDetail.offerId = this.offer.id
      this.appService.createOfferDetail(this.offerDetail).subscribe((data)=>{
        if (data.message == "Post Created") {
          this.appService.getOfferDetails(this.navParam.get('offerId')).subscribe((data)=>{
            this.offerDetails= data
          })
        } else {

        }
          
      })
      this.offerDetail.descrb=''
    
  }
  
  deleteOffer(){
    this.appService.deleteOffer(this.offer.id).subscribe((data)=>{
      if (data.message == "Post Deleted") {
        this.modalCtrl.dismiss()
      } else {
        
      }
    })
  }

  deleteOfferDetail(id){
    this.appService.deleteOfferDetail(id).subscribe((data)=>{
      if (data.message == "Post Deleted") {
        this.appService.getOfferDetails(this.navParam.get('offerId')).subscribe((data)=>{
          this.offerDetails= data
        })
      } else {
        
      }
    }) 
  }

  addStudent(){
    this.student.offerId = this.offer.id
    this.appService.createStudent(this.student).subscribe((data)=>{
      if (data.message == "Post Created") {
        this.appService.offerStudent(this.navParam.get('offerId')) .subscribe((data)=>{
          this.students= data
         })
      } else {
        
      }
    })
    this.student.email=''
    this.student.name=''
    this.student.phone=''
    
  }
 

  deleteStudent(id){
  this.appService.deleteStudent(id).subscribe((data)=>{
    if (data.message == "Post Deleted") {
      this.appService.offerStudent(this.navParam.get('offerId')) .subscribe((data)=>{
        this.students= data
       })
    } else {
      
    }
  })  
}


}
