import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor() { }
  getDateFormat(timestamp) {
    var time;
    var currentTimeStamp = Math.floor(Date.now());
    var currentDay = new Date(currentTimeStamp).getDay();
    var currentHour = new Date(currentTimeStamp).getHours();
    
    if(new Date(timestamp).getDay() == currentDay){
    if (new Date(timestamp).getHours() == currentHour) {
        time = new Date(currentTimeStamp).getMinutes() - new Date(timestamp).getMinutes();
        time = time + ' min ago'
    } else {
        time = new Date(currentTimeStamp).getHours() - new Date(timestamp).getHours();
        time = time + ' hours ago';
    }
}else{
     time = new Date(timestamp).getDate()+"/"+(Number(new Date(timestamp).getMonth())+1)+"/"+new Date(timestamp).getFullYear();
     console.log(time)
}
    return time;
}
}
