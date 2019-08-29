import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-singlebook',
  templateUrl: './singlebook.component.html',
  styleUrls: ['./singlebook.component.css']
})
export class SinglebookComponent implements OnInit {
  @Input()
  book
  
  constructor() { }

  ngOnInit() {
  }

}
