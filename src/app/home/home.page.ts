import { Component } from '@angular/core';
import {PopoverController, NavController, ToastController, LoadingController} from '@ionic/angular'
import { SectionPopoverComponent } from '../section-popover/section-popover.component';
import domtoimage from 'dom-to-image';
import * as fs from 'file-saver';
import { AppserviceService, section, offer, offerDetail } from '../services/appservice.service';  
import { Observable, Subscription,combineLatest, of } from 'rxjs'; 
import { uniq, flatten } from 'lodash' 
import { map,switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ApiServiceService } from '../httpService/api-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage { 
  private subscrbOfferDetail:Subscription;
  private subscrbOffer:Subscription;
  private subscrbSection :Subscription;
  private sections:Observable<any[]>; 
  private offers:Observable<any[]>; 
  private offerDetails: Observable<offerDetail[]>;
  email: any; 
  visitor:any;
  private offerDetailD2 :offerDetail[] ;
  private sectionD2 :section[] ;
  private offerD2 :offer[] ;
  sectionFinal:Array<any>=[]; 
  sectionFinal2:Array<any>=[]; 
  newOffers:Array<any>=[]; 
  checkoutDetailsForm;
   private sectionD :Observable<any> ; 
  // slideOpt={
  //   zoom: false,
  //   slidesPerView:1.9,
  //   spaceBetween: 20,
  //   centeredSlides: false,
  //   speed: 400
  // };
  mobSlideOpt={
    zoom: false,
   slidesPerView: 1.2,
    spaceBetween: 10,
    centeredSlides: true,
    speed: 400
  };
  webSlideOpt={
    zoom: false,
    slidesPerView: 3.2,
    spaceBetween: 10,
    centeredSlides: true,
    speed: 400
  };
  
  constructor(private loadingCtrl:  LoadingController,private toastCtrl:ToastController,	private fb: FormBuilder,private apiServ:ApiServiceService,private router: Router,private af: AngularFirestore,private appService:AppserviceService, public navCtrl: NavController,public popoverController: PopoverController) {
    // this.offers = this.appService.getOffers();
    // this.sections = this.appService.getSections() 
    //  this.offerDetails = this.appService.getAllOfferDetails();


     this.apiServ.getSectionOffer().subscribe((data)=>{
       console.log("dataoff",data)
       this.sectionFinal2 = data.data
       this.filterNewOffer()
    })
  }


