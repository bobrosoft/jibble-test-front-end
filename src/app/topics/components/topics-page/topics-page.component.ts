import {Component, OnInit} from '@angular/core';
import {TopicsService} from '../../services/topics/topics.service';
import {Observable} from 'rxjs/Observable';
import {Topic} from '../../models/topic.model';

@Component({
  selector: 'topics-page',
  templateUrl: './topics-page.component.html',
  styleUrls: ['./topics-page.component.scss']
})
export class TopicsPageComponent implements OnInit {
  topics$: Observable<Topic[]> = this.topicsService.topics$;
  
  constructor(
    protected topicsService: TopicsService
  ) { }

  ngOnInit() {
    // Loading topics from server
    this.topicsService.loadTopics().subscribe();
  }

  onPostTitleChange(event: {title: string, topic: Topic}) {
    this.topicsService.updatePostTitleForTopic(event.title, event.topic);
  }

  onDeleteItem(topic: Topic) {
    this.topicsService.deleteTopic(topic);
  }
}
