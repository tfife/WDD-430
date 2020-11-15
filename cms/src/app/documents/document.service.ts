import { Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  maxDocumentId: number;

  @Output() documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    this.getDocuments();
   }

   getDocuments() {
     this.http.get('https://wdd430-cms.firebaseio.com/documents.json').subscribe(
       //success method
       (documents: Document[]) => {
         this.documents = documents;
         this.maxDocumentId = this.getMaxId();
         this.documents.sort((a, b) => {
           if (a.name < b.name) {
             return -1;
           }
           if (a.name > b.name) {
             return 1;
           }
           return 0;
         })
         this.documentListChangedEvent.next(this.documents.slice());
       },
       //error method
       (error: any) => {
         console.log(error);
       });
   }

   storeDocuments() {
     let stringData: string = JSON.stringify(this.documents.slice());
     const headers: HttpHeaders = new HttpHeaders().set('content-type', 'application/json');
     this.http.put(
       'https://wdd430-cms.firebaseio.com/documents.json', 
       stringData, 
       {'headers': headers}).subscribe(() => {
         this.documentListChangedEvent.next(this.documents.slice());
       })
   }

   getDocument(id: string) {
     for (let document of this.documents) {
       if (document.id === id) {
         return document;
       }
     }
     return null;
   }

   getMaxId(): number {
     let maxId: number = 0;
     for (let document of this.documents) {
       let currentId: number = +document.id;
       if (currentId > maxId) {
         maxId = currentId;
       }
     }
     return maxId;
   }

   addDocument(newDocument: Document) {
     if (!newDocument) {
       return;
     }
     this.maxDocumentId++;
     newDocument.id = this.maxDocumentId.toString();
     this.documents.push(newDocument);
     this.storeDocuments();
   }

   updateDocument(originalDocument: Document, newDocument: Document) {
     if (!originalDocument || !newDocument) {
       return;
     }
    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
   }
   
   deleteDocument(document: Document) {
    if(!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.storeDocuments();
  }
}
