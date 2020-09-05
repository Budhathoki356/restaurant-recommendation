import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  // sendData() {
  //   clearTimeout(time);
  //   time = setTimeout(() => {
  //     console.log(val)
  //   }, 500);
  // }
}
