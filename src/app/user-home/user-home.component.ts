import { Component, OnInit } from '@angular/core';
import { AppCommonService } from '../services/app-common.service';
import { InterviewQuestionsModel } from '../models/InterviewQuestionsModel.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  public categoryList= [
    "Javascript",
    "CSS",
    "HTML",
    "Angular",
    "React",
    "Node.js",
    "Java",
    "Python",
    "Testing"
  ]
  public interviewQuestionsDetails: Array<InterviewQuestionsModel> = [];
  public interviewQuestionsDetailsBackend: Array<InterviewQuestionsModel> = [];
  public selectedCategory: any;
  public selectedCategoryList: any[] = [];
  public filteredInterviewQuestionsDetails: Array<InterviewQuestionsModel> = [];
  public displayNoRecords: boolean = false;
  public searchTerm:any;
  public interviewQuestionCount: number = 0;
  public showMoreText: boolean = false;

  constructor(private service: AppCommonService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getInterviewQuestionsData();
  }

  getInterviewQuestionsData(){
    this.service.getInterviewQuestionsData().subscribe(response => {
      if(typeof(response) != 'undefined' && response != null){
        this.interviewQuestionsDetails = response;
        this.interviewQuestionsDetails.forEach(questions=> {
          this.httpClient.get(questions.content_url, { responseType: 'text' }).subscribe(data => {
            questions.content = data;
            const contentDisplay = document.getElementById(questions._id);
            contentDisplay!.innerHTML = data;
          });
          console.log(this.interviewQuestionsDetails);
          this.interviewQuestionsDetailsBackend = this.interviewQuestionsDetails;
          this.interviewQuestionCount = this.interviewQuestionsDetails.length;
        });
        this.displayNoRecords = false;
      }
    });
  }

  onClickTitle(details: any){
    window.open(details.reference_url, "_blank");
  }

  onCategorySelect(event: any){
    this.displayNoRecords = false;
    this.filteredInterviewQuestionsDetails = [];
    this.selectedCategory = event.target.name;
    if(typeof(event) != 'undefined' && event != null){
      if(event.target.name && event.target.checked){
        let index = this.selectedCategoryList.findIndex(elm => elm === event.target.name);
        if(index == -1){
          this.selectedCategoryList.push(event.target.name);
        }
      }else if(!event.target.checked){
        let index = this.selectedCategoryList.findIndex(elm => elm === event.target.name);
        this.selectedCategoryList.splice(index, 1);
      }
      console.log(this.selectedCategoryList);
      if(this.selectedCategoryList && this.selectedCategoryList.length > 0){
        this.selectedCategoryList.forEach(category => {
          let tempList:any = [];
          tempList = this.interviewQuestionsDetailsBackend.filter(elm => elm.category === category);
          if(tempList && tempList.length > 0){
            tempList.forEach((data:any) => {
              this.filteredInterviewQuestionsDetails.push(data);
            });
          }
        });
      }else{
        this.displayNoRecords = false;
        this.getInterviewQuestionsData();
      }
      if(this.filteredInterviewQuestionsDetails && this.filteredInterviewQuestionsDetails.length > 0){
        this.interviewQuestionsDetails = this.filteredInterviewQuestionsDetails;
        this.interviewQuestionCount = this.interviewQuestionsDetails.length;
      }else{
        this.interviewQuestionsDetails = [];
        this.interviewQuestionCount = this.interviewQuestionsDetails.length;
      }
      if(this.interviewQuestionsDetails.length === 0){
        this.displayNoRecords = true;
        this.interviewQuestionCount = this.interviewQuestionsDetails.length;
      }
    }
    
  }

  onClearAll(){
    this.selectedCategoryList = [];
    let inputElm = document.getElementsByTagName('input');
    for(let i = 0; i < inputElm.length; i++){
      inputElm[i].checked = false;
    }
    this.getInterviewQuestionsData();
  }

  onClickMore(id:any){
    this.showMoreText = true;
    const content = document.getElementById(id);
    content!.style.overflow = "visible";
    content!.style.height = "auto";
    content!.style.display = "block";
  }

  onClickLess(id:any){
    this.showMoreText = false;
    const content = document.getElementById(id);
    content!.style.overflow = "hidden";
    content!.style.width = "100%";
    content!.style.display = "-webkit-box";
  }

}
