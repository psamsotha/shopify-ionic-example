import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { BlogPage } from './blog.page';
import { BlogPostPage } from './blog-post.page';


@NgModule({
  imports: [ SharedModule ],
  declarations: [
    BlogPage,
    BlogPostPage
  ],
  entryComponents: [
    BlogPage,
    BlogPostPage
  ]
})
export class BlogModule {
  static forRoot() {
    return {
      ngModule: BlogModule
    }
  }
}
