import {Component, Input, OnInit} from '@angular/core';
import {Topic} from '../../models/topic.model';

@Component({
  selector: 'topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.scss']
})
export class TopicsListComponent implements OnInit {
  @Input() topics: Topic[];
  
  constructor() { }

  ngOnInit() {
  }

}
