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

   sortAndSend() {
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
   }

   getDocuments() {
     this.http.get('http://localhost:3000/documents').subscribe(
       //success method
       (documents: any) => {
         console.log(documents);
         this.documents = documents.documents;
         this.sortAndSend();
       },
       //error method
       (error: any) => {
         console.log(error);
       });
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


  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }
   
  deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}
