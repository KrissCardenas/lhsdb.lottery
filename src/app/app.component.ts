import { Component, OnInit } from '@angular/core';

/* 2020 standings
1- Ottawa 18,5% (185)
2- Vegas 13,5% (135)
3- Detroit 11,5% (115)
4- Nashville 9,5% (95)
5- Philadelphie 8,5% (85)
6- Chicago 7,5% (75)
7- Winnipeg 6,5% (65)
8- Tampa Bay 6% (60)
9- Montréal 5% (50)
10- NYIslanders 3,5% (35)
11- Toronto 3% (30)
12- Los Angeles 2,5% (25)
13- Vancouver 2% (20)
14- San Jose 1,5% (15)
15- Caroline 1% (10)
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Loterie 2023';
  draftDone: boolean = false;
  displayResultsDone: boolean = false;

  entries = [];
  accumulatedWeight = 0.0;
  actualStandings1 = [];
  actualStandings2 = [];
  finalStandings = [];
  results: string[] = [];
  displayedResults = [];
  displayedIndex = 0;

  constructor() { }

  ngOnInit() {
    this.addEntry(1, "Floride", 18.5); 
    this.addEntry(2, "Seattle", 13.5); 
    this.addEntry(3, "Ottawa", 11.5); 
    this.addEntry(4, "Vegas", 9.5);
    this.addEntry(5, "Anaheim", 8.5);

    this.addEntry(6, "Montréal", 7.5);
    this.addEntry(7, "Tampa Bay", 6.5);
    this.addEntry(8, "Buffalo", 6.0);
    this.addEntry(9, "Winnipeg", 5);
    this.addEntry(10, "New York Islanders", 3.5);

    this.addEntry(11, "Philadelphie", 3.0);
    this.addEntry(12, "Vancouver", 2.5);
    this.addEntry(13, "Dallas", 2);
    this.addEntry(14, "Phoenix", 1.5);
    this.addEntry(15, "Pittsburgh", 0.5);
    this.addEntry(16, "Los Angeles", 0.5);
  }

  onDraft(): void {
    if (this.results.length >= 2 || this.results.length >= this.entries.length) {
      return;
    }

    let i = 0;
    while (this.results.length < 2) {
      let randomTeam = this.getRandomTeam();
      if (!this.results.includes(randomTeam)) {
        this.results.push(randomTeam);
        console.log("Résultat de pige:" + randomTeam);
      }
      i++;
    }

    /*
    for (let j= this.results.length-1; j>=0; j--) {
      let team = this.results[j];
      if (this.finalStandings.indexOf(team) > 0) {
        this.finalStandings.splice(this.finalStandings.indexOf(team), 1);
        this.finalStandings.unshift(team);
      }
    }*/

    let firstPickWinner = this.results[0];
    let secondPickWinner = this.results[1];

    // Insert first winner
    let firstCurrentRank = this.finalStandings.indexOf(firstPickWinner);
    this.finalStandings.splice(firstCurrentRank, 1); // removes team from list

    let diff = firstCurrentRank - 10;
    if (diff < 0) {
      this.finalStandings.splice(0, 0, firstPickWinner);
      console.log(firstPickWinner + " passe de " + (firstCurrentRank + 1) + " au premier rang");
    }
    else {
      this.finalStandings.splice(diff, 0, firstPickWinner);
      console.log(firstPickWinner + " passe de " + (firstCurrentRank + 1) + " au rang " + (diff + 1));
    }

    // Insert second winner
    let secondCurrentRank = this.finalStandings.indexOf(secondPickWinner);
    this.finalStandings.splice(secondCurrentRank, 1); // removes team from list

    diff = secondCurrentRank - 10;
    if (diff < 0) {
      this.finalStandings.splice(1, 0, secondPickWinner);
      console.log(secondPickWinner + " passe de " + (secondCurrentRank + 1) + " au deuxième rang");
    }
    else {
      this.finalStandings.splice(diff + 1, 0, secondPickWinner);
      console.log(secondPickWinner + " passe de " + (secondCurrentRank + 1) + " au rang " + (diff + 2));
    }

    this.draftDone = true;
  }

  nextTeam():void{
    if(this.finalStandings.length === this.displayedResults.length){
      this.displayResultsDone = true;
      return;
    }

    let endIndex = this.finalStandings.length -1;

    this.displayedResults.push(this.finalStandings[endIndex - this.displayedIndex]);
    this.displayedIndex++;
  }

  addEntry(rank: number, team: string, weight: number) {
    this.accumulatedWeight += weight;
    this.entries.push({ rank: rank, name: team, accumulatedWeight: this.accumulatedWeight });
    this.finalStandings.push(team);

    if (this.actualStandings1.length < 8) {
      this.actualStandings1.push(rank + "- " + team + "(" + weight + "%)")
    }
    else {
      this.actualStandings2.push(rank + "- " + team + "(" + weight + "%)")
    }
  }
  
  /*
          add  remove  start  end
    push    X                   X
    pop           X            X
    unshift    X             X
    shift           X      X
  */
  getRandomTeam(): string {
    var r = Math.random() * this.accumulatedWeight;
    console.log("Valeur pigée " + r + " sur " + this.accumulatedWeight);
    // this.entries.find(entry.accumulatedWeight >= r)
    return this.entries.find(function (entry) {
      return entry.accumulatedWeight >= r;
    }).name;
  }
}
