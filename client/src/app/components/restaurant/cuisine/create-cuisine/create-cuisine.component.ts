import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CuisineService } from 'src/app/services/cuisine.service';

@Component({
  selector: 'app-create-cuisine',
  templateUrl: './create-cuisine.component.html',
  styleUrls: ['./create-cuisine.component.css']
})
export class CreateCuisineComponent implements OnInit {
  result;
  filesToUpload;
  messageClass;
  message;

  createCuisineForm = new FormGroup({
    foodName: new FormControl(''),
    quantity: new FormControl(''),
    unitPrice: new FormControl(''),
    foodCategory: new FormControl(''),
    description: new FormControl(''),
  })
  constructor(
    private cuisineService: CuisineService,
  ) { }

  createCuisine() {
    this.cuisineService.upload(this.createCuisineForm.value, this.filesToUpload).subscribe( result => {
      this.messageClass = "alert alert-success"
      this.message = "Cuisine Added."
      setTimeout(() => {
        this.messageClass = ""
        this.message = ""
      }, 2000);
      this.createCuisineForm.reset()
    })
  }

  fileChange(e) {
    this.filesToUpload = e.target.files;
  }

  ngOnInit(): void {
  }

}
