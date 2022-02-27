import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Player } from '../player';
import { PlayerService } from '../player.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  player: Player | undefined;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  onSubmit(formData: NgForm) {
    if (!formData) { return; }
console.log(formData['name'])
console.log(formData.value.name)
let newPlayer = new Object(formData.value);
console.log(newPlayer)

this.playerService.addPlayer(newPlayer)
         .subscribe(() => this.goBack());

   /*
let newPlayer:Player;
   
   this.player.name = formData['name'];
let newPlayer= this.player;
newPlayer:Player | undefined;

         */
  }

  goBack(): void {
    this.location.back();
  }



}
