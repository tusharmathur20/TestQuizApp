import  Swal  from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../../service/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

category={
  title:'',
  description:''
}

  constructor(private _category:CategoryService,private _snack:MatSnackBar ) { }

  ngOnInit(): void {
  }
formSubmit(){
  if(this.category.title.trim()=='' ||this.category.title==null){
this._snack.open("Title is Requaired" ,'',{
  duration:3000,
} );
return
  }

  this._category.addCategory(this.category).subscribe(
    (data:any)=>{
      this.category.title=''
      this.category.description='';
      Swal.fire("Success !",'Category Successfully added','success')
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !",'Server Error','error')
    }
  )
}

}
