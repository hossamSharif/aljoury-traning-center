import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppserviceService, section, offer, student } from '../services/appservice.service';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ApiServiceService } from '../httpService/api-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
 

@Component({
  selector: 'app-section-details',
  templateUrl: './section-details.component.html',
  styleUrls: ['./section-details.component.scss'],
})
export class SectionDetailsComponent implements OnInit {
  sectionFinal:Array<any>=[];
  sectionFinal2:Array<any>=[];
  student:student;
  checkoutDetailsForm;
  checkoutDetailsForm2;
  email;
  emailD;
  phone;
  offerId;
  name;
  offerName;
  visitor:any=0;
  constructor(private loadingCtrl:  LoadingController,private toastCtrl:ToastController,private fb: FormBuilder,private apiServ:ApiServiceService,private navCtrl:NavController,private activatedRoute: ActivatedRoute,private appService:AppserviceService) { 
  // console.log(this.activatedRoute.snapshot.paramMap.get('offer'))
   
  //  this.sectionFinal2 =  this.activatedRoute.snapshot.paramMap.get('offer')
  //  
 
   
 console.log('plz take a look',this.activatedRoute.snapshot.paramMap.get('id'))
    this.sectionFinal =[
      {
         id: this.activatedRoute.snapshot.paramMap.get('id'),
        sectionId:this.activatedRoute.snapshot.paramMap.get('sectionId'),
        title:this.activatedRoute.snapshot.paramMap.get('title'),
        price:this.activatedRoute.snapshot.paramMap.get('price'),
        shortDescr:this.activatedRoute.snapshot.paramMap.get('shortDescr'),
        price_note:this.activatedRoute.snapshot.paramMap.get('price_note'),
        start:this.activatedRoute.snapshot.paramMap.get('start'),
        imgUrl:this.activatedRoute.snapshot.paramMap.get('imgUrl')  ,
        dailyTime:this.activatedRoute.snapshot.paramMap.get('dailyTime')  ,
        horCount:this.activatedRoute.snapshot.paramMap.get('horCount')  
       
       } 
    ]

    this.apiServ.getOfferDetails(+this.sectionFinal[0].id).subscribe((data)=>{
      // let flt = data
      // flt = flt.filter(item=>item.offerId == this.sectionFinal[0].id)
      this.sectionFinal[0]['offerDetails']= data
      console.log("sectionfilal1", this.sectionFinal[0]['offerDetails'])
    })


    this.student ={id:null ,name:'',email:'',phone:'',offerId:''}
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.student.offerId = id


    // let sectionId = this.activatedRoute.snapshot.paramMap.get('sectionId')  
    //  this.sectionFinal = JSON.parse(localStorage.getItem('sectionFinal')) 
    //  this.sectionFinal = this.sectionFinal.filter((a:section)=> a.id === sectionId)  
    //  if (this.sectionFinal[0]['offerDetails'] === null) {
       
    //  } else {
    //   // this.sectionFinal = this.sectionFinal[0]['offers'].filter((a:offer)=> a.id === id) 
    //   // console.log('fitDetail: ', this.sectionFinal);  
    //  }
     
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


 async addStudent(){ 
    await this.presentLoading('جاري التسجيل...')
    if(this.student.phone == "" || this.student.name == ""){

    } else{
       this.student.offerId =this.activatedRoute.snapshot.paramMap.get('id')
      this.apiServ.createStudent(this.student).subscribe((data)=>{
      console.log(data)
      if(data.message === 'Post Created'){
        this.presentToast('تم التسجيل بنجاح الرجاء مراجعة بريدك الإلكتروني ','cust-toast','middle','light') 
        this.loadingCtrl.dismiss()
        this.sendCourceMail()
    this.student.email=''
    this.student.name=''
    this.student.phone=''
    //send email to info and student 
    
      // this.navCtrl.pop()
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
     
  }
  
   sendCourceMail(){  
  this.apiServ.sendCourceMail(this.student.email,this.student.name,this.sectionFinal[0].offerId,this.sectionFinal[0].title,this.sectionFinal[0].start,this.student.phone).subscribe((data)=>{
    console.log('data',data) 
  })
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

  ngOnInit() {
  this.visitor= localStorage.getItem('counter')
   
    this.appService.getStudents(this.activatedRoute.snapshot.paramMap.get('offerId')) 
    this.checkoutDetailsForm = this.fb.group({ 
			email: [Validators.required, Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)],
      phone: [ Validators.required, Validators.pattern("[0-9]|1[0-9]|2[0-4]")],
      name: [Validators.required, Validators.required]
		 
		});
    this.checkoutDetailsForm2 = this.fb.group({ 
      emailD: [Validators.required, Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)],
      
    }); 
  }
 
}
