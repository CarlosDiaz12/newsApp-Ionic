import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/Article';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LocalDataService } from '../../services/local-data.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  providers: [SocialSharing],
})
export class ArticlePage implements OnInit {
  @Input() article: Article;
  @Input() index: number;
  @Input() isFavorite: boolean;

  constructor(
    public actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private localData: LocalDataService,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

  async presentActionSheet(article: Article) {

    const options = [
      {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
          let message;
          let color;
          if (this.localData.saveArticle(article)) {
            message = 'Article saved';
            color = 'success';
          } else {
            message = 'Article already saved';
            color = 'warning';
          }
          // shows a toaster
          this.presentToast(message, color);
        },
      },
      {
        text: 'Share',
        icon: 'share',
        handler: () => {
          this.socialSharing.share(article.url);
        },
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        },
      }
    ];

    if (this.isFavorite) {
      options.shift();
    }


    const actionSheet = await this.actionSheetController.create({
      header: 'News App',
      cssClass: 'my-custom-class',
      buttons: options,
    });
    await actionSheet.present();
  }
}
