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

  result = [];

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getResult();
 /*   this.xxx = this.route.snapshot.paramMap.get[1];
    console.log(this.xxx);
  this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
    });
*/
  }

  getResult() {
    const xxx = this.route.snapshot.paramMap.get('test');
  const ggg =  JSON.stringify(xxx) 
    this.playerService.gameResult(ggg)
      .subscribe(result => this.result = result);
//  this.playerService.gameResult(this.route.snapshot.paramMap);
//pb de type any[] or string
 //   const id = this.route.snapshot.paramMap.get('test');
    console.log(xxx)
  }

}
