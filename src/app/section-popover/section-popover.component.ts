import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../httpService/api-service.service';

@Component({
  selector: 'app-section-popover',
  templateUrl: './section-popover.component.html',
  styleUrls: ['./section-popover.component.scss'],
})
export class SectionPopoverComponent implements OnInit {
   sectionFinal:Array<any>=[]; 
  constructor(private activeRout:ActivatedRoute,private apiServ:ApiServiceService,public navCtrl:NavController ,public popoverController:PopoverController,public router:Router) { 
  this.sectionFinal= JSON.parse(localStorage.getItem('sectionFinal')) 
    
  }

 ngOnInit() {
   if(this.sectionFinal.length == 0){
    this.apiServ.getSection().subscribe((data)=>{
      this.sectionFinal = data
      localStorage.setItem('sectionFinal',JSON.stringify(this.sectionFinal) )
      console.log('formPOP',data)
    })
   }
 }
 
cSect(id,title,shortDescr,imgUrl){ 
  console.log('am here man',this.activeRout.outlet.toString())
  this.router.navigate(['sections/',{id:id,title:title,shortDescr:shortDescr,imgUrl:imgUrl}])
}

}
