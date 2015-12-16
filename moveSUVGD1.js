function moveSUVGD1(pname, px, py, pmap) {
	$("body").trigger({
		type : "refreshmap",
		name : pname,
		walk : getDirection(px, py)
	});
}

function getDirection(px, py) {
	var north = map[px][py + 1];
	var south = map[px][py - 1];
	var west = map[px - 1][py];
	var east = map[px + 1][py];

	console.log("px: " + px + "py: " + py);
	console.log("north: " + north + "west: " + west + "south: " + south
			+ "east: " + east)
	// if (north == 1)
	// return 0;
	// if (west == 1)
	// return 1;
	// if (south == 1)
	// return 2;
	// if (east == 1)
	// return 3;
	//
	// return Math.floor(Math.random() * 4);
	return 2;
}