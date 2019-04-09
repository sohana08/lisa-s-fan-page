import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  firstClick() {
    console.log('I am CLICKED');
  }


}
