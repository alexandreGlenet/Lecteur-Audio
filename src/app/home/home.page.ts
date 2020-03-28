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
  playIcon = 'play';
  audioDuration: number; // Durée totale de la barre de progression.
  currentPostion: number;
  restTime: string; // Affichage du temps restant en min et en sec.

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

    setInterval(() => {
      this.file.getCurrentPosition().then((position) => {
        this.audioDuration = Math.floor(this.file.getDuration());
        this.currentPostion = Math.floor(position);
        this.convertSec(this.audioDuration - this.currentPostion);
      });
    }, 1000);

  }

  // Fonction pour convertir des millisecondes en secondes et min.
  convertSec(secondes: number) {
    const min = Math.floor((secondes/60/60)*60);
    const sec = Math.floor(((secondes/60/60)*60 - min)*60);
    this.restTime = min + 'm ' + sec + 's';
  }

  // changer la position du curseur au click
  changePosition(){
    console.log ('position: ' + this.currentPostion);
    this.file.seekTo(this.currentPostion*1000);//seekTo fonction qui permet de faire un déplacement, attention il faut mettre en milliseconde pour le seekTo
    this.convertSec(this.audioDuration - this.currentPostion);
  }

  playPause(){ // Pour l'apparence du bouton
    if(this.playIcon == 'play') {
      this.playIcon = 'pause';
      this.file.play();
    }
    else {
      this.playIcon = 'play';
      this.file.pause();
    }
  }

}
