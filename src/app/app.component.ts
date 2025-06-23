import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { LoaderService } from './services/loader.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-root',
  imports: [ HeaderComponent, NzSpinModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  menu: any[] = [];
  userRoleForMenu: string = '';
   isSpinning = false;
  
  constructor(private loader: LoaderService) { }
  
    ngOnInit(): void {
      this.loader.loadState.subscribe(res => {
        console.log("LoaderComponent: Loader state changed to", res);
        this.isSpinning = res;
      });
    }
}
