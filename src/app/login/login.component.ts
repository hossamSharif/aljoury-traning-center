import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { Observable, Subscription,combineLatest, of } from 'rxjs'; 
import { uniq, flatten } from 'lodash' 
import { map,switchMap } from 'rxjs/operators';
import { AppserviceService ,section,offer} from '../services/appservice.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ApiServiceService } from '../httpService/api-service.service';
import {  Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
user ={name:'',password:''}
private sectionD :Observable<any> ; 
 status :any;
  // private offers2:Array<any>[];  
  constructor(private router : Router,private toastCtrl:ToastController,private apiServ:ApiServiceService,private af: AngularFirestore,private appService:AppserviceService,private navCtrl:NavController,private alertCtrl:AlertController) { 
    if (localStorage.getItem('connect') === 'connect') { 
      this.status = 'تسجيل خروج'
      this.router.navigate(['dashboard']) 
  
      this.router.navigate(['dashboard']) 
    } else {
      this.router.navigate(['login']) 
    }  
    this.appService.getSections()
  }

 
  ngOnInit() {
    this.studyFireInnerJoin()
    this.sectionD.subscribe(data =>  {
      console.log('im here man can you c me ',data) 

    })
  }



async presentToast(){
  const toast = await this.toastCtrl.create({
    message:"error",
    duration:2000,
    color: "danger",
    mode:"ios",
    position:"top" 
  })

toast.present();



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
            let offMe: Array<any> = []
            off.forEach(i => {

              let dex: any = i
              dex.forEach(x => {
                if (x.sectionId == id) {
                  offMe.push(x)
                }
              })

            });
            console.log(offMe, 'offMw')

            return {
              ...section.payload.doc.data(), id: section.payload.doc.id, offers: offMe
            }
          })
        })
       
      )
      
     }


login(){
  if (this.user.name === 'admin' && this.user.password === 'admin'){

    this.apiServ.login(this.user.name,this.user.password).subscribe((data)=>{
      console.log(data)

      if(data){
        localStorage.setItem('connect','connect')  
        this.navCtrl.navigateForward(['dashboard'])
      //  this.navCtrl.navigateRoot(['dashboard',{user:this.user.name}])
        //this.navCtrl.navigateBack(['dashboard'])
      }else{

      }
    },
    (error)=>{
      this.presentToast()
    }
    )
    
  }else{
    
  } 
}
}