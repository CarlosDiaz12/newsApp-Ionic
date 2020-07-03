import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../../services/news-api.service';
import { Article } from '../../models/Article';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  articles: Article[];
  isLoading: boolean;
  private page = 1;
  constructor(private newsService: NewsApiService) {}

  ngOnInit(): void {
    // llamado al api
    this.isLoading = true;
    this.loadData();
  }

  loadData(firstTimeLoad: boolean = true): void {
    this.page = (firstTimeLoad) ? 1 : ++this.page;

    this.newsService.getTopHeadlines(this.page).subscribe( data => {
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
    this.loadData(false);
    event.target.complete();
  }

  doRefresh(event: any): void {
    this.loadData(true);
    event.target.complete();
  }



}
