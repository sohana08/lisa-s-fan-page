import { Component, OnInit } from '@angular/core';
import { USERS } from '../mock-user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  users = USERS;
  constructor() { }

  ngOnInit() {
  }
}
