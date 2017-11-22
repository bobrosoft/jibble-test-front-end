import {Post} from './post.model';
import {User} from './user.model';
import {Album} from './album.model';

export interface ListItem {
  post: Post;
  user: User;
  album: Album;
}