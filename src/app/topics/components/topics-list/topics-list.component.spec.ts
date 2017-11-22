import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsListComponent } from './topics-list.component';
import {By} from '@angular/platform-browser';
import {Component, EventEmitter, Input, Output} from '@angular/core';

describe('TopicsListComponent', () => {
  let component: TopicsListComponent;
  let fixture: ComponentFixture<TopicsListComponent>;
  
  const mockItems = () => {
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
  };

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

    mockItems();
    
    expect(fixture.debugElement.queryAll(By.css('topics-list-item')).length).toBe(2);
  });

  it('should proxy postTitleChange event with proper data', () => {
    let event: any;
    component.postTitleChange.subscribe(e => event = e);
    mockItems();

    const item = fixture.debugElement.queryAll(By.css('topics-list-item'))[0];
    expect(item).toBeDefined();

    item.componentInstance.postTitleChange.emit('new title');
    fixture.detectChanges();
    
    expect(event).toBeDefined();
    expect(event.title).toBe('new title');
    expect(event.topic).toBe(item.componentInstance.topic);
  });

  it('should proxy delete event with proper data', () => {
    let event: any;
    component.deleteItem.subscribe(e => event = e);
    mockItems();

    const item = fixture.debugElement.queryAll(By.css('topics-list-item'))[0];
    expect(item).toBeDefined();

    item.componentInstance.deleteClick.emit();
    fixture.detectChanges();

    expect(event).toBeDefined();
    expect(event).toBe(item.componentInstance.topic);
  });
});

@Component({
  selector: 'topics-list-item',
  template: ''
})
class MockTopicsListItemComponent {
  @Input() topic: any;
  @Output() postTitleChange = new EventEmitter<string>();
  @Output() deleteClick = new EventEmitter<any>();
}