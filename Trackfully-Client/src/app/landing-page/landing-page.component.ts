import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service'; //imports function from user service
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AutheticationService } from '../service/authetication.service';
import { EmailValidator, NgForm } from '@angular/forms';
import { Validators, FormGroup, FormControl } from '@angular/forms';

// import {NgForm, FormGroup, FormControl, FormArray} from '@angular/forms';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [ UserService ]

})
export class LandingPageComponent implements OnInit {
  isValidForm = true;
  
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; //regex for email validation

  constructor(private router: Router, private loginservice : AutheticationService ) {
    this.user = new User();
   }


  ngOnInit() {}

  loginFailSuccess(results: any) {
    console.log("results: " + results.status);
    if (results.status === "success" && this.user.email.trim.length!==0 && this.user.password.length !== 0) {
      sessionStorage.setItem("email", this.user.email);
      this.router.navigate([`/symptom-manage-form`]); //should route to desktop for exisiting user
      this.isValidForm = true;
    } else {
      this.router.navigate([`/`]);
      this.isValidForm = false;
    }
  }

  checkLogin() {
    console.log(this.user);
    this.loginservice.authenticate(this.user).subscribe((result) => {
      this.loginFailSuccess(result);
    }
  ,
    error => {
      console.log("Authentication Error");
    })

}
  
}
