import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import {catchError, debounceTime, delay, filter, from, interval, map, mergeMap, of, switchMap, take, tap, throwError} from 'rxjs';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

// countries=[
//   { id: 1, name: 'USA' },
//   { id: 2, name: 'India' },
// ]
// countryStates = [
//    ['New York', 'California', 'Texas'],
//   ['Delhi', 'Mumbai', 'Bangalore'],
// ];
// states:string[]=[];
// countryControl=new FormControl('')

// constructor(){
//   this.countryControl.valueChanges.pipe(
//     debounceTime(500),
//     switchMap((countryId:any)=>this.fetchStates(countryId))

//   ).subscribe(
//     {
//       next:states=>{
//         this.states=states;
//       }
//     }
//   )
// }

// fetchStates(countryId:number){
//   const states = this.countryStates[countryId-1] || [];
//   return of(states);
// }

pageControl=new FormControl('');
pages=[1,2,3];
posts:any[]=[];
errorMessage!:string|null;
isLoading=false;
constructor(){
  this.pageControl.valueChanges.pipe(
    tap(()=>{
      this.isLoading=true;
    }),
    switchMap((page:any)=>page===1? throwError(()=>new Error('Error Occured')):this.fetchPostPage(page)),
    catchError((err)=>{
      this.isLoading=true;
      this.errorMessage="Failed to load post :"+err.message;
      return of(this.errorMessage);
    }),
  ).subscribe({
    next:postsData=>{
      this.errorMessage=null;
      console.log(postsData);
      this.posts=postsData;
      this.isLoading=false;
    },
    error:err=>{
      this.errorMessage=err;
      console.log(err);
      
    }
  })
}
fetchPostPage(page:number){
  const fetchPost =  fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=6`).then(v=>v.json())
 return from(fetchPost);
}
}
