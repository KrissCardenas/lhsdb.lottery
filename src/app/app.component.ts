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
  title = 'Lotterie 2020';
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
    this.addEntry(1, "Ottawa", 18.5);
    this.addEntry(2, "Vegas", 13.5);
    this.addEntry(3, "Detroit", 11.5);
    this.addEntry(4, "Nashville", 9.5);
    this.addEntry(5, "Philadelphie", 8.5);

    this.addEntry(6, "Chicago", 7.5);
    this.addEntry(7, "Winnipeg", 6.5);
    this.addEntry(8, "Tampa Bay", 6.0);
    this.addEntry(9, "Montréal", 5.0);
    this.addEntry(10, "New York Islanders", 3.5);

    this.addEntry(11, "Toronto", 3.0);
    this.addEntry(12, "Los Angeles", 2.5);
    this.addEntry(13, "Vancouver", 2);
    this.addEntry(14, "San Jose", 1.5);
    this.addEntry(15, "Caroline", 1);
  }

  onDraft(): void {
    if (this.results.length >= 3 || this.results.length >= this.entries.length) {
      return;
    }

    let i = 0;
    while (this.results.length < 3) {
      let randomTeam = this.getRandomTeam();
      if (!this.results.includes(randomTeam)) {
        this.results.push(randomTeam);
        console.log("Résultat de pige:" + randomTeam);
      }
      i++;
    }

    for (let team of this.results) {

      if (this.finalStandings.indexOf(team) > 0) {
        this.finalStandings.splice(this.finalStandings.indexOf(team), 1);
        this.finalStandings.unshift(team);
      }
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
  // splice
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
