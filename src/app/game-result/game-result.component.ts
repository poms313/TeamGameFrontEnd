import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'

import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css']
})
export class GameResultComponent implements OnInit {

  result:any = [];
  winner:string = '';
  teamOneScore:string = '';
  teamTwoScore:string = '';

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getResult();
  }

  getResult() {
    const getGameValue = this.route.snapshot.paramMap.get('test');
    const data = String(getGameValue)
    this.playerService.gameResult(data)
      .subscribe(result => this.result = this.extractResult(result));
  }

  extractResult(data:any) {
    this.winner= data['winner'];
    this.teamOneScore= data['teamOneScore'];
    this.teamTwoScore= data['teamTwoScore'];
  }

}
