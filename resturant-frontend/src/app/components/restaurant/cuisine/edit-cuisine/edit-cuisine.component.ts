import { Component, OnInit } from '@angular/core';
import { CuisineService } from 'src/app/services/cuisine.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-cuisine',
  templateUrl: './edit-cuisine.component.html',
  styleUrls: ['./edit-cuisine.component.css']
})
export class EditCuisineComponent implements OnInit {

  id: string
  image: string
  messageClass: string
  message: string
  filesToUpload
  imageUrl = environment.imgUrl

  createCuisineForm = new FormGroup({
    foodName: new FormControl(''),
    quantity: new FormControl(''),
    unitPrice: new FormControl(''),
    description: new FormControl('')
  })

  constructor(
    private cuisineService: CuisineService,
    private activaRouter: ActivatedRoute
  ) { }

  fileChange(e) {
    this.filesToUpload = e.target.files;
  }

  ngOnInit(): void {
    this.id = this.activaRouter.snapshot.params.id
    this.cuisineService.getById(this.id).subscribe(result => {
      this.image = result['image']
      this.createCuisineForm.patchValue({
        foodName: result['foodName'],
        quantity: result['quantity'],
        unitPrice: result['unitPrice'],
        description: result['description']
      })
    })
  }

  editCuisine() {
    this.cuisineService.upload(this.createCuisineForm.value, this.filesToUpload).subscribe(result => {
      this.messageClass = "alert alert-success"
      this.message = "Cuisine Updated."
      setTimeout(() => {
        this.message = ""
        this.messageClass = ""
      }, 2000);
    })
  }

}
