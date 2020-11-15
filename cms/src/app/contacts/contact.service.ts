import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  maxContactId: number;

  @Output() contactSelectedEvent = new EventEmitter<Contact>();
  @Output() contactChangedEvent = new EventEmitter<Contact[]>();
  @Output() contactListChangedEvent = new Subject<Contact[]>();
  @Output() contactListReadyEvent = new Subject<void>();

  constructor(private http: HttpClient) {
    this.getContacts();
   }

   getContacts() {
    this.http.get('https://wdd430-cms.firebaseio.com/contacts.json').subscribe(
      //success method
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
        this.contactListChangedEvent.next(this.contacts.slice());
        this.contactListReadyEvent.next();
      },
      //error method
      (error: any) => {
        console.log(error);
      });
    }
    
    storeContacts() {
      let stringData: string = JSON.stringify(this.contacts.slice());
      const headers: HttpHeaders = new HttpHeaders().set('content-type', 'application/json');
     this.http.put(
       'https://wdd430-cms.firebaseio.com/contacts.json', 
       stringData, 
       {'headers': headers}).subscribe(() => {
         this.contactListChangedEvent.next(this.contacts.slice());
       })
   }

   getContact(id: string) {
     for (let contact of this.contacts) {
       if (contact.id === id) {
         return contact
       }
     }
     return null;
   }

   getMaxId(): number {
    let maxId: number = 0;
    for (let contact of this.contacts) {
      let currentId: number = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addcontact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
   let pos = this.contacts.indexOf(originalContact);
   if (pos < 0) {
     return;
   }

   newContact.id = originalContact.id;
   this.contacts[pos] = newContact;
   this.storeContacts();
  }

   deleteContact(contact: Contact) {
    if(!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.storeContacts();
  }
}
