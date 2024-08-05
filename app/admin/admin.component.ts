import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  title: any;
  user:string|null="";
  router: any;
  ngOnInit(): void {
   
    this.user=localStorage.getItem('user');
     if(this.user==null){
      this.router.navigateByUrl('/product');
     }
    }

goBack() {
throw new Error('Method not implemented.');
}
  songs = [
    { title: 'Song 1', artist: 'Artist 1', albumArt: 'assets/m5.png', url: 'assets/LE.mp4' },
    { title: 'Song 2', artist: 'Artist 2', albumArt: 'assets/an1.jpg', url: 'assets/LE.mp4' },
    { title: 'Song 3', artist: 'Artist 3', albumArt: 'assets/m2.png', url: 'assets/LE.mp4' },
    { title: 'Song 4', artist: 'Artist 4', albumArt: 'assets/m2.png', url: 'assets/LE.mp4' },
    { title: 'Song 5', artist: 'Artist 5', albumArt: 'assets/an3.jpg', url: 'assets/LE.mp4' },
    { title: 'Song 6', artist: 'Artist 6', albumArt: 'assets/m5.png', url: 'assets/LE.mp4' }
    // Add more songs as needed
  ];

  currentSong: any;



  playSong(song: any) {
    const audioPlayer = document.querySelector('audio') as HTMLAudioElement;
    if (this.currentSong) {
      if (this.currentSong === song && !audioPlayer.paused) {
        audioPlayer.pause();
      } else {
        this.currentSong = song;
        audioPlayer.src = song.url;
        audioPlayer.play();
      }
    } else {
      this.currentSong = song;
      audioPlayer.src = song.url;
      audioPlayer.play();
    }
  }

  pauseSong() {
    const audioPlayer = document.querySelector('audio') as HTMLAudioElement;
    audioPlayer.pause();
  }

  playNextSong() {
    // Logic to play the next song goes here
  }
}
