import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
articles: Article[];
isFavorite = true;
  constructor(private localData: LocalDataService) {}

  ngOnInit(): void {
    this.articles = this.localData.getFavorites();
    console.log(this.articles);
  }



}
