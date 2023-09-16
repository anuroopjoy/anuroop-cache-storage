import { Component, OnInit } from '@angular/core';
import { CacheService } from './cache.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cache-storage';

  constructor(private cacheService: CacheService) {}
  async ngOnInit() {
    let data = await lastValueFrom(
      this.cacheService.getCachedOrFetch(
        'https://jsonplaceholder.typicode.com/todos/1'
      )
    );
    console.log(data);
  }
}
