import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Topic} from '../../models/topic.model';

@Component({
  selector: 'topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.scss']
})
export class TopicsListComponent implements OnInit {
  @Input() topics: Topic[];
  @Output() postTitleChange = new EventEmitter<{title: string; topic: Topic}>();
  @Output() deleteItem = new EventEmitter<Topic>();
  
  constructor() { }

  ngOnInit() {
  }

  onPostTitleChange(title: string, topic: Topic) {
    // Proxy things up
    this.postTitleChange.emit({title: title, topic: topic});
  }

  onDeleteItemClick(topic: Topic) {
    // Proxy things up
    this.deleteItem.emit(topic);
  }
}
