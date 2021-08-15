import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../../service/category.service';
import { QuizService } from './../../../service/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _cat:CategoryService,private _snack:MatSnackBar,private _router:Router) { }
qid=0;
quiz:any;
categories:any;
  ngOnInit(): void {
  
 this.qid= this._route.snapshot.params.qid;
//  alert(this.qid);
this._quiz.getQuiz(this.qid).subscribe(
  (data:any)=>{
    this.quiz=data;
    console.log(this.quiz);
  },
  (error)=>{
    console.log(error); 
   }
)
  
this._cat.categories().subscribe
((data:any)=>{
  this.categories=data;

},
(error)=>{
  alert("Error while loading categories")
}
)
  }


  //Update
  public updateForm(){
//validate
if(this.quiz.title.trim()=='' || this.quiz.title==null){
  this._snack.open("Title Required ",'',{
    duration:3000,
  })
  return;
}
this._quiz.upDateQuiz(this.quiz).subscribe((data)=>{
  Swal.fire('Success','Updated Successfully','success').then((e)=>{
    this._router.navigate(['/admin/quizzes'])
  })
},
(error)=>{
  Swal.fire('Error','Error while updating','error');
  console.log(error);
})
  }
}
