import socket from "./socket"

let currentEvent = location.pathname.split('/')[2];
let channel = socket.channel(`events:${currentEvent}`, {})

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

channel.on("new_location", (coords) => console.log(coords))
setInterval(function(){
  navigator.geolocation.getCurrentPosition(function(coordinates){
      let {coords: {latitude: latitude, longitude:longitude}} = coordinates;
      let username = $('#username').val();
      channel.push("new_location", {longitude, latitude, username});
    }, function(err){
      console.log(err);
  });
}, 1000);
