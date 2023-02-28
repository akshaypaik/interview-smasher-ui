import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchInterviewQuestions'
})
export class SearchInterviewQuestionsPipe implements PipeTransform {

  transform(list: any, args?: any): any[] {

    if(!list) return [];
    if(!args) return list;

    args = args.toLowerCase();

    return list.filter(function(item:any){
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }

}
