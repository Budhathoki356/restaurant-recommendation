import { Component, OnInit } from '@angular/core';
import { CuisineService } from 'src/app/services/cuisine.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-serach',
  templateUrl: './serach.component.html',
  styleUrls: ['./serach.component.css']
})
export class SerachComponent implements OnInit {

  searchItems
  searchForm = new FormGroup({
    location: new FormControl(''),
    foodName: new FormControl('')
  })

  constructor(
    private cuisineService: CuisineService
  ) { }

  onSearchSubmit() {
    this.cuisineService.search(this.searchForm.value).subscribe(result => {
      this.searchItems = result
      console.log(this.searchItems)
    })
  }

  ngOnInit(): void {
  }

}
