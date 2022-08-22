import { Component, OnInit } from '@angular/core';

import { Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SectionPopoverComponent } from './section-popover/section-popover.component';
import { AppserviceService ,section ,offer ,teacher} from './services/appservice.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ApiServiceService } from './httpService/api-service.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  private sections:Observable<section[]>;
   private subscrbSection:Subscription ;
    sectionFinal:Array<any>=[]; 
    status :String;
  constructor( 
    
    private router :Router,
    private appService:AppserviceService,
    private apiServ:ApiServiceService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private popoverController:PopoverController
  ) {
   this.status = 'دخول'
    this.initializeApp();
  
     this.sections = this.appService.getSections(); 
  }

  ngOnInit() {
    this.sectionFinal = []
    this.sectionFinal = JSON.parse(localStorage.getItem('sectionFinal'))

    if(!this.sectionFinal){
      this.apiServ.getSection().subscribe((data)=>{
        this.sectionFinal = data
        localStorage.setItem('sectionFinal',JSON.stringify(this.sectionFinal) )
        console.log('formapp',data)
      })
     } 
  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  login(){ 
  // if ( this.status === 'تسجيل خروج') {
  //    this.status = 'دخول'
  //    this.router.navigate(['login']) 
  //  } else {
  
  //  }

  if (localStorage.getItem('connect') === 'connect') { 
    this.status = 'تسجيل خروج'
    this.router.navigate(['dashboard']) 

    this.router.navigate(['dashboard']) 
  } else {
    this.router.navigate(['login']) 
  }  

  }

  cSect(id,title,shortDescr,imgUrl){ 
    this.router.navigate(['sections/',{id:id,title:title,shortDescr:shortDescr,imgUrl:imgUrl}])
  }

  async presentSections(event) {
    console.log("okey")
    const popover = await this.popoverController.create({
      component: SectionPopoverComponent,
      event: event,
      showBackdrop:false
    });
    return await popover.present();
  }

}
