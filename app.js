let clock = document.querySelector("h1");
let stAlarm = document.querySelector(".setAlarm"); 
let gtAlarm = document.querySelector(".getAlarm");
let button_set = document.querySelector(".set")
let button_reset = document.querySelector(".reset")
let select_am_pm = document.querySelectorAll(".select");
let select_to24 = document.querySelectorAll(".sel");
let to24_12 = document.querySelector(".to24_12");
let setAlarm, isAlarm = false;
let ringingTone = new Audio("./files/ringtone.mp3")

//Hide reset button, set Alarm button and select 
 button_set.style.display="none";
 button_reset.style.display="none";
select_am_pm.forEach(item => {
  item.style.display="none"    
}); 
select_to24.forEach(item => {
  item.style.display="none"    
}); 

const display_select = () =>{
  if (to24_12.value ==="to12h") {
    to24_12.classList.add("disabl")
    select_am_pm.forEach(item => {    
      item.style.display="block" 
      button_set.style.display="block";
    });
    
    for (let i =0; i<13 ; i++) {
      i = i<10 ? "0"+i : i;
      select_am_pm[0].options.add(new Option(i,i))
    }

    for (let i =0; i<60 ; i++) {
      i = i<10 ? "0"+i : i;
      select_am_pm[1].options.add(new Option(i,i))
    }
  
  for (let i =0; i<60 ; i++) {
       i = i<10 ? "0"+i : i;
       select_am_pm[2].options.add(new Option(i,i))
  }

  for (let i =0; i<2 ; i++) {
    let amp = i==1? "AM":"PM"
    select_am_pm[3].options.add(new Option(amp,amp))  
  } 
} 
}

button_set.addEventListener("click", (e) =>{
      if (to24_12.value == "to12h") {
        //Cut alarm bip
        if (isAlarm) {
          setAlarm = ""
          ringingTone.pause()
          button_set.innerHTML="Set Alarm"
          gtAlarm.classList.remove("disables");
          return isAlarm=false
        }

        //Put alarm bip
         let times = `${select_am_pm[0].value}:${select_am_pm[1].value}:${select_am_pm[2].value} ${select_am_pm[3].value}`
        console.log(times);
         if (times.includes("hour")||times.includes("minute")||times.includes("seconde")||times.includes("am_pm")) {
            alert("Something went around !");
          } else {
              isAlarm=true
              setAlarm = times
              gtAlarm.classList.add("disables");
              button_set.innerHTML="Reset Alarm"
            }
          } else {
              //Cut alarm bip
                if (isAlarm) {
                  setAlarm = ""
                  ringingTone.pause()
                  button_set.innerHTML="Set Alarm"
                  gtAlarm.classList.remove("disables");
                  return isAlarm=false
                }
                //Put alarm bip
            let times = `${select_to24[0].value}:${select_to24[1].value}:${select_to24[2].value}`
            if (times.includes("hour")||times.includes("minute")||times.includes("seconde")) {
               alert("Something went around !");
             } else {
                 isAlarm=true
                 setAlarm = times
                 gtAlarm.classList.add("disables");
                 button_set.innerHTML="Clear Alarm"
               }
      }
})

const show_select = () =>{
  if(to24_12.value =="to24h") {
    gtAlarm.style.display = "flex";
    to24_12.classList.add("disabl");

    select_to24.forEach(el => {    
     el.style.display="block" 
     button_set.style.display="block";
   });

     for (let i =0; i<24 ; i++) {
      i = i<10 ? "0"+i : i;
      select_to24[0].options.add(new Option(i,i))
   }

    for (let i =0; i<60. ; i++) {
      i = i<10 ? "0"+i : i;
      select_to24[1].options.add(new Option(i,i))
    }
    
    for (let i =0; i<60 ; i++) {
      i = i<10 ? "0"+i : i;
      select_to24[2].options.add(new Option(i,i))
    }
}
}

const resetClock = () =>{
  button_reset.style.display="block"
  button_reset.addEventListener("click", (e) =>{
    location.reload();
  });
}

to24_12.addEventListener("change", () =>{
  //Show time
  setInterval(() => {
    if (to24_12.value =="to12h") {
      let dt = new Date();
      hours = (dt.getHours() % 12) < 10 ? "0"+(dt.getHours()%12) : (dt.getHours() || 12);
         let AmOrPm = hours >= 12 ? 'AM' : 'PM';
          let minutes=dt.getMinutes() < 10 ? "0"+ dt.getMinutes() : dt.getMinutes();
          let second=dt.getSeconds() < 10 ? "0"+ dt.getSeconds() : dt.getSeconds();
          let finalTime =  hours + ":" + minutes + ":" + second+ " " + AmOrPm; 
          clock.innerHTML=finalTime;
          if (setAlarm == `${finalTime}`) {
            ringingTone.play();
            ringingTone.loop = true;
        }
     }else{    
       let dateTime = new Date();
         let hours=dateTime.getHours() <10 ? "0" + dateTime.getHours() : dateTime.getHours() ;
         let min=dateTime.getMinutes() < 10 ? "0"+ dateTime.getMinutes() : dateTime.getMinutes();
         let sec=dateTime.getSeconds() < 10 ? "0" + dateTime.getSeconds() : dateTime.getSeconds();
         clock.innerHTML=`${hours}:${min}:${sec}`
         if (setAlarm == `${hours}:${min}:${sec}`) {
             ringingTone.play();
             ringingTone.loop = true;
         }
        }
      }, 1000);
      display_select();
      show_select()
      resetClock()
  });
 

   