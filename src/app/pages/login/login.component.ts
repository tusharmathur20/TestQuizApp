import { Router } from '@angular/router';
import { LoginService } from './../../service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginData={
  userName:'',
  password:''
}


  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router) { }

  ngOnInit(): void {

  }


  formSubmit(){
    console.log("Button Clicked");

    if(this.loginData.userName.trim()==''||this.loginData.userName==null){
      this.snack.open("Username is required !!", "",{
        duration:3000,
      });
      return;
    }
    if(this.loginData.password.trim()==''||this.loginData.password==null){
      this.snack.open("Password is required !!", "",{
        duration:3000,
      });
      return;


   
    }
       //Request to server to generate token
       this.login.generateToken(this.loginData).subscribe(
        (data:any)=>{
          console.log('success');
          console.log(data);
          

          //Login
          this.login.loginUser(data.token);

          this.login.getCurrentUser().subscribe(
            (user:any)=>{
              this.login.setUser(user);
              console.log(user);
              //Redirect ...ADMIN Dashboard
              //Redirect  ...Normal Dashboard
              if(this.login.getUserRole()=='ADMIN'){
              // window.location.href='/admin';
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
              }
              else if(this.login.getUserRole()== 'NORMAL'){ 
                // window.location.href=
                // '/user-dashboard';
                this.router.navigate(['user-dashboard/0']);
                this.login.loginStatusSubject.next(true);
              }else{
                this.login.logout();

              }
            });
          },
        (error)=>{
          console.log('Error !');
          console.log(error);
          this.snack.open("Invalid Credentials !!",'',{
            duration:3000,
          });
        }
      )
  }

}
