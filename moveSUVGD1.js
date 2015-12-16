function moveSUVGD1(pname, px, py, pmap) {
	$("body").trigger({
		type : "refreshmap",
		name : pname,
		walk : 2
	});
}
