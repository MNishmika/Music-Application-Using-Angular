import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NodeUtilityService } from '../node-utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  imageUrl: string = 'YOUR_IMAGE_URL_HERE'; // Replace 'YOUR_IMAGE_URL_HERE' with the actual image URL
  email: string = '';
  msg:string="";
  user:string="";
  constructor(private router: Router,private util:NodeUtilityService, private authService: AuthService) {}

  
  
  onSubmit(form: any) {
    this.util.insertlogin(form.value.username, form.value.password).subscribe((data) => {
        if (data.status){
          localStorage.setItem("user",form.value.username);
          console.log(this.user);
          this.msg = data.message;
          this.router.navigate(['/welcome']);
        }
      
        else{
          this.msg = data.message;
        }
        
      });
  }



}
