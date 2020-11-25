const jscad = require('@jscad/modeling')
const { curves, maths, extrusions, primitives, transforms, booleans, 
	colors, geometries, measurements, utils } = jscad
const { bezier } = curves
const { slice, extrudeLinear } = extrusions
const { cuboid, polygon, polyhedron } = primitives
const { intersect, subtract,union } = booleans
const { center, scale, translateX, translateY, translateZ, translate
		,rotateX, rotateY, rotateZ } = transforms
const { colorize } = colors
const { geom3, poly3 } = geometries
const { vec3 } = maths
const { measureBoundingBox, measureArea } = measurements
const { degToRad } = utils

const getParameterDefinitions = () => {
  return [
    {name: 'g1', caption: 'Lignes', type: 'group'},
    {name: 'l0', caption: '#1:', type: 'slider', min:"0", max:"100", step:"1", initial:"50"},
    {name: 'l1', caption: '#2:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'l2', caption: '#3:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'l3', caption: '#4:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'l4', caption: '#5:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'l5', caption: '#6:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'l6', caption: '#7:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'l7', caption: '#8:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'l8', caption: '#9:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'l9', caption: '#10:',type: 'slider', min:"0", max:"100", step:"1", initial:"0"},

    {name: 'g2', caption: 'Colonnes', type: 'group'},
    {name: 'c0', caption: '#1:', type: 'slider', min:"0", max:"100", step:"1", initial:"50"},
    {name: 'c1', caption: '#2:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'c2', caption: '#3:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'c3', caption: '#4:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'c4', caption: '#5:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'c5', caption: '#6:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'c6', caption: '#7:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'c7', caption: '#8:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'c8', caption: '#9:', type: 'slider', min:"0", max:"100", step:"1", initial:"0"},
    {name: 'c9', caption: '#10:',type: 'slider', min:"0", max:"100", step:"1", initial:"0"},

    {name: 'g3', caption: 'Parametres', type: 'group'},
    //,{name: 'v', type:'text', caption: 'volume:', initial: 'test'}
    ,{name: 'ep', type:'float', caption: 'ep (mm):', initial: 6.0}    

   ];
}

volume = function () {
  const faces =[[0,37,25],[0,46,37],[0,58,31],[1,30,26],[1,53,34],[1,57,30],[2,36,27],[2,49,36],[2,59,32],[3,29,28],[3,42,39],[3,60,29],[4,39,81],[4,44,41],[4,81,44],[4,86,71],[5,40,43],[5,81,42],[6,15,74],[6,44,43],[6,74,44],[7,37,82],[7,48,45],[7,82,48],[7,85,69],[8,38,47],[8,82,46],[9,12,75],[9,48,47],[9,75,48],[10,35,51],[10,83,49],[11,36,83],[11,52,50],[11,83,52],[11,87,68],[12,52,51],[12,76,78],[12,78,52],[13,33,56],[13,84,53],[14,34,84],[14,55,54],[14,84,55],[14,88,66],[15,73,79],[15,79,55],[16,20,57],[16,29,20],[17,20,58],[17,30,20],[18,20,59],[18,31,20],[19,20,60],[19,32,20],[21,60,3],[21,159,92],[22,49,2],[22,165,94],[23,57,1],[23,129,89],[24,46,0],[24,149,95],[25,58,0],[25,139,90],[26,53,1],[26,145,93],[27,59,2],[27,153,91],[28,42,3],[28,135,96],[29,61,105],[30,62,106],[31,24,0],[31,63,107],[32,22,2],[32,64,108],[33,45,75],[34,23,1],[34,53,104],[34,66,110],[35,41,74],[36,49,101],[36,68,112],[37,46,99],[37,69,113],[38,50,76],[39,21,3],[39,42,97],[39,71,115],[40,54,73],[41,35,126],[41,86,4],[42,72,5],[43,44,121],[43,73,6],[43,81,5],[44,74,98],[45,33,125],[45,85,7],[46,70,8],[47,48,122],[47,76,9],[47,82,8],[48,75,100],[49,67,10],[50,38,127],[50,87,11],[51,52,123],[51,77,12],[51,83,10],[52,78,102],[53,65,13],[54,40,128],[54,88,14],[55,56,15],[55,79,103],[56,55,124],[56,80,15],[56,84,13],[57,20,30],[57,61,16],[58,20,31],[58,62,17],[59,20,32],[59,63,18],[60,20,29],[60,64,19],[61,29,16],[61,57,89],[61,137,105],[62,30,17],[62,58,90],[62,147,106],[63,31,18],[63,59,91],[63,151,107],[64,32,19],[64,60,92],[64,167,108],[65,53,93],[65,85,13],[65,143,109],[66,34,14],[66,131,110],[67,49,94],[67,86,10],[67,163,111],[68,36,11],[68,155,112],[69,37,7],[69,141,113],[70,46,95],[70,87,8],[70,157,114],[71,39,4],[71,161,115],[72,42,96],[72,88,5],[72,133,116],[73,15,6],[73,43,117],[73,54,79],[76,12,9],[76,47,118],[76,50,78],[77,35,74],[77,51,119],[77,74,75],[77,75,12],[80,33,75],[80,56,120],[80,74,15],[80,75,74],[85,33,13],[86,35,10],[87,38,8],[88,40,5],[89,57,23],[89,129,61],[90,58,25],[90,139,62],[91,59,27],[91,153,63],[92,60,21],[92,159,64],[93,53,26],[93,145,65],[94,49,22],[94,165,67],[95,46,24],[95,149,70],[96,42,28],[96,135,72],[97,42,81],[97,81,39],[98,41,44],[98,74,41],[99,46,82],[99,82,37],[100,45,48],[100,75,45],[101,49,83],[101,83,36],[102,50,52],[102,78,50],[103,54,55],[103,79,54],[104,53,84],[104,84,34],[105,28,29],[105,137,28],[106,26,30],[106,147,26],[107,24,31],[107,151,24],[108,22,32],[108,167,22],[109,69,85],[109,85,65],[109,143,69],[110,23,34],[110,131,23],[111,71,86],[111,86,67],[111,163,71],[112,27,36],[112,155,27],[113,25,37],[113,141,25],[114,68,87],[114,87,70],[114,157,68],[115,21,39],[115,161,21],[116,66,88],[116,88,72],[116,133,66],[117,40,73],[117,43,40],[118,38,76],[118,47,38],[119,35,77],[119,51,35],[120,33,80],[120,56,33],[121,44,81],[121,81,43],[122,48,82],[122,82,47],[123,52,83],[123,83,51],[124,55,84],[124,84,56],[125,33,85],[125,85,45],[126,35,86],[126,86,41],[127,38,87],[127,87,50],[128,40,88],[128,88,54],[129,23,130],[129,132,138],[130,23,131],[130,132,129],[131,66,132],[131,132,130],[132,66,133],[133,72,134],[133,138,132],[134,72,135],[134,136,138],[134,138,133],[135,28,136],[135,136,134],[136,28,137],[137,61,138],[137,138,136],[138,61,129],[139,25,140],[140,25,141],[140,148,139],[141,69,142],[141,142,140],[142,69,143],[142,148,140],[143,65,144],[143,148,142],[144,65,145],[144,148,143],[145,26,146],[145,146,144],[146,26,147],[147,62,148],[147,144,146],[148,62,139],[148,144,147],[149,24,150],[150,24,151],[150,152,158],[150,158,149],[151,63,152],[151,152,150],[152,63,153],[153,27,154],[153,156,152],[154,27,155],[154,156,153],[155,68,156],[155,156,154],[156,68,157],[157,70,158],[157,152,156],[158,70,149],[158,152,157],[159,21,160],[160,21,161],[160,162,168],[160,168,159],[161,71,162],[161,162,160],[162,71,163],[163,67,164],[163,168,162],[164,67,165],[164,168,163],[165,22,166],[165,166,164],[166,22,167],[167,64,168],[167,164,166],[168,64,159],[168,164,167]]
  const vertices = [[146.025,55.39034689,1.1463298e-15],[-7.9326341e-16,55.39034689,-136.8984375],[-7.9326341e-16,55.39034689,136.8984375],[-146.025,55.39034689,1.1463298e-15],[-201.17292695,12.67629211,96.81667695],[-201.17292695,12.67629211,-96.81667695],[-199.125,-64.08465311,1.1463298e-15],[201.17292695,12.67629211,-96.81667695],[201.17292695,12.67629211,96.81667695],[199.125,-64.08465311,1.1463298e-15],[-97.43126028,12.67629211,179.69323945],[97.43126028,12.67629211,179.69323945],[-7.9326341e-16,-64.08465311,182.53125],[97.43126028,12.67629211,-179.69323945],[-97.43126028,12.67629211,-179.69323945],[-7.9326341e-16,-64.08465311,-182.53125],[-99.5625,55.39034689,-93.33984375],[99.5625,55.39034689,-93.33984375],[99.5625,55.39034689,93.33984375],[-99.5625,55.39034689,93.33984375],[-7.9326341e-16,55.39034689,1.1463298e-15],[-168.88134252,59.25760379,93.10321752],[-93.65634252,59.25760379,161.96728002],[-93.65634252,59.25760379,-161.96728002],[168.88134252,59.25760379,93.10321752],[168.88134252,59.25760379,-93.10321752],[93.65634252,59.25760379,-161.96728002],[93.65634252,59.25760379,161.96728002],[-168.88134252,59.25760379,-93.10321752],[-132.75,55.39034689,-49.78125],[53.1,55.39034689,-124.453125],[132.75,55.39034689,49.78125],[-53.1,55.39034689,124.453125],[128.325,-24.25965311,-173.68125],[-50.5912685,36.91504827,-170.342831],[-128.325,-24.25965311,173.68125],[50.5912685,36.91504827,170.342831],[187.7662685,36.91504827,-50.5912685],[181.425,-24.25965311,131.64375],[-187.7662685,36.91504827,50.5912685],[-181.425,-24.25965311,-131.64375],[-181.425,-24.25965311,131.64375],[-187.7662685,36.91504827,-50.5912685],[-207.975,-24.25965311,-49.78125],[-207.975,-24.25965311,49.78125],[181.425,-24.25965311,-131.64375],[187.7662685,36.91504827,50.5912685],[207.975,-24.25965311,49.78125],[207.975,-24.25965311,-49.78125],[-50.5912685,36.91504827,170.342831],[128.325,-24.25965311,173.68125],[-48.675,-24.25965311,184.74375],[48.675,-24.25965311,184.74375],[50.5912685,36.91504827,-170.342831],[-128.325,-24.25965311,-173.68125],[-48.675,-24.25965311,-184.74375],[48.675,-24.25965311,-184.74375],[-53.1,55.39034689,-124.453125],[132.75,55.39034689,-49.78125],[53.1,55.39034689,124.453125],[-132.75,55.39034689,49.78125],[-133.48134252,62.57635379,-129.88603002],[133.48134252,62.57635379,-129.88603002],[133.48134252,62.57635379,129.88603002],[-133.48134252,62.57635379,129.88603002],[137.90634252,42.66385379,-174.68915502],[-137.90634252,42.66385379,-174.68915502],[-137.90634252,42.66385379,174.68915502],[137.90634252,42.66385379,174.68915502],[186.58134252,42.66385379,-135.69384252],[186.58134252,42.66385379,135.69384252],[-186.58134252,42.66385379,135.69384252],[-186.58134252,42.66385379,-135.69384252],[-185.85,-64.08465311,-86.2875],[-185.85,-64.08465311,86.2875],[185.85,-64.08465311,-86.2875],[185.85,-64.08465311,86.2875],[-79.65,-64.08465311,179.2125],[79.65,-64.08465311,179.2125],[-79.65,-64.08465311,-179.2125],[79.65,-64.08465311,-179.2125],[-207.975,12.24659689,1.1463298e-15],[207.975,12.24659689,1.1463298e-15],[-7.9326341e-16,12.24659689,182.8078125],[-7.9326341e-16,12.24659689,-182.8078125],[161.2162685,13.68379827,-151.2600185],[-161.2162685,13.68379827,151.2600185],[161.2162685,13.68379827,151.2600185],[-161.2162685,13.68379827,-151.2600185],[-96.16507402,61.13915241,-143.73382402],[149.26507402,61.13915241,-93.95257402],[96.16507402,61.13915241,143.73382402],[-149.26507402,61.13915241,93.95257402],[96.16507402,47.86415241,-172.49632402],[-96.16507402,47.86415241,172.49632402],[184.66507402,47.86415241,96.16507402],[-184.66507402,47.86415241,-96.16507402],[-194.7,28.84034689,1.1463298e-15],[-194.7,-37.53465311,92.925],[194.7,28.84034689,1.1463298e-15],[194.7,-37.53465311,-92.925],[-7.9326341e-16,28.84034689,173.68125],[88.5,-37.53465311,181.425],[-88.5,-37.53465311,-181.425],[-7.9326341e-16,28.84034689,-173.68125],[-149.26507402,61.13915241,-93.95257402],[96.16507402,61.13915241,-143.73382402],[149.26507402,61.13915241,93.95257402],[-96.16507402,61.13915241,143.73382402],[166.96507402,34.58915241,-158.11507402],[-96.16507402,47.86415241,-172.49632402],[-166.96507402,34.58915241,158.11507402],[96.16507402,47.86415241,172.49632402],[184.66507402,47.86415241,-96.16507402],[166.96507402,34.58915241,158.11507402],[-184.66507402,47.86415241,96.16507402],[-166.96507402,34.58915241,-158.11507402],[-194.7,-37.53465311,-92.925],[194.7,-37.53465311,92.925],[-88.5,-37.53465311,181.425],[88.5,-37.53465311,-181.425],[-212.4,-10.98465311,1.1463298e-15],[212.4,-10.98465311,1.1463298e-15],[-7.9326341e-16,-10.98465311,185.85],[-7.9326341e-16,-10.98465311,-185.85],[159.3,-10.98465311,-154.875],[-159.3,-10.98465311,154.875],[159.3,-10.98465311,154.875],[-159.3,-10.98465311,-154.875],[-118.76914115,164.4015031,-139.85703177],[-117.5147754,164.4015031,-148.97375977],[-118.76914115,164.4015031,-154.23828177],[-139.6397754,164.4015031,-155.33469727],[-154.16914115,164.4015031,-147.04765677],[-163.9772754,164.4015031,-135.83704102],[-163.01914115,164.4015031,-116.07265677],[-155.1272754,164.4015031,-114.54172852],[-145.31914115,164.4015031,-114.96640677],[-137.4272754,164.4015031,-132.93313477],[145.31914115,164.4015031,-114.96640677],[155.1272754,164.4015031,-114.54172852],[163.01914115,164.4015031,-116.07265677],[163.9772754,164.4015031,-135.83704102],[154.16914115,164.4015031,-147.04765677],[139.6397754,164.4015031,-155.33469727],[118.76914115,164.4015031,-154.23828177],[117.5147754,164.4015031,-148.97375977],[118.76914115,164.4015031,-139.85703177],[137.4272754,164.4015031,-132.93313477],[163.01914115,164.4015031,116.07265677],[155.1272754,164.4015031,114.54172852],[145.31914115,164.4015031,114.96640677],[137.4272754,164.4015031,132.93313477],[118.76914115,164.4015031,139.85703177],[117.5147754,164.4015031,148.97375977],[118.76914115,164.4015031,154.23828177],[139.6397754,164.4015031,155.33469727],[154.16914115,164.4015031,147.04765677],[163.9772754,164.4015031,135.83704102],[-145.31914115,164.4015031,114.96640677],[-155.1272754,164.4015031,114.54172852],[-163.01914115,164.4015031,116.07265677],[-163.9772754,164.4015031,135.83704102],[-154.16914115,164.4015031,147.04765677],[-139.6397754,164.4015031,155.33469727],[-118.76914115,164.4015031,154.23828177],[-117.5147754,164.4015031,148.97375977],[-118.76914115,164.4015031,139.85703177],[-137.4272754,164.4015031,132.93313477]]
  const groups = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
return {faces:faces, vertices:vertices, groups:groups}
}

const main = (params) => {
  const sc = 1, ep = params.ep *2

	//const vv = require('./' + params.v + '.obj')
	//const vv = require('./0002.obj')
	const vd = volume()
	const vv = polyhedron({points: vd.vertices, faces: vd.faces})

  let vol = center({}, rotateY(degToRad(180), rotateX(degToRad(90), vv)))
  
  let r = [], rH = [], rV = []
  let bV = measureBoundingBox(vol)
  //vol = translate([-bV[0][0], -bV[0][1], -bV[0][2]], vol)
  //bV = measureBoundingBox(vol)

	// Recup parametres
  const pv = Object.values(params)
  const lH = pv.slice(0,10).filter(Number).map(x => (x-50)/100)
  const lV = pv.slice(10,20).filter(Number).map(x => (x-50)/100)
  
	console.log(pv,lH, lV)
	// 1°) Traverses en X (H)
  fH = bV[1][0] - bV[0][0]
  mH = (bV[1][0] + bV[0][0]) / 2
  var trH = cuboid( {
		size: [ ep, 1+bV[1][1]- bV[0][1], 1+bV[1][2] - bV[0][2] ]} )
	for (let i = 0; i < lH.length; i++){
		var t = intersect(vol, translateX(fH * lH[i], trH))
		if (t.polygons.length > 0)
			rH.push(t)
	}

	// 2°) Traverses en Y (V)
	fV = bV[1][1] - bV[0][1]
	mV = (bV[1][1] + bV[0][1]) / 2
	var trV = cuboid( {
		size: [ 1+ bV[1][0] - bV[0][0], ep, 1+ bV[1][2] - bV[0][2] ]} )	
	for (let i = 0; i < lV.length; i++){
		var t = intersect(vol, translateY(fV * lV[i], trV))
		if (t.polygons.length > 0)
			rV.push(t)
	}
	
	// 3°) Entrecroisement
	var ur = union(intersect(union(rH), union(rV)));
	var tmp = scission3d(ur)  
	var eS = [], eH = [], eV = [];
	for(let i=0; i< tmp.length; i++){
		let p = tmp[i];
		let b = measureBoundingBox(p), 
				d = vec3.subtract(b[1], b[0]);
		let c1 = translate([b[0][0], b[0][1] + ep/2, b[0][2]], 
					cuboid({size: [d[0], d[1]*2, d[2]]}));
		let c2 = translate([b[0][0] + ep/2, b[0][1], b[1][2]], 
					cuboid({size: [d[0]*2, d[1], d[2]]}));
		
		eH.push(intersect(tmp[i], c1));
		eV.push(intersect(tmp[i], c2));
	}
	
	rH = rH.map(x=> subtract(x, eV));
	rV = rV.map(x=> subtract(x, eH));

	// 3d
	//r.push(colorize([0,1,0], translateX(-70, vol)));
	//r.push(colorize([1,0,0], translateX(32-70, rH)));
	//r.push(colorize([0,0,1], translateX(-32-70, rV)));
	
	// 2d
	
	console.log("haut.", fV, fH)
	var dk = Math.max(fV, fH) +1
	for(let ih = 0; ih < rH.length; ih++){
		let b = measureBoundingBox(rH[ih]);
		r.push(translate([dk *ih, dk/2], union(vol2surf(rH[ih], 'x', b[0][0]))))
		//r.push(translateX(dk *ih, vol2surf(rH[ih], 'x', b[0][0])))
	}
	for(let iv = 0; iv < rV.length; iv++){
		let b = measureBoundingBox(rV[iv]);
		r.push(translate([dk *iv, -dk], union(vol2surf(rV[iv], 'y', b[0][1]))))
		//r.push(translate([dk *iv, -dk], vol2surf(rV[iv], 'y', b[0][1])))
	}
		
	return r;
}
function rndColors(){return [Math.random(), Math.random(), Math.random()];}
function sortNb	(E){ // returns E numerically sorted and deduplicated
	return E.sort(function(a, b) {return a-b}).filter(
	    function(item, pos, ary) {return !pos || item != ary[pos - 1]});
}
function scission3d	(geom){
  var i, Pl, j, i1, j1, ok, ti, tj, z, 
  zz = [], P, RScission, til, tjl, tii1, zzl, zzdl;
// construit table de correspondance entre Polygones (P)
// build polygons lookup table
  //P = geom.toPolygons();
  P = geom.polygons;
  
  RScission = [];
  Pl = P.length;
  for (i = 0; i < Pl; i++){
	ti = P[i].vertices;
	z = [];
	for (j = 0; j < Pl; j++){
      tj = P[j].vertices;
	  ok = false;
	  for (i1 = 0; i1 < ti.length; i1++){
	    tii1 = ti[i1];
		for(j1 = 0; j1 < tj.length; j1++)
		  if (!ok)ok = vec3.distance(tii1, tj[j1]) < 0.01;
	  }
	  if (ok)z.push(parseInt(j));
	}
	z = sortNb(z);
	zz.push({e:0, d:z});
  }

// regroupe les correspondances des polygones se touchant
// boucle ne s'arrêtant que quand deux passages retournent le même nb de polygones
// merge lookup data from linked polygons as long as possible
  ok = false;
  nElOk = 0;
  do {
    lnElOk = nElOk;
	nElOk = 0;
	for (i = 0; i < zz.length; i++){
	  if (zz[i].e >= 0) {
	    nElOk++;
		for (j = 0; j < zz[i].d.length; j++){
		  a = zz[i].d[j];
		  if (zz[a].e >= 0)
		    if (i != a) {
			  zz[i].d = sortNb(zz[i].d.concat(zz[a].d));
			  zz[a].e = -1;
			}
		}
	  }
	}
	ok = lnElOk == nElOk;
  }while (!ok);

// construit le tableau des CSG à retourner
// build array of CSG to return
  for (i = 0, zzl = zz.length; i < zzl; i++) {
    if (zz[i].e >= 0) {
			z = [];
			for (j = 0, zzdl = zz[i].d.length; j < zzdl; j++){
				z.push(P[zz[i].d[j]]);
			}
			if(z.length > 0) {
			RScission.push(geom3.create(z));
			}
	  }
  }

  return RScission;
}
function vol2surf(vol, axe, orig = 0){ // axe = 'x' | 'y' | 'z'
// retourne la surface formee par le volume avec l'axe z (à 0)
let S = [];
let X, Y, Z;

for(let n = 0; n < vol.polygons.length; n++){
  let pts = [];
  let P = vol.polygons[n];
  let ok = true;
  switch(axe){
		case 'x':
			X = 1; Y = 2; Z = 0;
			break;
		case 'y':
			X = 0; Y = 2; Z = 1;
			break;
		case 'z':
			X = 0; Y = 1; Z = 2;
			break;
	}
  for(let i=0; (i < P.vertices.length) && ok; i++){
    let pt = P.vertices[i];
    if(Math.abs(pt[Z] - orig)< 0.05){
      pts.push([pt[X], pt[Y]]);
    } else {
      ok = false;
    }
  }
  if (ok){
    if(axe == 'x'){
			S.push(polygon({points:pts.reverse()}));
		} else {
			S.push(polygon({points:pts}));
		}
  }
}

return S;
}

module.exports = { main, getParameterDefinitions }
