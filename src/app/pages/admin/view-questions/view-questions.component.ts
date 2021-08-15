import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionServiceService } from './../../../service/question-service.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
qid:any;
qTitle:any;
questions:any=[];
  constructor(private _route:ActivatedRoute,
    private _question:QuestionServiceService,
    private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qid=this._route.snapshot.params.qid;
    this.qTitle=this._route.snapshot.params.title;
    this._question.getQuestions(this.qid).subscribe((data:any)=>{
      console.log(data);
      this.questions=data;
    },
    
    (error)=>{
      console.log(error);
    })
    console.log(this.qid);
    console.log(this.qTitle);
  }
  deleteQuestion(qid:any){
Swal.fire({
  icon:'info',
  showCancelButton:true,
  confirmButtonText:'Delete',
  title:'Are you sure , Want to delete this Question ?'
}).then((result)=>{
  if(result.isConfirmed){
    this._question.deleteQuestion(qid).subscribe((data)=>{
this._snack.open('Question Deleted Successfully','',{
  duration:3000,
});
this.questions=this.questions.filter((q:any)=>q.quesId!=qid)
    },
    
    (error)=>{
      this._snack.open("Error While Deleting",'',{
        duration:3000,
      });
      console.log(error)
    })
  } 
})
  }
}
