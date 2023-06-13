import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input()
  page: number = 1;

  @Input()
  lastPage: number = 1;

  @Output()
  pageChange: EventEmitter<number> = new EventEmitter();

  previousPage(){
    if(this.page > 1){
      this.page -= 1;
      this.pageChange.emit(this.page)
    }
  }
  nextPage(){
    if(this.page < this.lastPage)
    {
      this.page += 1;
      this.pageChange.emit(this.page)
    }
  }
}
