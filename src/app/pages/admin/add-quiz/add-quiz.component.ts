import { QuizService } from './../../../service/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import  Swal  from 'sweetalert2';
import { CategoryService } from './../../../service/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
categories:any=[];
quizData:any={
  title:'',
  description:'',
  maxMarks:'',
  numberOfQuestions:'',
  active:true,
  category:{
    cid:'',

  },
}
  constructor(private _cat:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
//category load 
this.categories=data;
console.log(this.categories);
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error','Error while loading data','error');
        }
    )
  }



  addQuiz(){
  if(this.quizData.title.trim()=='' || this.quizData.title==null){
    this._snack.open("Title Required ",'',{
      duration:3000,
    })
    return;
  }
  //validation...

  //call server
this._quiz.addQuiz(this.quizData).subscribe((data:any)=>{
  Swal.fire('Success','Quiz added Successfully','success');
 this. quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
  
    },
  }
},
(error)=>{
  Swal.fire('Error','Error while loading data','error');
  console.log(error);
})
  }
}
