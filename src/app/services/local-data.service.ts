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


  isFavorite(article: Article): number {
    return this.favorites.findIndex(a => a.title === article.title);
  }

  removeFromFavorites(article: Article) {
    const articleToRemove = this.favorites.findIndex(a => a.title === article.title);
    this.favorites.splice(articleToRemove, 1);
    this.storage.set('favorites', this.favorites);
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
