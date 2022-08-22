import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable,throwError} from 'rxjs' 
import  {map,catchError} from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  // url :any 
  // 'https://www.aljoury.net/myapi/api/'
  
  url = 'https://www.aljourycenter.com/myapi/api/' //  'http://127.0.0.1:82/traning/api/';
  apiKey = ''; // <-- Enter your own key here!
  constructor(private http:HttpClient ,private toastCtrl :ToastController) { 
    // let conn :string = localStorage.getItem('conn') 
    // this.url = conn + '/clinic/api/'
  }
 

  checkConn(){
    let login = localStorage.getItem('login')
    
    if (login === 'true'){
      return true
    }else{
      this.presentToast("الرجاء تسجيل الدخول", "danger")
      return false
    }
   
  }

  
  async presentToast(error ,color) {
    const toast = await this.toastCtrl.create({
      message: error,
      duration: 3000 ,
      position:'top',
      color:color,
      mode:'ios',
      cssClass:'custToast'
    });
    toast.present();  
  }
  

  handleError(error:HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
    return throwError('client error')
    
  } else { 
    return throwError(error.error) 
   }
  }
  

  // users 
  getUsers():Observable<any>{ 
    return this.http.get<any>(this.url+'users/read.php').pipe( 
       catchError(this.handleError) 
     );
  }
  createUser(userForm):Observable<any>{
    // invoiceForm =  {invo_id:null,pt_name:"",pt_age:"",pt_phone:"",datee:"",total:0,net_total:0,insurans:"",insur_price:0,status:"",user_id:0,device_id:0,user_name:""}
    console.log(userForm) 
      return this.http.post<any>(this.url+'users/create.php',
      userForm  
      ).pipe( 
         catchError(this.handleError) 
       );
    }

    updateUser(userForm):Observable<any>{
      // invoiceForm =  {invo_id:null,pt_name:"",pt_age:"",pt_phone:"",datee:"",total:0,net_total:0,insurans:"",insur_price:0,status:"",user_id:0,device_id:0,user_name:""}
      console.log(userForm) 
        return this.http.post<any>(this.url+'users/update.php',
        userForm  
        ).pipe( 
           catchError(this.handleError) 
         );
      }
      deleteUser(id):Observable<any>{
        console.log(id ,'dr')  
        let params = new HttpParams().append('id',id)
        return this.http.delete<any>(this.url+'users/delete.php', {params:params} ).pipe( 
           catchError(this.handleError) 
         );
      }

      login(username , password):Observable<any>{
      //  console.log(username ,'dr')  
        let params = new HttpParams().append('username',username)
      params =   params.append('password',password)
        return this.http.get<any>(this.url+'users/login.php', {params:params} ).pipe( 
           catchError(this.handleError) 
         );
      }


  //all dectors
    getSection():Observable<any>{ 
      return this.http.get<any>(this.url+'sections/read.php').pipe( 
         catchError(this.handleError) 
       );
    }

    //section offers
    getSectionOffer():Observable<any>{ 
      return this.http.get<any>(this.url+'sections/sectionOffer.php').pipe( 
         catchError(this.handleError) 
       );
    }
  //section offers
  sendMail(email):Observable<any>{ 
    let params = new HttpParams().append('email',email)
    return this.http.get<any>(this.url+'mailing/mail.php',{params:params} ).pipe( 
      catchError(this.handleError) 
    );
  }

  sendCourceMail(email,name,offerId,offerName,start,phone){
    let params = new HttpParams().append('email',email)
    params = params.append('name',name)
    params = params.append('offerId',offerId)
    params = params.append('offerName',offerName)
    params = params.append('start',start)
    params = params.append('phone',phone)
    return this.http.get<any>(this.url+'mailing/mailcource.php',  {params:params} 
    ).pipe( 
       catchError(this.handleError) 
     );
  }
 //section offers
 getOfferDetails(id):Observable<any>{ 
  let params = new HttpParams().append('offerId', id)
  return this.http.get<any>(this.url+'offerDetail/offerDetail.php'  , {params:params}).pipe( 
     catchError(this.handleError) 
   );
 }

 
uploadFile(data){
  let uploadURL = this.url+`upload.php`;
    return this.http.post<any>(uploadURL, data);
}

