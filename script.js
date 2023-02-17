var city = ""

async function showData(){
    var lat
    var lan
    navigator.geolocation.getCurrentPosition( async(position) => {
        lat = position.coords.latitude;
        lan = position.coords.longitude;

        console.log(lat)

        var fetchData

        city = document.getElementById("city").value || "";
        console.log(city)


        if (city !== "") {
            fetchData = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7a876595611740e3b0974313231402&q=${city}&aqi=no&days=7`)
        } else {
            fetchData = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7a876595611740e3b0974313231402&q=${lat},${lan}&aqi=no&days=7`)
        }
        
        var data = await fetchData.json()

        console.log(data)


        document.getElementById("location").innerHTML=city;
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" +
            data.current.condition.text +
            "')";
        document.getElementById("location").innerHTML=data.location.name;
        document.getElementById("region").innerHTML=data.location.region;
        document.getElementById("tz_id").innerHTML=data.location.tz_id;
        document.getElementById("temp_c").innerHTML=data.current.temp_c + "\u00B0"+"C";
        document.getElementById("climate").innerHTML=data.current.condition.text;
        document.getElementById("climate-icon").src="https:"+data.current.condition.icon;
        document.getElementById("wind_dir-text").innerHTML= "Wind-Direction";
        document.getElementById("wind_dir").innerHTML=data.current.wind_dir;
        document.getElementById("wind_kph-text").innerHTML="Wind-Speed";
        document.getElementById("wind_kph").innerHTML=data.current.wind_kph+" Kmph";
        document.getElementById("humidity-text").innerHTML="Humidity";
        document.getElementById("humidity").innerHTML=data.current.humidity;
        document.getElementById("condition-text").innerHTML="Condition"
        document.getElementById("condition").innerHTML=data.current.condition.text;
        document.getElementById("condition-icon").src="https:"+data.current.condition.icon;
        
        Week=["Sunday","Monday","Tuesday","wednesday","Thrusday","Friday","Saturday"];
        let daily_weather = "";
        (data.forecast.forecastday).map(weather=>{
        const today1 = new Date(weather.date); 
            days = Week[today1.getDay()];
            console.log(today1)
            daily_weather = daily_weather + `<div class="today col-2 card g-3 d-flex align-items-center p-3"style=""width:180px;height:200px;>
            <div id="todays"class="day fs-5">
                ${days}
            </div>
            <div >
                <img src="${"https:"+weather.day.condition.icon}">
            </div>
            <div id="today-climate"class="d-flex align-items-center justify-content-start p-3"style="margin-left:4px;">
                ${weather.day.condition.text}
            </div>
            <div class="d-flex align-items-center justify-content-start">
                <div id="avg_temp"style="font-size:20px;">
                    ${weather.day.avgtemp_c+"\u00B0"+"C"}
                </div>
            </div>
        </div>`
        document.getElementById("daily-weather").innerHTML=daily_weather;
        })    
    });
    
}


showData()