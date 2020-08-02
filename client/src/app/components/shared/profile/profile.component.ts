import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile = {};

  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this._userService.getUserProfile().subscribe(
      data => {
        this.userProfile = data
      },
      error => {
        console.log(error)
      })
  }

}
