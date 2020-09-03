import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id:any;
  image: any;
  filesToUpload: any;
  imageUrl = environment.imgUrl
  message: string;
  messageClass: string;
  data: any

  editRestaurantForm = new FormGroup({
    restaurantName: new FormControl(''),
    phoneNo: new FormControl(''),
    location: new FormControl(''),
    description: new FormControl('')
  })

  constructor(
    private restaurantService: RestaurantService,
    private activeRouter: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params.id;
    this.restaurantService.getById(this.id).subscribe((result) => {
      this.image = result['image']
      this.editRestaurantForm.patchValue({
        restaurantName: result['restaurantName'],
        phoneNo: result['phoneNo'],
        location: result['location'],
        description: result['description']
      })
    })
  }

  onSubmit() {
    this.data = this.editRestaurantForm.value;
    this.data._id = this.id
    this.restaurantService.createRestaurant(this.data, this.filesToUpload).subscribe((result)=>{
      this.messageClass = 'alert alert-success';
      this.message = 'Restaurant Updated.';
      this.router.navigate(['/']);
    })
  }

  fileChange(e) {
    this.filesToUpload = e.target.files;
  }

}
