var stations = [{name:"workshop",distance:56,station:"a",counter:0},{name:"onlineshop",distance:9,station:"b",counter:0},{name:"drucker",distance:70,station:"c",counter:0}];
function myFunction() {
  let lowest = {distance:0};
    setInterval(function() {
    for(i=0;i<stations.length;i++){
        stations[i].distance = Math.floor((Math.random() * 10) + 1);
    }
     for(i=0;i<stations.length-1;i++){
        console.log("Check");
        if(stations[i].distance < stations[i+1].distance){
            lowest = stations[i];
            if(lowest.counter>5){
                console.log(lowest.distance);
                stations.map(beacon => beacon.counter = 0);
            }
        }else if(lowest.distance > stations[i+1].distance){
            lowest = stations[i+1];
            if(lowest.counter>5){
                console.log(lowest.distance);
                stations.map(beacon => beacon.counter = 0);
            }
        }
    }
    lowest.counter++;
}, 100);

}
myFunction();