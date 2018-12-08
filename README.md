# Train Scheduler
Train Scheduler utilizes Firebase and Moment.js to log train times, calculate the next time of arrival and the minutes until the train arrives.


## Technologies Used
* Bootstrap
* Javascript
* jQuery
* Firebase
* Moment.js
## Prerequisites
* None

## Challenges 
Moment.js is a bit difficulty to work with due to their rather convoluted documentation. 
Due to how Moment.js works, it is necessary to subtract the time by 1 year when calculated the initial train time.

Example:
```
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
```
