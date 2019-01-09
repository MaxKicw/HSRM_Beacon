// Beispielhafte Beacons
var beaconCollection = [{name:"workshop",distance:56,station:"a",counter:0},{name:"onlineshop",distance:9,station:"b",counter:0},{name:"drucker",distance:70,station:"c",counter:0}];
function findNearest() {
  let lowest = {distance:0};
    setInterval(function() {
    for(i=0;i<beaconCollection.length;i++){
        beaconCollection[i].distance = Math.floor((Math.random() * 10) + 1);
    }
     for(i=0;i<beaconCollection.length-1;i++){
        if(beaconCollection[i].distance < beaconCollection[i+1].distance){
            lowest = beaconCollection[i];
            if(lowest.counter>5){
                console.log(lowest.distance);
                beaconCollection.map(beacon => beacon.counter = 0);
            }
        }else if(lowest.distance > beaconCollection[i+1].distance){
            lowest = beaconCollection[i+1];
            if(lowest.counter>5){
                console.log(lowest.distance);
                beaconCollection.map(beacon => beacon.counter = 0);
            }
        }
    }
    lowest.counter++;
    }, 100);
}
findNearest();
