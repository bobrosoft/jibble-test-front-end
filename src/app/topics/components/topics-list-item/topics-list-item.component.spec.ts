import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TopicsListItemComponent} from './topics-list-item.component';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

describe('TopicsListItemComponent', () => {
  let component: TopicsListItemComponent;
  let fixture: ComponentFixture<TopicsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
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
        title: 'Some post title',
        body: 'dsfdsfdsf',
      },
      album: {
        id: 1,
        title: 'Album title',
        userId: 1
      },
      user: {
        id: 1,
        name: 'Vladimir',
        username: 'bobr',
        email: 'sdfdsf@sdfdsfdsf.io'
      }
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display data properly', () => {
    expect(fixture.debugElement.query(By.css('.post-title'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('.album-title'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('.user-name'))).toBeDefined();

    expect(fixture.debugElement.query(By.css('.post-title')).nativeElement.textContent).toMatch('Some post title');
    expect(fixture.debugElement.query(By.css('.album-title')).nativeElement.textContent).toMatch('Album title');
    expect(fixture.debugElement.query(By.css('.user-name')).nativeElement.textContent).toMatch('Vladimir');
  });

  it('should display edit field on edit button click', () => {
    expect(fixture.debugElement.query(By.css('.spec-input'))).toBeNull();
    
    fixture.debugElement.query(By.css('.spec-edit-btn')).triggerEventHandler('click', {});

    expect(fixture.debugElement.query(By.css('.spec-input'))).toBeDefined();
  });

  it('should emit proper event after editing', () => {
    let event: any;
    component.postTitleChange.subscribe(e => event = e);
    
    fixture.debugElement.query(By.css('.spec-edit-btn')).triggerEventHandler('click', {});
    fixture.detectChanges();
    
    fixture.debugElement.query(By.css('.spec-input')).nativeElement.value = 'test input';
    fixture.debugElement.query(By.css('.spec-input')).nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    fixture.debugElement.query(By.css('.spec-edit-btn')).triggerEventHandler('click', {});
    fixture.detectChanges();
    
    expect(event).toBe('test input');
  });

  it('should emit event on delete', () => {
    let triggered = false;
    component.deleteClick.subscribe(e => triggered = true);

    fixture.debugElement.query(By.css('.spec-delete-btn')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(triggered).toBe(true);
  });

  it('should complete editing on enter', () => {
    let event: any;
    component.postTitleChange.subscribe(e => event = e);
    
    fixture.debugElement.query(By.css('.spec-edit-btn')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.spec-input'))).toBeDefined();

    fixture.debugElement.query(By.css('.spec-input')).nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.spec-input'))).toBeNull();
    expect(event).toBeDefined();
  });

  it('should abort editing on esc', () => {
    let event: any;
    component.postTitleChange.subscribe(e => event = e);
    
    fixture.debugElement.query(By.css('.spec-edit-btn')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.spec-input'))).toBeDefined();

    fixture.debugElement.query(By.css('.spec-input')).nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Esc'}));
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.spec-input'))).toBeNull();
    expect(event).toBeUndefined();
  });
});
