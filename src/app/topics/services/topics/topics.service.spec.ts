import {TestBed, getTestBed} from '@angular/core/testing';

import {TopicsService} from './topics.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import {Topic} from '../../models/topic.model';


describe('TopicsService', () => {
  let injector: TestBed;
  let service: TopicsService;
  let httpMock: HttpTestingController;
  
  const mockResponses = () => {
    // Mock responses
    httpMock.expectOne({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'GET'
    }).flush([
      {
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
      },
      {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
      }
    ]);

    httpMock.expectOne({
      url: 'https://jsonplaceholder.typicode.com/users',
      method: 'GET'
    }).flush([
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496'
          }
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets'
        }
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
          geo: {
            lat: '-43.9509',
            lng: '-34.4618'
          }
        },
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        company: {
          name: 'Deckow-Crist',
          catchPhrase: 'Proactive didactic contingency',
          bs: 'synergize scalable supply-chains'
        }
      }
    ]);

    httpMock.expectOne({
      url: 'https://jsonplaceholder.typicode.com/albums',
      method: 'GET'
    }).flush([
      {
        userId: 1,
        id: 1,
        title: 'quidem molestiae enim'
      },
      {
        userId: 1,
        id: 2,
        title: 'sunt qui excepturi placeat culpa'
      }
    ]);
  };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // no more boilerplate code w/ custom providers needed :-)
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [TopicsService]
    });

    injector = getTestBed();
    service = injector.get(TopicsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    // Verify no pending requests left
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expect proper GET requests to API', () => {
    service.loadTopics().subscribe();
    
    mockResponses();
  });

  it('should load and return proper topics$ data', (done) => {
    service.loadTopics()
      .switchMap(() => {
        return service.topics$.take(1);
      })
      .subscribe((data) => {
        expect(data.length).toBe(2);
        expect(data[0].post).toBeDefined();
        expect(data[0].user).toBeDefined();
        expect(data[0].album).toBeDefined();

        done();
      });

    mockResponses();
  });

  it('should update title for topic with updatePostTitleForTopic', (done) => {
    let oldTitle: string;
    let newTitle: string;

    service.loadTopics()
      .switchMap(() => {
        return service.topics$.take(1);
      })
      .switchMap((data) => {
        oldTitle = data[0].post.title;
        newTitle = oldTitle + Math.random();

        service.updatePostTitleForTopic(newTitle, data[0]);

        return service.topics$.take(1);
      })
      .subscribe((data) => {
        expect(data[0].post.title).toBe(newTitle);
        expect(data[0].post.title).not.toBe(oldTitle);
        
        done();
      });

    mockResponses();
  });

  it('should delete topic with deleteTopic', (done) => {
    let topicToDelete: Topic;
    let oldLength: number;
    
    service.loadTopics()
      .switchMap(() => {
        return service.topics$.take(1);
      })
      .switchMap((data) => {
        topicToDelete = data[0];
        oldLength = data.length;

        service.deleteTopic(topicToDelete);

        return service.topics$.take(1);
      })
      .subscribe((data) => {
        expect(data.length).toBe(oldLength - 1);
        expect(data.find(t => t.post.id === topicToDelete.post.id)).toBeUndefined();

        done();
      });

    mockResponses();
  });
});
