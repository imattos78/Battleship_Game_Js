// Variables
var playerFleet, cpuFleet;
var attemptedHits = [];
// Object Constructors
function Fleet(name) {
	this.name = name;
	this.shipDetails = [{ "name": "carrier", "length": 5 },
						{ "name": "battleship", "length": 4 },
						{ "name": "cruiser", "length": 3 },
						{ "name": "destroyer", "length": 3 },
						{ "name": "frigate", "length": 2 }];
	this.numOfShips = this.shipDetails.length;
	this.ships = [];
	this.currentShipSize = 0;
	this.currentShip = 0;
	this.initShips = function() {
		for(var i = 0; i < this.numOfShips; i++) {
			this.ships[i] = new Ship(this.shipDetails[i].name);
			this.ships[i].length = this.shipDetails[i].length;
		}
	};
	this.removeShip = function(pos) {
		this.numOfShips--;
		$(".text").text(output.sunk(this.name, this.ships[pos].name));
		if (this == playerFleet) bot.sizeOfShipSunk = this.ships[pos].length;
		this.ships.splice(pos, 1);
		if (this.ships.length == 0) {
			$(".text").text(output.lost(this.name));
		}
		return true;
	};
	this.shipHit = function(ship_name) {
		$(".text").text(output.hit(this.name));
		return true;
	}
	this.checkIfHit = function(point) {
		for(var i = 0; i < this.numOfShips; i++) {
			if (this.ships[i].checkLocation(point)) {
				this.ships[i].getRidOf(this.ships[i].hitPoints.indexOf(point));
				if (this.ships[i].hitPoints == 0)return this.removeShip(i);
				else return this.shipHit(this.ships[i].name);
			}
		}
		return false;
	};
}
