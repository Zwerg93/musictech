import {Component, HostListener} from '@angular/core';
import {AudioService} from '../../services/audio.service';
import {CloudService} from '../../services/cloud.service';
import {timer} from "rxjs";

//import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  files: Array<any> = [];
  newFiles: Array<any> = [];
  tmpFiles: Array<any> = [];

  test = true
  isplaying = false;
  state;  //: StreamState;
  currentFile: any = {};
  private j: number = 0;

/*
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode == KEY_CODE.SPACE) {
      if (this.isplaying){
        this.pause();
      }else{
        this.play();
      }
    }else if(event.keyCode == KEY_CODE.N_BUTTON){
      this.next()
    }else if(event.keyCode == KEY_CODE.P_BUTTON){
      this.previous()
    }else if(event.keyCode == KEY_CODE.LEFT_ARROW){
      console.log(this.audioService.audioObj.currentTime);
      if(this.audioService.audioObj.currentTime>10){
        this.audioService.audioObj.currentTime -=10;
      }
    }else if(event.keyCode == KEY_CODE.RIGHT_ARROW){
      console.log(this.audioService.audioObj.currentTime);
      console.log(this.state.readableDuration)
      if(this.audioService.audioObj.currentTime<this.state.readableDuration+10){
        this.audioService.audioObj.currentTime +=10;

      }
    }
  }



 */



  constructor(private audioService: AudioService, cloudService: CloudService) {
    cloudService.onload();
    // get media files

    // localStorage.setItem('currentTime', time);


    timer(200).subscribe(x => {
      //if (this.currentFile.index == this.currentFile.index){
      // }
      cloudService.getFiles().subscribe(files => {

        this.files = files
        this.tmpFiles = files;
      });
    })


    // listen to stream state
    this.audioService.getState()
      .subscribe(state => {
        //console.log( this.audioService.play())

        this.state = state;
      });

  }

  playStream(url) {
    this.audioService.playStream(url)
      .subscribe(events => {
        // listening for fun here
      });
  }


  openFile(file, index) {
    this.currentFile = {index, file};
    this.audioService.stop();
    this.playStream(file.url);
  }

  pause() {
    this.audioService.pause();
    this.isplaying = false;
  }

  play() {
    this.audioService.play();
    this.isplaying = true;
  }


  random() {
    const index = this.randomIntFromInterval(0, this.files.length - 1);
    const file = this.files[index];
    this.openFile(file, index);
    console.log(index);
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }


  autoplayfunc(test) {
    this.audioService.autoplayfunc(test);
  };

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  cloudService: CloudService;
  found :boolean;
  inputstring : string = ""
  searchstring: String;
  myMethod(event: any){
   // this.inputstring += event.target.value;
    this.files = this.tmpFiles.filter((file:{name:string}) => {
      return file.name.toLowerCase().includes(this.searchstring.toLowerCase());
    })
    /* for (this.j = 0; this.j < this.tmpFiles.length; this.j++) {
      *

       if (this.tmpFiles[this.j].name.toLowerCase().includes(event.target.value.toLowerCase())) {
         this.newFiles.push(this.files[this.j]);

         console.table(this.newFiles)
         this.found = true;
         //break;
       }else{
         this.newFiles.length = 0;
         this.files = this.tmpFiles;
       }

     }
     console.log(this.found);
     console.log(event.target.value);

     if (!this.found) {
       this.files =  this.tmpFiles;
     }
       this.files = this.newFiles;

        */

  }

  cancelSearch() {
    this.inputstring = "";
    console.log("succes")
    this.files = this.tmpFiles;
    //searchinput
    document.getElementById("searchinput")!.innerHTML = "";

  }


}

export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  SPACE = 32,
  N_BUTTON = 78,
  P_BUTTON = 80

}