import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  user: string | null = "";
  favorites: any[] = [];
  showSongList: boolean = false;
  currentSong: any;

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    if (!this.user) {
      this.router.navigateByUrl('/welcome');
    } else {
      const storedFavorites = this.cookieService.get('favorites_' + this.user);
      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites);
      }
    }
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

  addToFavorites(song: any) {
    if (!this.isFavorite(song)) {
      this.favorites.push(song);
      this.saveFavorites();
    }
  }

  removeFromFavorites(song: any) {
    const index = this.favorites.findIndex(favSong => favSong === song);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.saveFavorites();
    }
  }

  isFavorite(song: any): boolean {
    return this.favorites.includes(song);
  }

  toggleSongList() {
    this.showSongList = !this.showSongList;
  }

  logout() {
    this.saveFavorites();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  saveFavorites() {
    this.cookieService.set('favorites_' + this.user, JSON.stringify(this.favorites));
  }
}
