import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  onClick(event: Event){
    console.log("HO CLICCATO");
    this.title = 'ho cliccato sul bottone';
  }

  onInput(event: Event){
    console.log((<HTMLInputElement>event.target).value);
    this.title = (<HTMLInputElement>event.target).value;
  }

  title = 'corso-angular';

}
