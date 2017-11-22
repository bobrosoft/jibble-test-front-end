import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsPageComponent } from './topics-page.component';
import {TopicsService} from '../../services/topics/topics.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('TopicsPageComponent', () => {
  let component: TopicsPageComponent;
  let fixture: ComponentFixture<TopicsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: TopicsService, useClass: MockTopicsService}
      ],
      declarations: [ TopicsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockTopicsService {
  topics$ = Observable.of([]);

  loadTopics() {
    return Observable.of([]);
  }
}