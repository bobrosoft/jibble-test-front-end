import {TopicsPageComponent} from './components/topics-page/topics-page.component';

export const routes = [{
  path: '',
  children: [
    {path: '', component: TopicsPageComponent},
  ]
}];