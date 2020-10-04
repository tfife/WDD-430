import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'Super Important Message', 'Hi, how are you?', 'Larry Zelda'),
    new Message('2', 'Re: Super Important Message', 'Hi Larry, I\'m doing fine. How about yourself?', 'Devin Azkaban'),
    new Message('2', 'Don\'t hit reply all', 'Don\'t click "reply all." If you click reply all we all see it, so just reply to the person you\'re actually talking to', 'Cole McDonald')
  ];

  constructor() { }

  ngOnInit(): void {
  }
  
  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
