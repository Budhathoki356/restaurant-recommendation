import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-res-info',
  templateUrl: './res-info.component.html',
  styleUrls: ['./res-info.component.css']
})
export class ResInfoComponent implements OnInit {

  public restaurantForm: FormGroup;
  public message: string;
  public messageClass: string;
  public submitting: boolean = false;
  public selectedFile = null;
  public notRegistered = true;
  public restaurantDetail = [];
  public imageUrl = environment.imgUrl;

  constructor(
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router
  ) {
    this.createForm()
   
  }

  createForm() {
    this.restaurantForm = this.formBuilder.group({
      restaurantName: ['', Validators.required],
      contact: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])],
      location: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files
  }

  onRestaurantRegister() {
    this.submitting = true
    const restaurant = {
      restaurantName: this.restaurantForm.get('restaurantName').value,
      location: this.restaurantForm.get('location').value,
      phoneNo: this.restaurantForm.get('contact').value,
      description: this.restaurantForm.get('description').value
    }
    this.restaurantService.createRestaurant(restaurant, this.selectedFile).subscribe((data: any) => {
      this.messageClass = 'alert alert-success';
      this.message = 'Congratulation! Restaurant is registered.';
      this.notRegistered = false
    })
  }

  displayRestaurant(id: string) {
    this.restaurantService.getById(id).subscribe(
      (data: any) => {
        this.restaurantDetail.push(data)
        if (this.restaurantDetail.length != 0) this.notRegistered = false
      },
      (err) => {
        console.log(err)
      }
    )
  }

  deleteRestaurant(id, i) {
    let confrimRemove = confirm('Are you sure to Remove?');
    if (!confrimRemove) {
      return;
    }
    this.restaurantService.remove(id).subscribe(result => {
      this.messageClass = 'alert alert-successs'
      this.message = 'Restaurant Deleted.'
      this.restaurantDetail.slice(i, 1)
      this.notRegistered = true
      this.router.navigate([''])
    })
  }


  ngOnInit(): void {
    this.restaurantService.checkTheUser().subscribe(result => {
      if(result[0] !== undefined) {
        this.displayRestaurant(result[0]._id)
      }
    })
  }

}
