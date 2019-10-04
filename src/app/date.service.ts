import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
    constructor() { }
        
  getDateFormat(timestamp) {
    var time:any;
    var currentTimeStamp = Math.floor(Date.now());
    var currentDay = new Date(currentTimeStamp).getDate();
    var currentHour = new Date(currentTimeStamp).getHours();
      console.log(new Date(timestamp).getDate(), currentDay)
      if ((currentTimeStamp) / 1000 - (timestamp) / 1000 < 86400){
          if ((currentTimeStamp) / 1000 - (timestamp) / 1000 < 3600) {
              time = ((currentTimeStamp) / 1000 - (timestamp) / 1000) / 60;  
        time = (time).toFixed(0) + ' min ago'
    } else {
        time = ((currentTimeStamp) / 1000 - (timestamp) / 1000) / 3600;  
              time = (time).toFixed(0) + ' hours ago';
    }
}else{
     time = new Date(timestamp).getDate()+"/"+(Number(new Date(timestamp).getMonth())+1)+"/"+new Date(timestamp).getFullYear();
     console.log(time)
}
    return time;
    }
     getGreetings() {
    var greeting;
    var time = new Date().getHours();
    if (time < 10) {
        greeting = "Good morning";
    } else if (time < 16) {
        greeting = "Good Afternoon";
    } else if (time < 20) {
        greeting = "Good evening";
    }
    else {
        greeting = "Good night";
        }
        return greeting;
}
}