///create offer detail
createOfferDetail(doctorForm):Observable<any>{
  // invoiceForm =  {invo_id:null,pt_name:"",pt_age:"",pt_phone:"",datee:"",total:0,net_total:0,insurans:"",insur_price:0,status:"",user_id:0,device_id:0,user_name:""}
  console.log(doctorForm) 
    return this.http.post<any>(this.url+'offerDetail/create.php',
    doctorForm  
    ).pipe( 
       catchError(this.handleError) 
     );
  }

  updateOfferDetail(doctorForm):Observable<any>{
    // invoiceForm =  {invo_id:null,pt_name:"",pt_age:"",pt_phone:"",datee:"",total:0,net_total:0,insurans:"",insur_price:0,status:"",user_id:0,device_id:0,user_name:""}
    console.log(doctorForm) 
      return this.http.post<any>(this.url+'offerDetail/update.php',
      doctorForm  
      ).pipe( 
         catchError(this.handleError) 
       );
    }

    deleteOfferDetail(dr_id):Observable<any>{
    //  console.log(dr_id ,'dr')  
      let params = new HttpParams().append('id',dr_id)
      return this.http.delete<any>(this.url+'offerDetail/delete.php', {params:params} ).pipe( 
         catchError(this.handleError) 
       );
    }
  ///section
    
    createSection(doctorForm):Observable<any>{
      // invoiceForm =  {invo_id:null,pt_name:"",pt_age:"",pt_phone:"",datee:"",total:0,net_total:0,insurans:"",insur_price:0,status:"",user_id:0,device_id:0,user_name:""}
      console.log(doctorForm) 
        return this.http.post<any>(this.url+'sections/create.php',
        doctorForm  
        ).pipe( 
           catchError(this.handleError) 
         );
      }

      updateSection(doctorForm):Observable<any>{
        // invoiceForm =  {invo_id:null,pt_name:"",pt_age:"",pt_phone:"",datee:"",total:0,net_total:0,insurans:"",insur_price:0,status:"",user_id:0,device_id:0,user_name:""}
        console.log(doctorForm) 
          return this.http.post<any>(this.url+'sections/update.php',
          doctorForm  
          ).pipe( 
             catchError(this.handleError) 
           );
        }

        deleteSection(dr_id):Observable<any>{
          console.log(dr_id ,'dr')  
          let params = new HttpParams().append('id',dr_id)
          return this.http.delete<any>(this.url+'sections/delete.php', {params:params} ).pipe( 
             catchError(this.handleError) 
           );
        }
        //counter
        getCounter():Observable<any>{ 
          return this.http.get<any>(this.url+'counter/counter.php').pipe(
           //  map((res) =>  res),
             catchError(this.handleError) 
           );
        }
    // nursing
    getTeacher():Observable<any>{ 
      return this.http.get<any>(this.url+'teacher/read.php').pipe(
       //  map((res) =>  res),
         catchError(this.handleError) 
       );
    }

    createTeacher(nursingForm):Observable<any>{
      console.log(nursingForm) 
        return this.http.post<any>(this.url+'teacher/create.php',
        nursingForm  
        ).pipe( 
           catchError(this.handleError) 
         );
      }

      updateTeacher(nursingForm):Observable<any>{
        console.log(nursingForm) 
          return this.http.post<any>(this.url+'teacher/update.php',
          nursingForm  
          ).pipe( 
             catchError(this.handleError) 
           );
        }

        deleteTeacher(nurs_id):Observable<any>{
          console.log(nurs_id ,'nurs')  
          let params = new HttpParams().append('id',nurs_id)
          return this.http.delete<any>(this.url+'teacher/delete.php', {params:params} ).pipe( 
             catchError(this.handleError) 
           );
        }
 

     // lab_services
     getOffer():Observable<any>{ 
      return this.http.get<any>(this.url+'offer/read.php').pipe(
       //  map((res) =>  res),
         catchError(this.handleError) 
       );
    }

    createOffer(labForm):Observable<any>{
      console.log(labForm) 
        return this.http.post<any>(this.url+'offer/create.php',
        labForm  
        ).pipe( 
           catchError(this.handleError) 
         );
      }

      updateOffer(labForm):Observable<any>{
        console.log(labForm) 
          return this.http.post<any>(this.url+'offer/update.php',
          labForm  
          ).pipe( 
             catchError(this.handleError) 
           );
        }

        deleteOffer(labserv_id):Observable<any>{
          console.log(labserv_id ,'id')  
          let params = new HttpParams().append('id',labserv_id)
          return this.http.delete<any>(this.url+'offer/delete.php', {params:params} ).pipe( 
             catchError(this.handleError) 
           );
        }

        
      //  offerStudent
        offerStudent(offerId):Observable<any>{ 
          let params = new HttpParams().append('offerId',offerId)

          return this.http.get<any>(this.url+'student/offerStudent.php', {params:params}).pipe(
           //  map((res) =>  res),
             catchError(this.handleError) 
           );
        }

       // insurans
       getStudent():Observable<any>{ 
        return this.http.get<any>(this.url+'student/read.php').pipe(
         //  map((res) =>  res),
           catchError(this.handleError) 
         );
      }

      createStudent(InsurForm):Observable<any>{
        console.log(InsurForm) 
          return this.http.post<any>(this.url+'student/create.php',
          InsurForm  
          ).pipe( 
             catchError(this.handleError) 
           );
        }
  
        updateStudent(InsurForm):Observable<any>{
          console.log(InsurForm) 
            return this.http.post<any>(this.url+'student/update.php',
            InsurForm  
            ).pipe( 
               catchError(this.handleError) 
             );
          }
  
          deleteStudent(insur_id):Observable<any>{
            console.log(insur_id ,'insur_id')  
            let params = new HttpParams().append('id',insur_id)
            return this.http.delete<any>(this.url+'student/delete.php', {params:params} ).pipe( 
               catchError(this.handleError) 
             );
          }


 
   // get doctor pations
    getDoctorsPations(datee , serv_type ,serv_id ) :Observable<any>{  
      let params = new HttpParams().append('datee',datee)
       params =  params.append ('serv_type' ,serv_type)
       params = params.append ('serv_id' ,serv_id) 
       
      return this.http.get<any>(this.url+'invoice/groupDoctors.php',{params:params}).pipe(
         catchError(this.handleError) 
       );
    }
  // get  pations without meeting doctor
  gorupServicesOnly(datee , invo_type) :Observable<any>{  
    let params = new HttpParams().append('datee',datee) 
     params = params.append ('invo_type' ,invo_type) 
    return this.http.get<any>(this.url+'invoice/gorupServicesOnly.php',{params:params}).pipe(
       catchError(this.handleError) 
     );
  }
  //searchByName
 // get  pations without meeting doctor
 searchByName(pt_name) :Observable<any>{  
  let params = new HttpParams().append('pt_name',pt_name) 
   params = params.append ('pt_name' ,pt_name) 
  return this.http.get<any>(this.url+'invoice/searchByName.php',{params:params}).pipe(
     catchError(this.handleError) 
   );
}



