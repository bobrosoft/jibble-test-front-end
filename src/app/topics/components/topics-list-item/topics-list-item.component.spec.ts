import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TopicsListItemComponent} from './topics-list-item.component';

describe('TopicsListItemComponent', () => {
  let component: TopicsListItemComponent;
  let fixture: ComponentFixture<TopicsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsListItemComponent);
    component = fixture.componentInstance;
    component.topic = {
      post: {
        id: 1,
        userId: 1,
        title: 'sdfdsf',
        body: 'dsfdsfdsf',
      },
      album: {
        id: 1,
        title: 'ssdfdsfs',
        userId: 1
      },
      user: {
        id: 1,
        name: 'DSFdsfsdfsdf',
        username: 'bobr',
        email: 'sdfdsf@sdfdsfdsf.io'
      }
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
