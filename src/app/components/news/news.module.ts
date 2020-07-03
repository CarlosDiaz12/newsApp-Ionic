import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';
import { ArticlePageModule } from '../../components/article/article.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule,
    ArticlePageModule
  ],
  declarations: [NewsPage],
  exports: [NewsPage]
})
export class NewsPageModule {}
