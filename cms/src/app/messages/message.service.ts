import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Message[] = [];
  maxMessageId: number;

  @Output() messageSelectedEvent = new EventEmitter<Message>();
  @Output() messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) {
    this.getMessages();
  }

  getMessages() {
    this.http.get('https://wdd430-cms.firebaseio.com/messages.json').subscribe(
      //success method
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        })
        this.messageChangedEvent.emit(this.messages.slice());
      },
      //error method
      (error: any) => {
        console.log(error);
      });
  }

  storeMessages() {
    let stringData: string = JSON.stringify(this.messages.slice());
    const headers: HttpHeaders = new HttpHeaders().set('content-type', 'application/json');
    this.http.put(
      'https://wdd430-cms.firebaseio.com/messages.json', 
      stringData, 
      {'headers': headers}).subscribe(() => {
        this.messageChangedEvent.emit(this.messages.slice());
      })
  }

  getMessage(id: string) {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  getMaxId() {
    let maxId: number = 0;
    for (let message of this.messages) {
      let currentId: number = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
  
  addMessage(message: Message) {
    message.id = (this.getMaxId() + 1).toString();
    this.messages.push(message);
    this.storeMessages();
  }
}
