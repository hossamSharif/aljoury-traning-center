import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService, offer, section } from '../services/appservice.service';  
import { Observable, Subscription } from 'rxjs' 
import { Route } from '@angular/compiler/src/core';
import { ApiServiceService } from '../httpService/api-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {
  private parameter = {id:'',title:'',shortDescr:'',imgUrl:''}
  private subscrbPara:Subscription;
  private subscrbOffer:Subscription;
  private offers:Observable<offer[]>;    
  private offerD2 :offer[] ;
  sectionFinal:Array<any>;
  sectionFinal2:Array<any>=[];
  visitor:any=0
  
  checkoutDetailsForm2;
  checkoutDetailsForm;
 
  emailD;
  constructor(private loadingCtrl:  LoadingController,private toastCtrl:ToastController,private fb: FormBuilder,private navCtrl :NavController,private activatedRoute: ActivatedRoute,private apiServ:ApiServiceService) {
    let id = this.activatedRoute.snapshot.paramMap.get('id') 
   
    this.apiServ.getSectionOffer().subscribe((data)=>{
      console.log("dataoff",data)
      this.sectionFinal = data.data
      this.sectionFinal = this.sectionFinal.filter((item:any)=>item.id === id)
      console.log('filtered: ', this.sectionFinal);  
   })
   
   
   
   
    // this.sectionFinal =[]
    // // let id = this.activatedRoute.snapshot.paramMap.get('id') 
    //  this.sectionFinal = JSON.parse(localStorage.getItem('sectionFinal')) 
    //  console.log('easy: ', this.sectionFinal);   
    //  this.sectionFinal = this.sectionFinal.filter((a:section)=> a.id === id) 
    //  console.log('fit: ', this.sectionFinal);   
    // //  let offJson = JSON.stringify(off)
    //  console.log('offJson: ', offJson);  
    // //  offJson.map(function (officer) {
    // //       console.log('Params: ', officer); 
    // // }); 
    //  this.offers = this.appService.getOffersSection(id);
    //  this.subscrbPara= this.activatedRoute.params.subscribe((params) => { 
    //  params['offers'].map(obj => {
    //   console.log('obj',obj['key'])
    //  })
    //   this.offers = this.appService.getOffersSection(params['id']);
    //   this.subscrbPara.unsubscribe();
    //   this.parameter ={id :params['id'],title:params['title'],imgUrl:params['imgUrl'],shortDescr:params['shortDescr']}  

    // }); 
   }

   async presentToast(msg,cssClass?,postion?,color?) {
    const toast = await this.toastCtrl.create({
      message: msg,
      position: postion,
      duration: 2000,
      cssClass: cssClass,
      color:color
    });
   toast.present();
  
  }
  
  async presentLoading(msg?)
  {
    const loader = await this.loadingCtrl.create({
      message:msg,
      spinner:"bubbles",
      mode:'ios'
    })
    return loader.present();
  }


  async  sendMail(){ 
    await this.presentLoading('')
    this.apiServ.sendMail(this.emailD).subscribe((data)=>{
    console.log('data',data)
    if(data == 'Message has been sent'){
      this.presentToast('تم الإشتراك بنجاح','cust-toast','middle','light') 
    }else{
      this.presentToast('حدث خطأ ما ,حاول مرة اخري','cust-toast','middle','light') 
  
    }
    this.loadingCtrl.dismiss()
  },
  (error)=>{
    this.loadingCtrl.dismiss() 
  }
  )
  }

   offerDetail(id , sectionId ,title,price,shortDescr,price_note,start,imgUrl,hourCount,dailyTime){
    this.navCtrl.navigateForward(['section-details/',{ id: id,sectionId:sectionId,  title:title,price:price,shortDescr:shortDescr,price_note:price_note,start:start,imgUrl:imgUrl ,hourCount:hourCount,dailyTime:dailyTime  }]) 
   // this.navCtrl.navigateForward(['section-details/',{ offerId: offerId,sectionId:sectionId }]) 
//  this.router.navigate(['/section-details/',{ sectionId: sectionId }]) 
  }
  ngOnInit() {
    this.visitor= localStorage.getItem('counter')
    this.checkoutDetailsForm2 = this.fb.group({ 
      emailD: [Validators.required, Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)],
      
    }); 
    //   this.parameter ={
    //     id :this.activatedRoute.snapshot.paramMap.get('id'),
    //   title:this.activatedRoute.snapshot.paramMap.get('title')
    //   ,imgUrl:this.activatedRoute.snapshot.paramMap.get('imgUrl'),
    //   shortDescr:this.activatedRoute.snapshot.paramMap.get('shortDescr')
    // }  

    // this.subscrbOffer=this.offers.subscribe(data => {
    //   let getData: any;
    //   getData = data;
    //   this.offerD2 = getData
    //   console.log('offers is here', this.offerD2)
    //  this.pushData() 
    // })
  }

// pushData(){
//   this.sectionFinal.push({
//     id:this.parameter.id,
//     title:this.parameter.title,
//     shortDescr:this.parameter.shortDescr,
//     imgUrl:this.parameter.imgUrl,
//     offers:this.offerD2
//   })
//   this.subscrbOffer.unsubscribe();   
// }

}
