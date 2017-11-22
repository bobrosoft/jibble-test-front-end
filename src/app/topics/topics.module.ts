import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopicsService} from './services/topics/topics.service';
import {TopicsPageComponent} from './components/topics-page/topics-page.component';
import {TopicsListComponent} from './components/topics-list/topics-list.component';
import {TopicsListItemComponent} from './components/topics-list-item/topics-list-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TopicsListComponent,
    TopicsListItemComponent,
    TopicsPageComponent
  ],
  providers: [
    TopicsService
  ]
})
export class TopicsModule { }
