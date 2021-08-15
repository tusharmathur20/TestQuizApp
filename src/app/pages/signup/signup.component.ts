import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private UserService:UserService,private snack:MatSnackBar) { }


  public user={
    userName:'',
    password:'',
	 firstName:'',
	lastName:'',
	 email:'',
 phone:'',

  }


  ngOnInit(): void {
  }





  formSubmit(){
    console.log(this.user);
    if(this.user.userName=='' || this.user.userName==null){
      // alert('User is Required')
      this.snack.open("Username is required !!",'',{
       duration:3000 ,
   
      })
      return;
    }
 

  //addUser :User Servie

  this.UserService.addUser(this.user).subscribe(
    (data:any)=>{
//Success
console.log(data);
// alert("success");
Swal.fire('Success !! ','User Id  ' +data.id+ ' Successfully Registered','success')
    },
    (error)=>{
      //error
      console.log(error);
      // alert("Something went wrong")
      this.snack.open(error.error.text, '', {
        duration: 3000,
    })
    }
  )
}
}
