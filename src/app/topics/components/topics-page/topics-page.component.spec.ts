import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { TopicsPageComponent } from './topics-page.component';
import {TopicsService} from '../../services/topics/topics.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Topic} from '../../models/topic.model';
import {By} from '@angular/platform-browser';

describe('TopicsPageComponent', () => {
  let component: TopicsPageComponent;
  let fixture: ComponentFixture<TopicsPageComponent>;
  let injector: TestBed;
  let topicsService: MockTopicsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: TopicsService, useClass: MockTopicsService}
      ],
      declarations: [
        MockTopicsListComponent,
        TopicsPageComponent
      ]
    })
    .compileComponents();

    injector = getTestBed();
    topicsService = injector.get(TopicsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should perform topic title update on postTitleChange event received', () => {
    const event: any = {title: 'dsfdsf', topic: {id: 1}};
    spyOn(topicsService, 'updatePostTitleForTopic');

    const list = fixture.debugElement.query(By.css('topics-list'));
    expect(list).toBeDefined();

    list.componentInstance.postTitleChange.emit(event);
    fixture.detectChanges();

    expect(topicsService.updatePostTitleForTopic).toHaveBeenCalledWith(event.title, event.topic);
  });

  it('should perform delete on deleteItem event received', () => {
    const topic: any = {id: 1};
    spyOn(topicsService, 'deleteTopic');

    const list = fixture.debugElement.query(By.css('topics-list'));
    expect(list).toBeDefined();

    list.componentInstance.deleteItem.emit(topic);
    fixture.detectChanges();

    expect(topicsService.deleteTopic).toHaveBeenCalledWith(topic);
  });
});

class MockTopicsService {
  topics$ = Observable.of([]);

  loadTopics() {
    return Observable.of([]);
  }

  updatePostTitleForTopic(newTitle: string, topic: Topic) {
  }

  deleteTopic(topic: Topic) {
  }
}

@Component({
  selector: 'topics-list',
  template: ''
})
class MockTopicsListComponent {
  @Input() topics: any;
  @Output() postTitleChange = new EventEmitter<{title: string; topic: Topic}>();
  @Output() deleteItem = new EventEmitter<Topic>();
}