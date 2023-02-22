import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {group} from "@angular/animations";

import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
 myForm: FormGroup;

 constructor(public fb: FormBuilder){
  this.myForm = this.fb.group({
    firstName: new FormControl(null,Validators.required),
    lastName: new FormControl(null,Validators.required),
    email: new FormControl(null,Validators.required),
    password: new FormControl(null,[Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl(null,Validators.required)
  },
    {
      validator: this.checkIfMatchingPassword("password", "confirmPassword")
    })
 }
  checkIfMatchingPassword(passwordKey: string, confirmPasswordKey: string){
   return(group: FormGroup) => {
     let password = group.controls[passwordKey];
     let confirmPassword = group.controls[confirmPasswordKey];

     if(password.value == confirmPassword.value){
       return;
     }
     else{
       confirmPassword.setErrors({
         notEqualToPassword: true
       })
     }
   }

  }

  onSubmit(signupform: any){
    let email: string = signupform.value.email;
    let password: string = signupform.value.password;

    auth.createUserWithEmailAndPassword(signupform, email, password).then((response)=>{
      console.log(response);
    }).catch((error)=>{
      console.log(error);
    })
  }
}