// creatInvoice
createInvoice(invoiceForm):Observable<any>{
  // invoiceForm =  {invo_id:null,pt_name:"",pt_age:"",pt_phone:"",datee:"",total:0,net_total:0,insurans:"",insur_price:0,status:"",user_id:0,device_id:0,user_name:""}
  console.log(invoiceForm) 
    return this.http.post<any>(this.url+'invoice/create.php',
    invoiceForm  
    ).pipe( 
       catchError(this.handleError) 
     );
  }

// update Invoice
updateInvoice(invoiceForm):Observable<any>{
//  invoiceForm =  {invo_id:null,pt_name:"",pt_age:"",pt_phone:"",datee:"",total:0,net_total:0,insurans:"",insur_price:0,status:"",user_id:0,device_id:0,user_name:""}
  console.log(invoiceForm) 
    return this.http.post<any>(this.url+'invoice/update.php',
    invoiceForm  
    ).pipe( 
       catchError(this.handleError) 
     );
  }

//create multi service
    createMultiService(serv):Observable<any>{
      console.log('id,postion',serv) 
        return this.http.post<any>(this.url+'services/createMulti.php',
         serv 
        
        ).pipe( 
           catchError(this.handleError) 
         );
      }
      /// delete multi services
      deletetMultiServices(ptinvo_id):Observable<any>{ 
         let data : Array<any> =  [] 
          console.log(ptinvo_id) 
          data.push( {"ptinvo_id": +ptinvo_id} )

          let params = new HttpParams().append('ptinvo_id',ptinvo_id)
          return this.http.delete<any>(this.url+'services/deleteMultiServices.php', {params:params} ).pipe( 
             catchError(this.handleError) 
           );
        }

         
        deleteInvoice(invo_id):Observable<any>{  
           let params = new HttpParams().append('invo_id',invo_id)
           return this.http.delete<any>(this.url+'invoice/delete.php', {params:params} ).pipe( 
              catchError(this.handleError) 
            );
         }
      ///get invoice with service details

      getInvoiceDetails(invo_id):Observable<any>{  
        let params = new HttpParams().append('invo_id',invo_id)
        
        return this.http.get<any>(this.url+'invoice/invoiceDetails.php',{params:params}).pipe(
           catchError(this.handleError) 
         );
      }
       ///get invoice between 2 dates

       ionvoiceBetweenDates(datee1,datee2,serv_type):Observable<any>{  
        let params = new HttpParams().append('datee1',datee1)
        params = params.append ('datee2' ,datee2) 
        params = params.append ('serv_type' ,serv_type) 
        return this.http.get<any>(this.url+'invoice/invoceBetweenDate.php',{params:params}).pipe(
           catchError(this.handleError) 
         );
      }
 ///get invoice between 2 dates

 ionvoiceInDates(datee ,serv_type):Observable<any>{  
  let params = new HttpParams().append('datee',datee) 
  params = params.append ('serv_type' ,serv_type) 

  return this.http.get<any>(this.url+'invoice/invoceInDate.php',{params:params}).pipe(
     catchError(this.handleError) 
   );
}
//reorder pations
 
}
