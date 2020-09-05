import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.css']
})
export class SearchItemsComponent implements OnInit {

  imageUrl = environment.imgUrl
  @Input() searchItems: any

  constructor() { }

  ngOnInit(): void {
  }

}
