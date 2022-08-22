import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { NavParams, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup } from  '@angular/forms';
import { ApiServiceService } from '../httpService/api-service.service';
import { section, teacher, offer } from '../services/appservice.service';
export interface Image {
  id: string;
  image: string;
}

@Component({
  selector: 'app-img-modal',
  templateUrl: './img-modal.component.html',
  styleUrls: ['./img-modal.component.scss'],
})
export class ImgModalComponent implements OnInit {
  url: any;
  newImage: Image = {
    id: this.afs.createId(), image: ''
  }
  loading: boolean = false;
  form: FormGroup;
  uploadResponse;
  section:section ;
  teacher:teacher ;
  offer:offer
  constructor(private apiServ:ApiServiceService,private formBuilder: FormBuilder,private modalCtrl:ModalController,private afs: AngularFirestore, private storage: AngularFireStorage,private navParam:NavParams) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
if (this.navParam.get('type') === 'section'){
    this.section = {
      id: this.navParam.get('sectId'),
      title: this.navParam.get('title'),
      shortDescr: this.navParam.get('shortDescr'),
      imgUrl:this.navParam.get('imgUrl') 
    } 
  }else if (this.navParam.get('type') === 'offer'){
    this.offer = { 
      id: this.navParam.get('offerId'),
      title:this.navParam.get('title'),
      dailyTime: this.navParam.get('dailyTime'),
      hourCount: this.navParam.get('hourCount'),
     
      price:this.navParam.get('price'),
      price_note:this.navParam.get('price_note'),
      start:this.navParam.get('start'),
      sectionId:this.navParam.get('sectionId'),
      shortDescr:this.navParam.get('shortDescr'),
      teacher:this.navParam.get('teacher'),
      imgUrl:this.navParam.get('imgUrl') ,
      newLbl:this.navParam.get('newLbl') 

    } 

  }else if (this.navParam.get('type') === 'teacher'){
    this.teacher = {
      id: this.navParam.get('teachId'), 
      shortDescr: this.navParam.get('shortDescr'),
      imgUrl:this.navParam.get('imgUrl') ,
      name:this.navParam.get('name') 
    } 


  }
  }


  closeMe(){
    this.modalCtrl.dismiss()
  }


  onFileSelect(event) {
    console.log(event)
    if (event.target.value.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.form.get('avatar').value);
    console.log(formData) 
    this.apiServ.uploadFile(formData).subscribe(
      (res) => {
        this.uploadResponse = res;
          console.log(res);
          if(this.uploadResponse.status === 'success'){
            this.updatedData();
          }
      },
      (err) => {  
        console.log(err);
      }
    );
  }

updatedData(){ 
  if (this.navParam.get('type') === 'section'){
    this.section.imgUrl = this.uploadResponse.url
    this.apiServ.updateSection(this.section).subscribe((data)=>{
      if (data.message == "Post Updated") {
        this.modalCtrl.dismiss()
      } else {
        
      }
    })
  }else if (this.navParam.get('type') === 'offer'){
    this.offer.imgUrl = this.uploadResponse.url
    this.apiServ.updateOffer(this.offer).subscribe((data)=>{
      if (data.message == "Post Updated") {
        this.modalCtrl.dismiss()
      } else {
        
      }
    })

  }else if (this.navParam.get('type') === 'teacher'){
    this.teacher.imgUrl = this.uploadResponse.url
    this.apiServ.updateTeacher(this.teacher).subscribe((data)=>{
      if (data.message == "Post Updated") {
        this.modalCtrl.dismiss()
      } else {
        
      }
    })

  }






}

  uploadImage(event) {
    this.loading = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
     
      reader.readAsDataURL(event.target.files[0]);
      // For Preview Of Image
      reader.onload = (e:any) => { // called once readAsDataURL is completed
        this.url = e.target.result;
      
        // For Uploading Image To Firebase
        const fileraw = event.target.files[0];
        console.log(fileraw)
        const filePath = '/Image/' + this.newImage.id + '/' + 'Image' + (Math.floor(1000 + Math.random() * 9000) + 1);
        const result = this.SaveImageRef(filePath, fileraw);
        const ref = result.ref;
        result.task.then(a => {
          ref.getDownloadURL().subscribe(a => {
            console.log('irl',a); 
            this.newImage.image = a;
      
          if (this.navParam.get('type') == 'section') {
            this.afs.collection('sections').doc(this.navParam.get('sectionId')).update({imgUrl:this.newImage.image});
              
            } else if(this.navParam.get('type') == 'offer') {
            this.afs.collection('offers').doc(this.navParam.get('offerId')).update({imgUrl:this.newImage.image});
              
            }
            else if(this.navParam.get('type') == 'teacher') {
              this.afs.collection('teachers').doc(this.navParam.get('teacherId')).update({imgUrl:this.newImage.image});
                
              }
            this.loading = false;
          });
 
         
        });
      }, error => {
        alert("Error");
      }

    }
  }


  SaveImageRef(filePath, file) { 
    return {
      task: this.storage.upload(filePath, file)
      , ref: this.storage.ref(filePath)
    };
  }

}
