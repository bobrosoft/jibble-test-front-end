import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsListComponent } from './topics-list.component';
import {By} from '@angular/platform-browser';
import {Component, Input} from '@angular/core';

describe('TopicsListComponent', () => {
  let component: TopicsListComponent;
  let fixture: ComponentFixture<TopicsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockTopicsListItemComponent,
        TopicsListComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list elements', () => {
    expect(fixture.debugElement.queryAll(By.css('topics-list-item')).length).toBe(0);
    
    component.topics = [
      {
        user: {},
        post: {},
        album: {}
      } as any,
      {
        user: {},
        post: {},
        album: {}
      } as any
    ];

    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('topics-list-item')).length).toBe(2);
  });
});

@Component({
  selector: 'topics-list-item',
  template: ''
})
class MockTopicsListItemComponent {
  @Input() topic: any;
}