import { Component, OnInit } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LoaderService } from '../../../services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true, // ← Added this
  imports: [CommonModule, NzAlertModule, NzSpinModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isSpinning = false;

  constructor(private loader: LoaderService) { }

  ngOnInit(): void {
    this.loader.loadState.subscribe(res => {
      console.log("LoaderComponent: Loader state changed to", res);
      this.isSpinning = res;
    });
  }
}