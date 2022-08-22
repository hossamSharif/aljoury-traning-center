import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
 

export interface section {
  id?: string,
  shortDescr: string,
  title: string,
  imgUrl:String
}
export interface student {
  id?: string,
  name: string,
  email: string,
  phone:String,
  offerId:String

}
export interface offer {
  id?: string,
  title:String,
  dailyTime: string,
  hourCount: string, 
  price:Number,
  price_note:String,
  start:Date,
  sectionId:String,
  shortDescr:String,
  teacher:String,
  imgUrl:String ,
  newLbl:Number,  

}

export interface sectionD 
{
  id?: string,
  shortDescr: string,
  title: string,
  imgUrl:String,
  offers:{
    id?: string,
    title:String,
    dailyTime: string,
    hourCount: string,
    hournote: string,
    price:Number,
    priceNote:String,
    start:Date,
    sectionId:String,
    shortDescr:String,
    teacher:String,
    imgUrl:String
  }
}

export interface teacher {
  id?: string,
  shortDescr: string,
  name: string,
  imgUrl:String

}
export interface offerDetail {
  id?: string,
  offerId: string,
  descrb: string
}
@Injectable({
  providedIn: 'root'
})

export class AppserviceService {
private sectionD : Array<any> = [];

  private sections: Observable<section[]>;
  private sectionCollection: AngularFirestoreCollection<section>;
 
  private offers: Observable<offer[]>;
  private offerCollection: AngularFirestoreCollection<offer>; 

  private teachers: Observable<teacher[]>;
  private teacherCollection: AngularFirestoreCollection<teacher>;

  private offerDetails: Observable<offerDetail[]>;
  private offerDetailCollection: AngularFirestoreCollection<offerDetail>;

  private students: Observable<student[]>;
  private studentCollection: AngularFirestoreCollection<student>;

  

  constructor(private afs: AngularFirestore )  {
     
    this.sectionCollection = this.afs.collection<section>('sections');
    this.sections = this.sectionCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data(); 
          const id = a.payload.doc.id; 
          return { id, ...data };
        });
      })
    );

     this.offerCollection = this.afs.collection<offer>('offers');
    this.offers = this.offerCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data(); 
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.teacherCollection = this.afs.collection<teacher>('teachers');
    this.teachers = this.teacherCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          // console.log("data",data)
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.offerDetailCollection = this.afs.collection<offerDetail>('offerDetail');
    this.offerDetails = this.offerDetailCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data(); 
          const id = a.payload.doc.id; 
          return { id, ...data };
        });
      })
    );
  }

 


  getSections(): Observable<section[]> {
    return this.sections; 
  }
 
  getSection(id: string): Observable<section> {
    return this.sectionCollection.doc<section>(id).valueChanges().pipe(
      take(1),
      map(section => {
        section.id = id;
        return section
      })
    );
  }
 
  addSection(section: section): Promise<DocumentReference> {
    return this.sectionCollection.add(section);
  }
 
  updateSection(section: section): Promise<void> {
    return this.sectionCollection.doc(section.id).update({ shortDescr: section.shortDescr, title: section.title });
  }
 
  deleteSection(id: string): Promise<void> {
    return this.sectionCollection.doc(id).delete();
  }



////
getOffers(): Observable<offer[]> {
  return this.offers; 
}

getOffer(id: string): Observable<offer> {
  return this.sectionCollection.doc<offer>(id).valueChanges().pipe(
    take(1),
    map(offer => {
      offer.id = id;
      return offer
    })
  );
}
///get offers section
 
getOffersSection(id: string): Observable<offer[]> {
  this.offerCollection = this.afs.collection('offers', ref => ref.where('sectionId', '==', id));
  this.offers = this.offerCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data(); 
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
  
  return this.offers; 
}




addOffer(offer: offer): Promise<DocumentReference> {
  return this.offerCollection.add(offer);
}

updateOffer(offer: offer): Promise<void> {
  return this.offerCollection.doc(offer.id).update({teacher:offer.teacher,shortDescr:offer.shortDescr,title:offer.title, start:offer.start,dailyTime: offer.dailyTime, hourCount: offer.hourCount, sectionId:offer.sectionId,price:offer.price,price_note:offer.price_note });
}

deleteOffer(id: string): Promise<void> {
  return this.offerCollection.doc(id).delete();
}
//////
getTeachers(): Observable<teacher[]> {
  return this.teachers;

}

getTeacher(id: string): Observable<teacher> {
  return this.sectionCollection.doc<teacher>(id).valueChanges().pipe(
    take(1),
    map(teacher => {
      teacher.id = id;
      return teacher
    })
  );
}

addTeacher(teacher: teacher): Promise<DocumentReference> {
  return this.teacherCollection.add(teacher);
}

updateTeacher(teacher: teacher): Promise<void> {
  return this.teacherCollection.doc(teacher.id).update({ shortDescr: teacher.shortDescr, name: teacher.name });
}

deleteTeacher(id: string): Promise<void> {
  return this.teacherCollection.doc(id).delete();
}



///
getOfferDetails(id: string): Observable<offerDetail[]> {
  this.offerDetailCollection = this.afs.collection('offerDetail', ref => ref.where('offerId', '==', id));
  this.offerDetails = this.offerDetailCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        // console.log("dataoffer",data)
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  ); 
  return this.offerDetails; 
}

   ////get all
  getAllOfferDetails(): Observable<offerDetail[]> { 
    return this.offerDetails; 
  }

addOfferDetail(offerDetail: offerDetail): Promise<DocumentReference> {
  return this.offerDetailCollection.add(offerDetail);
}
 
deleteOfferDetail(id: string): Promise<void> {
  return this.offerDetailCollection.doc(id).delete();
}
////

getStudents(id: string): Observable<student[]> {
  this.studentCollection = this.afs.collection('students', ref => ref.where('offerId', '==', id));
  this.students = this.studentCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        // console.log("datastudentoffer",data)
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
 
  
  return this.students; 
}

 

addStudent(student: student): Promise<DocumentReference> {
  return this.studentCollection.add(student);
}
 
deleteStudent(id: string): Promise<void> {
  return this.studentCollection.doc(id).delete();
}
}
