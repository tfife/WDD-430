import { EventEmitter, Injectable, Output } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS'

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[];
  @Output() contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

   getContacts() {
     return this.contacts.slice();
   }

   getContact(id: string) {
     for (let contact of this.contacts) {
       if (contact.id === id) {
         return contact
       }
     }
     return null;
   }
}
