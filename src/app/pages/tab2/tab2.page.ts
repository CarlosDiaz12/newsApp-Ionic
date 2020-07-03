import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/Article';
import { NewsApiService } from 'src/app/services/news-api.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  articles: Article[];
  category = 'general';
  private page = 1;
  isLoading: boolean;
  constructor(private newsService: NewsApiService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadData();
  }

  segmentChanged(event: any) {
    this.isLoading = true;
    this.category = event.detail.value;
    this.loadData();
  }

  loadData(firstTimeLoad: boolean = true): void {
    this.page = (firstTimeLoad) ? 1 : ++this.page;
    this.newsService.getTopHeadlinesPerCategory(this.page, this.category).subscribe( data => {
      if (firstTimeLoad){
        this.articles = data.articles;
      } else {
        this.articles = this.articles.concat(data.articles);
      }
      this.isLoading = false;
      console.log(this.articles);
    });
  }

  fetchMoreData(event: any): void {
    console.log(this.articles.length);
    this.loadData(false);
    event.target.complete();
  }
}
