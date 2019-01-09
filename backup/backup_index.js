	// Application object
	var app = {
		counter:0,
		beaconCollection:[],
		startUp:true,
		mostRecentBeacon:"",
		selected:"",
	};
	// Toleranz für welcher Beacon aktiviert wird
	let tolerance = 0;
	// Create UPD socket when Cordova is loaded.
	document.addEventListener(
		'deviceready',
		function() { evothings.scriptsLoaded(app.init) },
		false)

	app.init = function()
	{
		app.startScan();
	}

	app.startScan = function()
	{
			evothings.eddystone.startScan(app.onBeaconFound, app.onError);
			setInterval(function() {
			app.counter = app.counter+1;
			console.log(app.counter);
			evothings.eddystone.startScan(app.onBeaconFound, app.onError);
			}, 600);
	}

	app.stopScan = function()
	{

	    // Start scan.
	    evothings.eddystone.stopScan()
	}

	app.onBeaconFound = function(beacon)
	{
		app.counter = 0;
		app.mostRecentBeacon = beacon;
		console.log("#####################################"+JSON.stringify(app.selected)+"###############################");
		// Hier wird die Distanz der Beacons berechnt
		var distance = app.calculateBeaconDistance(beacon) || '';
		findNearest(app.beaconCollection);
		switchContent(app.selected);
		// Beim ersten Setup ist die app.beaconCollection leer, also wird 
		// der erste der gefunden wird auf jedenfall eingefügt
		if(app.startUp){
			var beacon = {
					name:beacon.url,
					distance:distance,
					station:beacon.url,
					counter:0,
				}
			app.beaconCollection.push(beacon);
			app.startUp = false;
		}
		// Anschließend sollen keine Beacons hinzugefügt werden,
		// wo die Distanz unbekannt ist
		// Hier wird die Distanz geupdated. Ist der Beaconname bekannt (knownBeacon.name) dann wird die
		// die alte Distanz mit der neuen ersetzt Z.67
		if(distance != undefined){
			let overviewArray = app.beaconCollection.map((knownBeacon,index) => {
				if(knownBeacon.name == app.mostRecentBeacon.url){
					app.beaconCollection[index].distance = distance;
					return true;
				}else{
					return false;
				}
			});
			// Dann wird der Beacon entweder hinzugefügt oder nicht
			if(overviewArray.includes(true)){
				return;
			}else{
				var obj = {
					name:app.mostRecentBeacon.url,
					distance:distance,
					station:app.mostRecentBeacon.url,
					counter:0,
				}
				app.beaconCollection.push(obj);
			}
		}
		function findNearest(beaconCollection) {
				let smallest={distance:100};;
			   for(i=0;i<beaconCollection.length-1;i++){
				  if(beaconCollection[i].distance < beaconCollection[i+1].distance){
					  smallest = app.beaconCollection[i];
					  if(smallest.counter>=5){
						app.selected = smallest;
						app.beaconCollection.map(beacon => beacon.counter = 0);
					  }
				  }else if(smallest.distance > beaconCollection[i+1].distance){
						smallest = app.beaconCollection[i+1];
					  if(smallest.counter>=5){
						app.selected = smallest;
						app.beaconCollection.map(beacon => beacon.counter = 0);
					  }
				  }
			  }
			  smallest.counter++;
		  }
		  function switchContent(selected){
			  if(selected.name === undefined){
				
			  }else{
				  let station = selected.name;
				  document.getElementById("https://twitter.com/woasned").classList.remove('active');
				  document.getElementById("https://twitter.com/estimote").classList.remove('active');
				  document.getElementById(station).classList.add('active');
			  }
		  }
	}

	app.onError = function(error)
	{
	}

	app.showArray = function(array)
	{
		document.getElementById('array').innerHTML = array
	}

	app.calculateBeaconDistance = function(beacon)
	{
		return evothings.eddystone.calculateAccuracy(beacon.txPower, beacon.rssi)
	}