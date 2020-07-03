import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../models/Article';
@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  favorites: Article[] = [];
  hasFavorites: boolean;
  constructor(private storage: Storage) {
    this.loadAllFavorites();
  }

  saveArticle(article: Article): boolean {
    if (this.hasFavorites) {
      const exists = this.favorites.find((a) => a.title === article.title);
      if (!exists) {
        this.favorites.unshift(article);
        this.storage.set('favorites', this.favorites);
        return true;
      }
    }
    return false;
  }

  getFavorites(): Article[] {
    return this.favorites;
  }

  loadAllFavorites(): void {
    this.storage.get('favorites').then((value: Article[]) => {
      if (value) {
        this.favorites = value;
        this.hasFavorites = true;
      }
    });
  }
}
