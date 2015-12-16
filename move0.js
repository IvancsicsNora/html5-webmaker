/**
 * 
 */

function move0(pname, px, py, pmap) {
	$("body").trigger({
		type : "refreshmap",
		name : pname,
		walk : getDirection(px, py)
	});
}

function getDireciton(px, py) {
	n = map[px, py + 1];
	w = map[px - 1, py];
	s = map[px, py - 1];
	e = map[px + 1, py];

	if (n === 1)
		return 0;
	if (w === 1)
		return 1;
	if (s === 1)
		return 2;
	if (e === 1)
		return 3;

	return 1;
}