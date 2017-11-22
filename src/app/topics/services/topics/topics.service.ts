import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Topic} from '../../models/topic.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Post} from '../../models/post.model';
import {Album} from '../../models/album.model';
import {User} from '../../models/user.model';

@Injectable()
export class TopicsService {
  readonly topicsLimit: number = 30;
  protected topics: BehaviorSubject<Topic[]> = new BehaviorSubject<Topic[]>([]);
  
  get topics$(): Observable<Topic[]> {
    return this.topics.asObservable();
  }
  
  constructor(
    protected httpClient: HttpClient
  ) {
  }

  /**
   * Loads topics from server
   * @returns {Observable<Topic[]>}
   */
  loadTopics(): Observable<Topic[]> {
    return Observable.forkJoin([
      this.httpClient.get('https://jsonplaceholder.typicode.com/posts', {responseType: 'json'}),
      this.httpClient.get('https://jsonplaceholder.typicode.com/users', {responseType: 'json'}),
      this.httpClient.get('https://jsonplaceholder.typicode.com/albums', {responseType: 'json'})
    ])
      .map(([posts, users, albums]: [Post[], User[], Album[]]) => {
        const result: Topic[] = [];
      
        // Let's create topic objects we actually need
        for (let i = 0; i < this.topicsLimit; i++) {
          // Exist if no more data exists
          if (typeof posts[i] === 'undefined' || typeof users[i]  === 'undefined' || typeof albums[i] === 'undefined') {
            break;
          }
          
          result.push({
            post: posts[i],
            user: users[i],
            album: albums[i],
          });
        }

        return result;
      })
      .do((topics: Topic[]) => {
        // Save to internal storage
        this.topics.next(topics);
      })
    ;
  }
  
  /**
   * Updates post title for topic
   * @param {string} newTitle
   * @param {Topic} topic
   */
  updatePostTitleForTopic(newTitle: string, topic: Topic) {
    // TODO: here should be API call to update topic (if we would have it)
    
    // Immutable update it
    const newValue = this.topics.value.map((current) => {
      if (current.post.id === topic.post.id) {
        const newTopic: Topic = JSON.parse(JSON.stringify(topic)); // fast clone
        newTopic.post.title = newTitle;
        return newTopic;
      } else {
        return current;
      }
    });
    this.topics.next(newValue);
  }

  /**
   * Deletes the topic
   * @param {Topic} topic
   */
  deleteTopic(topic: Topic) {
    // TODO: here should be API call to delete topic (if we would have it)
    
    // Immutable update it
    const newValue = this.topics.value.filter(t => t.post.id !== topic.post.id);
    this.topics.next(newValue);
  }
}
