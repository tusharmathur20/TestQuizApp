import  Swal from 'sweetalert2';
import { QuizService } from './../../../service/quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
quizzes:any=[];

  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {
    
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
        // console.log("JE::")
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading data !', 'error');
      })
  }
//delte QUiz


deleteQuiz(qid:any){
  Swal.fire({
    icon:'info',
    title:"Are you sure",
    confirmButtonText:'Delete',
    showCancelButton:true,
  }).then((result)=>{
    if(result.isConfirmed){
      this._quiz.deleteQuiz(qid).subscribe(
        (data:any)=>{
          this.quizzes=this.quizzes.filter((quiz:any)=>quiz.qid !=qid);
          Swal.fire('Success','Quiz Deleted','success');
        },
        (error)=>{
          Swal.fire('Error','Error while deleting','error');
        }
      )
    }
  })

}
}
