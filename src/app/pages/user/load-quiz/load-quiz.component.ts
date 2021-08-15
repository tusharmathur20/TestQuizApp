import { QuizService } from './../../../service/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
catId:any;
quizzes:any;

  constructor(private _route:ActivatedRoute,private _quiz:QuizService) { }

  ngOnInit(): void {
  
 
this._route.params.subscribe((params)=>{
  this.catId =params.catId;
  if(this.catId==0){
    console.log("Load all the quiz");
    this._quiz.getActiveQuizzes().subscribe((
      data:any)=>{
        this.quizzes=data;
      },
      (error)=>{
  console.log(error);
  alert("Error while loading quiz")
      }
      )
  }else{
    console.log("Load Specrific quiz")
    this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
        alert("error while loading")
      }
    )
  }
})
  
}

}
