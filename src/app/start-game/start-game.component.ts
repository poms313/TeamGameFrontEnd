import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Player } from '../player';
import { PlayerService } from '../player.service';


@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {

  players: Player[] = [];

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.startGame();

  }

  startGame(): void {
    this.playerService.startGame()
      .subscribe(players => this.players = players);
  }

  setTest(event: Event) {
    const testType = event.target as HTMLTextAreaElement;
    const testName = testType.id;
    this.getResult(testName);
  }

  getResult(testName: string) {
    const playersIdList = { players: this.players, testName: testName };//
    const jsonData = JSON.stringify(playersIdList);
    this.router.navigate(['game/result/', jsonData]);
  }
}
