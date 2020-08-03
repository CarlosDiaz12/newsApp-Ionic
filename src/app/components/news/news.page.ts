import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/Article';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
 @Input() articles: Article[];
// @Input() isFavorite: boolean;
  constructor() { }

  ngOnInit() {
  }

}
