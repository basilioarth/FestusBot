    
getWheather();
var newMessage = ""; 

function callAPI(method, url, key, host, data, type, isAsynchronous, callBackFunction){
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        callBackFunction(JSON.parse(this.responseText));
    }
    });
    
    xhr.open(method, url, isAsynchronous);
    type !== null && xhr.setRequestHeader("content-type", type);
    xhr.setRequestHeader("x-rapidapi-key", key);
    xhr.setRequestHeader("x-rapidapi-host", host);

    xhr.send(data);
}

function getWheather() {

    var url = "https://community-open-weather-map.p.rapidapi.com/weather?q=Teresina%2Cbr&lat=0&lon=0&lang=pt&units=%22metric%22%20or%20%22imperial%22"
    var key = "1952e6412cmsh9e8575a205305e5p1ddf0djsn430e2c8013dd"
    var host = "community-open-weather-map.p.rapidapi.com"
    var method = "GET"

    callAPI(method, url, key, host, null, null, true, HandleWheatherChange)
}

function HandleWheatherChange(response){
    //console.log(response.main.temp - 273.15 + ' ºC');
    console.log(response);
}

function sendMessageToIA(){
    var newMessage = document.getElementById("message-to-send"); // Falta o .value
    //document.getElementById("message-to-send").value = "";
    if(false){
        TranslateMessage(newMessage);
    }

    var url = `https://acobot-brainshop-ai-v1.p.rapidapi.com/get?bid=155655&key=84YBs1lzrJviXfDK&uid=mashape&msg=${newMessage}`;
    var key = "1952e6412cmsh9e8575a205305e5p1ddf0djsn430e2c8013dd"
    var host = "acobot-brainshop-ai-v1.p.rapidapi.com"
    var method = "GET"

    callAPI(method, url, key, host, null, null, true, HandleIaResponse);
}

function HandleIaResponse(response){
    console.log(response.cnt);
}

function formatMesssage(message){
    var msg = "";
    if(message === "") {
        msg = "text=Olá&tl=en&sl=pt"
    } else {
        message = message.split(" ");
        msg = "text=";
        for(var index = 0; index < (message.length - 1); index++){
            msg = msg + message[index] + "%20";
        }
        msg = msg + message[index] + "&tl=en&l=pt";
    }

    return msg;
}

function TranslateMessage(message){

    var method = "POST"
    var url = "https://google-translate20.p.rapidapi.com/translate"
    var key = "1952e6412cmsh9e8575a205305e5p1ddf0djsn430e2c8013dd"
    var host = "google-translate20.p.rapidapi.com"
    var data = formatMesssage(message);
    var type = "application/x-www-form-urlencoded"

    callAPI(method, url, key, host, data, type, false, HandleTranslateResponse);
}

function HandleTranslateResponse(response){
    console.log(response.data.translation);
    newMessage = response.data.translation;
}