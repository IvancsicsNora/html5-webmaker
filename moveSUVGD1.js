function moveSUVGD1(pname, px, py, pmap) {
	$("body").trigger({
		type : "refreshmap",
		name : pname,
		walk : getDirection(px, py)
	});
}

function Coordinate(x, y) {
	this.x = x;
	this.y = y;
}

function getDirection(px, py) {
	var player = new Coordinate(px, py);
	// log
	console.log("need to run from: " + needToRun(5, player));
	if (needToRun(5, player) != "no") {
		var direction = getEscapeDirection(needToRun(5, player), player);
		if (direction == 4) {
			return Math.floor(Math.random() * 4);
		} else {
			return direction;
		}
	}

	var goal = getCoinCoordinate(player);
	// log
	console.log("goal: " + goal);
	var result = getPath(player, goal);
	// log
	console.log("result: " + result);

	if (result.length > 80) {
		return Math.floor(Math.random() * 4);
	} else {
		return result[0];
	}
}

function getEscapeDirection(name, player) {
	var distanceX = players[name].x - player.x;
	var distanceY = players[name].y - player.y;

	if (distanceY < 0 && canGoSouth(player)) {
		return 2;
	}

	if (distanceX < 0 && canGoEast(player)) {
		return 3;
	}
	if (distanceY > 0 && canGoNorth(player)) {
		return 0;
	}

	if (distanceX > 0 && canGoWest(player)) {
		return 1;
	}

	return 4;
}

function needToRun(limit, player) {
	var ghostNames = [ "m0", "m1", "m2", "m3", "m4" ];

	for (var i = 0; i < ghostNames.length; i++) {
		if (getDistanceFromGhost(ghostNames[i], player) < limit)
			return ghostNames[i];
	}

	return "no";
}

function getDistanceFromGhost(name, player) {
	return Math.abs(players[name].x - player.x)
			+ Math.abs(players[name].y - player.y);
}

function getPath(player, goal) {
	var path = [];

	var distanceX = goal.x - player.x;
	var distanceY = goal.y - player.y;
	var counter = 0;
	var pathFinder = new Coordinate(player.x, player.y);

	while (!isReached(distanceX, distanceY, counter)) {
		counter++;

		if (distanceY < 0) {
			if (canGoNorth(pathFinder)) {
				go(path, pathFinder, 0);
				distanceY++;
				continue;
			}
			if (distanceX == 0 && canGoWest(pathFinder)) {
				go(path, pathFinder, 1);
				distanceX++;
				continue;
			}
			if (distanceX == 0 && canGoEast(pathFinder)) {
				go(path, pathFinder, 3);
				distanceX--;
				continue;
			}
		}
		if (distanceX < 0) {
			if (canGoWest(pathFinder)) {
				go(path, pathFinder, 1);
				distanceX++;
				continue;
			}
			if (distanceY == 0 && canGoNorth(pathFinder)) {
				go(path, pathFinder, 0);
				distanceY++;
				continue;
			}
			if (distanceY == 0 && canGoSouth(pathFinder)) {
				go(path, pathFinder, 2);
				distanceY--;
				continue;
			}

		}
		if (distanceY > 0) {
			if (canGoSouth(pathFinder)) {
				go(path, pathFinder, 2);
				distanceY--;
				continue;
			}
			if (distanceX == 0 && canGoWest(pathFinder)) {
				go(path, pathFinder, 1);
				distanceX++;
				continue;
			}
			if (distanceX == 0 && canGoEast(pathFinder)) {
				go(path, pathFinder, 3);
				distanceX--;
				continue;
			}
		}
		if (distanceX > 0) {
			if (canGoEast(pathFinder)) {
				go(path, pathFinder, 3);
				distanceX--;
				continue;
			}
			if (distanceY == 0 && canGoNorth(pathFinder)) {
				go(path, pathFinder, 0);
				distanceY++;
				continue;
			}
			if (distanceY == 0 && canGoSouth(pathFinder)) {
				go(path, pathFinder, 2);
				distanceY--;
				continue;
			}
		}
	}
	return path;
}

function go(path, pathFinder, direction) {
	switch (direction) {
	case 0:
		pathFinder.y = pathFinder.y - 1;
		path.push(0);
		break;
	case 1:
		pathFinder.x = pathFinder.x - 1;
		path.push(1);
		break;
	case 2:
		pathFinder.y = pathFinder.y + 1;
		path.push(2);
		break;
	case 3:
		pathFinder.x = pathFinder.x + 1;
		path.push(3);
		break;
	default:
		return;
	}
}

function canGoEast(pathFinder) {
	if (map[pathFinder.y][pathFinder.x + 1] != 9)
		return true;

	return false;
}

function canGoSouth(pathFinder) {
	if (map[pathFinder.y + 1][pathFinder.x] != 9)
		return true;

	return false;
}

function canGoWest(pathFinder) {
	if (map[pathFinder.y][pathFinder.x - 1] != 9)
		return true;

	return false;
}

function canGoNorth(pathFinder) {
	if (map[pathFinder.y - 1][pathFinder.x] != 9)
		return true;

	return false;
}

function isReached(distanceX, distanceY, counter) {
	if (isShouldBeAborted(counter))
		return true;

	return distanceY == 0 && distanceX == 0;
}

function isShouldBeAborted(counter) {
	if (counter > 100)
		return true;

	return false;
}

function getCoinCoordinate(player) {
	var iteration = 1;
	while (iteration < map.length * 2) {
		// Check first quarter
		var checkQuarter = checkQuarterIAndIII(player, 1, iteration);
		if (checkQuarter != null)
			return checkQuarter;

		// Check second quarter
		checkQuarter = checkQuarterIIAndIV(player, 1, iteration);
		if (checkQuarter != null)
			return checkQuarter;

		// Check third quarter
		checkQuarter = checkQuarterIAndIII(player, -1, iteration);
		if (checkQuarter != null)
			return checkQuarter;

		// Check forth quarter
		checkQuarter = checkQuarterIIAndIV(player, -1, iteration);
		if (checkQuarter != null)
			return checkQuarter;

		iteration++;
	}
	return player;
}

function checkQuarterIAndIII(player, n, iteration) {
	var j = iteration;
	for (var i = 0; i < iteration; i++) {
		var coordinateY = player.y + (n * i);
		var coordinateX = player.x + (-n * j);
		if (isCoordinateContainsCoin(coordinateY, coordinateX)) {
			return new Coordinate(coordinateX, coordinateY);
		}
		j--;
	}
	return null;
}

function isCoordinateContainsCoin(coordinateY, coordinateX) {
	if (isInBoundries(coordinateY, coordinateX))
		return map[coordinateY][coordinateX] == 1;

	return false;
}

function isInBoundries(coordinateY, coordinateX) {
	return coordinateX >= 0 && coordinateX < map[0].length && coordinateY >= 0
			&& coordinateY < map.length;
}

function checkQuarterIIAndIV(player, n, iteration) {
	var j = iteration;
	for (var i = 0; i < iteration; i++) {
		var coordinateY = player.y + (n * j);
		var coordinateX = player.x + (n * i);
		if (isCoordinateContainsCoin(coordinateY, coordinateX)) {
			return new Coordinate(coordinateX, coordinateY);
		}
		j--;
	}
	return null;
}
