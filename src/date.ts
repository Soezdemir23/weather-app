import { Temporal } from "temporal-polyfill";

function getCompliantDate(year: string, month: string, day: string) {
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  }

function getCurrentWeekDates() {
    let today = Temporal.Now.plainDateISO().dayOfWeek;
    
    let previousDaysOfWeek: string[] = []
    let todayAndRestOfWeek: string[] = []

    // get the dates of previous days:
    for (let i = 1; i < today; i++) {
      let date = Temporal.Now.plainDateISO().subtract({days: today-i});
      let year = date.year.toString()
      let month = date.month.toString();
      let day = date.day.toString();
      previousDaysOfWeek.push(getCompliantDate(year, month, day))
      

    }

    //get the dates of the week, startin with the current date.
    // today =>  
    
    for (let i = 0; i <= 7 - today; i++) {
      let date = Temporal.Now.plainDateISO().add({days: i});
      let day = date.day.toString();
      let month = date.month.toString();
      let year = date.year.toString();
      todayAndRestOfWeek.push(getCompliantDate(year, month, day))
      console.log()
    }
 
    console.log(previousDaysOfWeek, todayAndRestOfWeek)
  }

  export {getCompliantDate, getCurrentWeekDates }