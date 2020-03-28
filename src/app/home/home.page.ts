import { Component } from '@angular/core';
import { Platform } from '@ionic/angular'; // Pour tester, voir si la page s'est bien chergée terminée.
import { Media, MediaObject} from '@ionic-native/media/ngx'; // Import du plugin media

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Déclaration d'une première variable qui sera un MediaObject.
  file: MediaObject;

  constructor(
    public platform: Platform,
    public media: Media,     // déclaration dans le constructor.
  ) {
    // On ne peut pas faire directement un this.readAudio() car en version browser ca n'ira pas il faut donc
    // faire this.platform.ready() pour que notre page soit bien chargée.
    this.platform.ready().then(() => {
      this.readAudio();
    });
  }

  // Première fonction pour lire l'Audio -- Doc https://ionicframework.com/docs/native/media
  readAudio(){
    this.file = this.media.create('../../assets/001.mp3');
    this.file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
    this.file.onSuccess.subscribe(() => console.log('Action is successful'));
    this.file.onError.subscribe(error => console.log('Error!', error));
    this.file.play();
  }

}
