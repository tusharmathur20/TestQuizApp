import { QuestionServiceService } from './../../../service/question-service.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor:any = ClassicEditor;
  qid:any;
qTitle:any;
question:any={
  quiz:{},
  content:'',
  option1:'',
  option2:'',
  option3:'',
  option4:'',
  answer:'',
}

  constructor(private _route:ActivatedRoute,private _question:QuestionServiceService) { }

  ngOnInit(): void {
this.qid=this._route.snapshot.params.qid;
this.qTitle=this._route.snapshot.params.title;
this.question.quiz['qid']=this.qid;


  }
formSubmit(){
if(this.question.content.trim()=='' || this.question.content==null) {
  return;
}
if(this.question.option1.trim()=='' || this.question.option1==null) {
  return;
}

if(this.question.option2.trim()=='' || this.question.option2==null) {
  return;
}

if(this.question.option3.trim()=='' || this.question.option3==null) {
  return;
}
if(this.question.option4.trim()=='' || this.question.option4==null) {
  return;
}
if(this.question.answer.trim()=='' || this.question.answer==null) {
  return;
}
this._question.addQuestion(this.question).subscribe(
  (data:any)=>{
    Swal.fire('Success',"Question Added Succssfully",'success');
  this.question.content=''
  this.question.option1=''
  this.question.option2=''
  this.question.option3=''
  this.question.option4=''
  this.question.answer=''
  },
  
  (error)=>{
    Swal.fire('Error',"Error Occured while loading",'error');
  }
  )
}
}
