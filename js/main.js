
console.log("Today:",moment().format('DD/MM/YYYY hh:mm'));

var dayNames = ['sun','mon','tue','wed','thu','fri','sat'];
var monthNames = ['January','February','March', 'April','May','June','July','August','September','November','December'];
var month = moment().month()+1;
var year = moment().year();
var calenderDays = [];

$('#month').text(monthNames[month-1]);
$('#year').text(year);

var today = new Date();

var getDaysArray = function(year, month) {
    var date = new Date(year, month-1, 1);
    var result = [];
    while (date.getMonth() == month-1) {
        result.push({
            date: date.getDate(),
            day: dayNames[date.getDay()],
            isToday: ((date.getDate() == today.getDate()) && (date.getMonth() == today.getMonth()) && (date.getYear() == today.getYear()))
        })
        date.setDate(date.getDate()+1);
    }
    return result;
}

function loadCalendar(){
    $('#calendar').text('');
    calenderDays = getDaysArray(year, month);

    switch (calenderDays[0].day) {
        case 'tue':
        calenderDays.unshift({date: 0, day: "", isToday: false});
        break;
        case 'wed':
        calenderDays.unshift({date: 0, day: "", isToday: false});
        calenderDays.unshift({date: 0, day: "", isToday: false});
        break;
        case 'thu':
        calenderDays.unshift({date: 0, day: "", isToday: false});
        calenderDays.unshift({date: 0, day: "", isToday: false});
        calenderDays.unshift({date: 0, day: "", isToday: false});
        break;
        case 'fri':
        calenderDays.unshift({date: 0, day: "", isToday: false});
        calenderDays.unshift({date: 0, day: "", isToday: false});
        calenderDays.unshift({date: 0, day: "", isToday: false});
        calenderDays.unshift({date: 0, day: "", isToday: false});
        break;
        case 'sat':
        calenderDays.unshift({date: 0, day: "", isToday: false});
        calenderDays.unshift({date: 0, day: "", isToday: false});
        calenderDays.unshift({date: 0, day: "", isToday: false});
        calenderDays.unshift({date: 0, day: "", isToday: false});
        calenderDays.unshift({date: 0, day: "", isToday: false});
        break;
        case 'sun':
        calenderDays.unshift({date: 0, day: "", isToday: false});
        calenderDays.unshift({date: 0, day: "", isToday: false});
        calenderDays.unshift({date: 0, day: "", isToday: false});
        calenderDays.unshift({date: 0, day: "", isToday: false});
        calenderDays.unshift({date: 0, day: "", isToday: false});
        calenderDays.unshift({date: 0, day: "", isToday: false});
        break;
    }


    console.log(calenderDays);
    var toAppend = "<tr>";
    for (var i = 0; i < calenderDays.length; i++) {
        if ((i == 7) || (i == 14) || (i == 21) || (i == 28) || (i == 35))
            toAppend += "</tr><tr>";
        if (calenderDays[i].date == 0){
            toAppend += "<td></td>";
        } else if((calenderDays[i].day == 'sat')){
            if (calenderDays[i+1]){
                if (calenderDays[i].isToday || calenderDays[i+1].isToday)
                    toAppend += "<td class='sabmingo today' colspan='2'>"+calenderDays[i].date+" and "+calenderDays[i+1].date+"</td>";
                else
                    toAppend += "<td class='sabmingo' colspan='2'>"+calenderDays[i].date+" and "+calenderDays[i+1].date+"</td>";
                i++;
            } else {
                if (calenderDays[i].isToday)
                    toAppend += "<td class='sabmingo today' colspan='2'>"+calenderDays[i].date+"</td>";
                else
                    toAppend += "<td class='sabmingo' colspan='2'>"+calenderDays[i].date+"</td>";
            }
        } else if((calenderDays[i].day == 'sun')){
            if (calenderDays[i].isToday)
                toAppend += "<td class='sabmingo today'>"+calenderDays[i].date+"</td>";
            else
                toAppend += "<td class='sabmingo'>"+calenderDays[i].date+"</td>";
        } else {
            if (calenderDays[i].isToday)
                toAppend += "<td class='today'>"+calenderDays[i].date+"</td>";
            else
                toAppend += "<td>"+calenderDays[i].date+"</td>";
        }
    }
    toAppend += "</tr>";

    $('#calendar').append(toAppend);

}

nextMonth = function(){
    month ++;
    if (month > 11){
        month = 1;
        year ++;
    }
    calenderDays = getDaysArray(year, month);
    $('#month').text(monthNames[month-1]);
    $('#year').text(year);
    loadCalendar();
}

function previousMonth(){
    month --;
    if (month < 1){
        month = 11;
        year --;
    }
    calenderDays = getDaysArray(year, month);
    $('#month').text(monthNames[month-1]);
    $('#year').text(year);
    loadCalendar();
}

function startCounter(time, text){
    var duration = moment.duration({
        'hour': time.split(':')[0],
        'minutes': time.split(':')[1],
        'seconds': time.split(':')[2]
    });
    var interval = 1;
    var timestamp = new Date(0,0,0,time.split(':')[0],time.split(':')[1],time.split(':')[2]);
    setInterval(function () {
        timestamp = new Date(timestamp.getTime() + interval*1000);
        duration = moment.duration(duration.asSeconds() - interval, 'seconds');
        var message = "";
        if (duration.days() > 0)
            message += duration.days() + 'd:';
            $('#message').text( + duration.hours() + 'h:' + duration.minutes() + 'm:' + duration.seconds() + 's' + text);
        if (duration.hours() > 0)
            message += duration.hours() + 'h:';
        message += duration.minutes() + 'm:' + duration.seconds() + 's' + text;
        $('#message').text(message);
    }, 1000);
}

var now  = moment().format("DD/MM/YYYY HH:mm:ss");
var dayOfTheWeek = moment().weekday();
console.log("Now: ", now.toString(), ", week day", dayOfTheWeek);

switch(dayOfTheWeek){
    case 6:
        var then = moment().add(1, 'days').format('DD/MM/YYYY')+" 24:00:00";
        var ms = moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        startCounter(s," time left of sabmingo");
    break;
    case 0:
        var then = moment().format('DD/MM/YYYY')+" 24:00:00";
        var ms = moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        startCounter(s," time left of sabmingo");
    break;
    case 1:
        var then = moment().add((5), 'days').format('DD/MM/YYYY')+" 24:00:00";
        var ms = moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        startCounter(s," time to next sabmingo");
    break;
    case 2:
        var then = moment().add((5), 'days').format('DD/MM/YYYY')+" 24:00:00";
        var ms = moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        startCounter(s," time to next sabmingo");
    break;
    case 3:
        var then = moment().add((5), 'days').format('DD/MM/YYYY')+" 24:00:00";
        var ms = moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        startCounter(s," time to next sabmingo");
    break;
    case 4:
        var then = moment().add((5), 'days').format('DD/MM/YYYY')+" 24:00:00";
        var ms = moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        startCounter(s," time to next sabmingo");
    break;
    case 5:
        var then = now.split(' ')[0]+" 24:00:00";
        var ms = moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        startCounter(s," time to next sabmingo");
    break;
}

loadCalendar();