filterNewOffer(){ 
   
  for (let index = 0; index < this.sectionFinal2.length; index++) {
    const element = this.sectionFinal2[index];
    if(element.offers.length>0){
       for (let i = 0; i < element.offers.length; i++) {
      const element2 = element.offers[i];
      if (element2.newLbl == 1){
       this.newOffers.push(element2)
      }
     }
    }
   
   
    
  }
//  let flt : any = this.sectionFinal2.filter(item=> item.newLbl == 1)
//  this.newOffers = flt
 
 console.log('newOff',this.newOffers)
 console.log('newOff',this.sectionFinal2)
}


  ionViewDidEnter(){
   
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
  

  async sendMail(){ 
  await this.presentLoading('')
    this.apiServ.sendMail(this.email).subscribe((data)=>{
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

    getCounter(){
      this.apiServ.getCounter().subscribe((data)=>{
        console.log('counter',data) 
        this.visitor = data
        localStorage.setItem('counter',this.visitor)
      })
    }

    
    ngOnInit() {  
      // this.subscrbSection = this.sections.subscribe(data => {
      //   let getData: any;
      //   getData = data;
      //   this.sectionD2 = getData
        
      // })
      // this.subscrbOffer= this.offers.subscribe(data => {
      //   let getData: any;
      //   getData = data;
      //   this.offerD2 = getData
      
      //   this.filterOffer()
      // })
      // this.subscrbOfferDetail = this.offerDetails.subscribe(data => {
      //   let getData: any;
      //   getData = data;
      //   this.offerDetailD2 = getData 
      //   this.filterOfferDetail()
      //   this.subscrbOfferDetail.unsubscribe()
      //   localStorage.setItem('sectionFinal',JSON.stringify(this.sectionFinal))  
      // })
        this.getCounter()
      this.checkoutDetailsForm = this.fb.group({ 
        email: [Validators.required, Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)],
        
      });
    }


  studyFireInnerJoin() { 
    this.sectionD = this.af.collection<section>('sections').snapshotChanges()
    .pipe(
      switchMap(sections => {
        const sectionsIds = uniq(sections.map(bp => bp.payload.doc.id))
      
        return combineLatest(
          of(sections),
          combineLatest(
            sectionsIds.map(sectionId =>
              //this.af.collection<offer>('offers').snapshotChanges().pipe(
               this.af.collection<offer>('offers', ref => ref.where('sectionId', '==', sectionId)).snapshotChanges().pipe(
               map(offers => {
                  return offers.map(a => {
                    const data = a.payload.doc.data(); 
                    const id = a.payload.doc.id;
                    const off ={ id, ...data }
                    console.log("getall",off)
                    return off
                  });
                }) 
              ) 
            ) 
          )  
        )
      })
   ,
      
      map(([sections, off]) => { 
       
         
        return sections.map(section => {
          let id = section.payload.doc.id
          let offMe: Array<any>=[]
          off.forEach(i => {
         
            let dex:any = i
             dex.forEach(x=>{
 if (x.sectionId==id){
   offMe.push(x)
 } 
             })
 
           }); 
        console.log(offMe,'offMw')

          return { 
            ...section.payload.doc.data(),id:section.payload.doc.id,offers: offMe
          }
        })
      })
     
    )
    
   }


  filterOfferDetail(){
    this.sectionFinal.forEach(d => { 
      d.offers.forEach(g => {
        console.log('off',g.id)

        let off: offerDetail[] = this.offerDetailD2.filter((a: offerDetail) => a.offerId === g.id)
        console.log('off',off)
         g.offerDetails = off
      });
    })
    
  }

  filterOffer() {
    this.sectionFinal = []
    this.sectionD2.forEach(d => {
      let off: offer[] = this.offerD2.filter((a: offer) => a.sectionId === d.id)
      let length = off.length 
      if (length >3 ) {
        length = 3.5
      }
      this.sectionFinal.push({
        id: d.id,
        imgUrl: d.imgUrl,
        title: d.title,
        shortDescr:d.shortDescr,
        offerLength:length,
        offers: off
      }) 
    })
    this.subscrbOffer.unsubscribe() ;  
    this.subscrbSection.unsubscribe() ; 
   }
 
   offerDetail(id , sectionId ,title,price,shortDescr,price_note,start,imgUrl,hourCount,dailyTime){
      
    this.navCtrl.navigateForward(['section-details/',{ id: id,sectionId:sectionId,  title:title,price:price,shortDescr:shortDescr,price_note:price_note,start:start,imgUrl:imgUrl ,hourCount:hourCount,dailyTime:dailyTime  }]) 
  //  this.navCtrl.navigateForward(['section-details/', {offer:offer}]) 
 //  this.router.navigate(['/section-details/',{ sectionId: sectionId }]) 
   }

   cSect(id,title,shortDescr,imgUrl){ 
      this.router.navigate(['sections/',{id:id,title:title,shortDescr:shortDescr,imgUrl:imgUrl}])
   }

   async presentSections(event) { 
    const popover = await this.popoverController.create({
      component: SectionPopoverComponent,
      event: event
    });
    return await popover.present();
   }

   getSnap(){
     console.log("im here")
    var node = document.getElementById('my-node');
 
    domtoimage.toPng(node)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
           console.log(dataUrl) 
            document.body.appendChild(img);
            //
        
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
   }

  saveAs(){
      domtoimage.toBlob(document.getElementById('my-node'))
        .then(function (blob) {
          fs.saveAs(blob, 'my-node.png');
    });
  }
 
}
 
