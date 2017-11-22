import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Topic} from '../../models/topic.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'topics-list-item',
  templateUrl: './topics-list-item.component.html',
  styleUrls: ['./topics-list-item.component.scss']
})
export class TopicsListItemComponent {
  @Input() topic: Topic;
  @Output() postTitleChange = new EventEmitter<string>();
  @Output() deleteClick = new EventEmitter<any>();
  
  details: FormGroup;
  isEditing: boolean = false;
  
  constructor() {
    this.details = new FormGroup({
      postTitle: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  onEditClick() {
    if (!this.isEditing) {
      this.startEditing();
    } else {
      this.finishEditing();
    }
  }

  onPressEnter() {
    this.finishEditing();
  }

  onPressEsc() {
    this.finishEditing(true);
  }

  onDeleteClick() {
    this.deleteClick.emit();
  }

  /**
   * Starts editing
   */
  protected startEditing() {
    this.details.patchValue({
      postTitle: this.topic.post.title
    });
    this.isEditing = true;
  }

  /**
   * Finishes editing
   * @param {boolean} revert  If TRUE, changes will be reverted
   */
  protected finishEditing(revert: boolean = false) {
    if (!revert) {
      this.postTitleChange.emit(this.details.value.postTitle);
    }
    this.isEditing = false;
  }
}
