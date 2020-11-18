import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';

@Component({
  selector: 'rmzone-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User(
    1, 'Tori Fife', 
    'assets/img/me.jpg', 
    new Date('2017-01-11'), 
    new Date('2018-06-22'), 
    1, 
    []);

  constructor() { }

  ngOnInit(): void {
  }

}
