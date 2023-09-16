import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, from, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cacheName = 'my-cache';
  constructor(private http: HttpClient) {}

  getCachedOrFetch<T>(url: string): Observable<T | null> {
    return from(caches.match(url, { cacheName: this.cacheName })).pipe(
      switchMap((response) => {
        if (response) {
          console.log('Found response in cache');
          return of(response.json() as T);
        }
        console.log(
          'No response found in cache. About to fetch from network...'
        );
        return this.http.get<T>(url).pipe(
          tap((networkResponse) => {
            caches.open(this.cacheName).then((cache) => {
              cache.put(url, new Response(JSON.stringify(networkResponse)));
              console.log('Response stored in cache');
            });
          }),
          catchError((error) => {
            console.error('Error fetching data: ', error);
            return of(null);
          })
        );
      })
    );
  }
}
