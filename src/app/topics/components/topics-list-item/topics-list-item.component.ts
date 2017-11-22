import {Component, Input, OnInit} from '@angular/core';
import {Topic} from '../../models/topic.model';

@Component({
  selector: 'topics-list-item',
  templateUrl: './topics-list-item.component.html',
  styleUrls: ['./topics-list-item.component.scss']
})
export class TopicsListItemComponent implements OnInit {
  @Input() topic: Topic;
  
  constructor() { }

  ngOnInit() {
  }

}
