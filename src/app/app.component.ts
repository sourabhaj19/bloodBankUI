import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  isSpinning = false;
  
  constructor(private loader: LoaderService, private cdr: ChangeDetectorRef) { }
  
    ngOnInit(): void {
      this.loader.loadState.subscribe(res => {
        this.isSpinning = res;
        this.cdr.detectChanges();
      });
    }
    
}
