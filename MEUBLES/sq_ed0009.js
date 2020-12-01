const jscad = require('@jscad/modeling')
const { curves, maths, extrusions, primitives, transforms, booleans, 
	colors, geometries, measurements, utils } = jscad
const { bezier } = curves
const { slice, extrudeLinear } = extrusions
const { cuboid, polygon, polyhedron } = primitives
const { intersect, subtract,union } = booleans
const { center, scale, translateX, translateY, translateZ, translate
		,rotateX, rotateY, rotateZ, rotate } = transforms
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
  const faces =[[0,127,120],[0,169,127],[0,340,133],[0,358,169],[1,120,126],[1,126,121],[1,339,135],[1,340,120],[2,121,125],[2,125,122],[2,338,137],[2,339,121],[3,122,124],[3,164,139],[3,338,122],[4,128,18],[5,19,152],[5,152,123],[5,153,19],[6,20,153],[6,150,20],[7,21,150],[7,196,21],[8,151,22],[8,319,158],[9,23,151],[9,152,23],[9,160,159],[10,24,128],[10,123,129],[11,159,130],[11,331,25],[12,158,318],[12,318,26],[13,160,131],[14,340,132],[14,344,145],[14,358,133],[14,362,180],[15,339,134],[15,340,135],[15,343,144],[15,344,132],[16,338,136],[16,339,137],[16,342,143],[16,343,134],[17,337,138],[17,338,139],[17,341,142],[17,342,136],[18,128,146],[18,165,4],[18,341,140],[18,342,142],[19,153,156],[19,342,141],[19,343,143],[19,345,157],[20,150,155],[20,343,156],[20,344,144],[21,196,201],[21,344,155],[21,362,145],[22,151,154],[22,319,8],[22,349,161],[22,413,320],[23,152,157],[23,345,163],[23,349,154],[23,350,162],[24,129,147],[24,342,146],[24,345,141],[25,129,11],[25,331,330],[25,345,147],[25,350,163],[25,419,148],[26,131,12],[26,318,321],[26,349,149],[26,413,161],[27,131,149],[27,332,13],[27,349,162],[27,350,148],[27,419,333],[28,166,315],[28,167,164],[28,409,167],[29,165,31],[29,316,166],[30,337,167],[30,341,138],[30,409,314],[30,411,168],[31,165,140],[31,316,29],[31,341,168],[31,411,317],[32,175,169],[32,353,175],[32,357,170],[32,358,182],[33,174,170],[33,352,174],[33,356,171],[33,357,184],[34,173,171],[34,210,173],[34,355,210],[34,356,186],[35,47,176],[35,176,173],[35,211,47],[36,48,199],[36,198,48],[36,199,174],[37,49,196],[37,196,175],[37,199,49],[38,50,197],[38,319,50],[39,51,198],[39,197,51],[39,206,197],[40,176,52],[40,177,172],[41,178,205],[41,205,177],[42,204,179],[42,318,204],[43,179,206],[43,206,178],[43,326,55],[44,357,182],[44,358,180],[44,361,181],[44,362,191],[45,356,184],[45,357,181],[45,360,183],[45,361,190],[46,355,186],[46,356,183],[46,359,185],[46,360,189],[47,211,187],[47,359,189],[47,360,192],[48,198,203],[48,360,190],[48,361,202],[48,363,188],[49,199,202],[49,361,191],[49,362,201],[50,319,320],[50,367,200],[50,413,207],[51,197,200],[51,363,203],[51,367,208],[51,368,209],[52,176,192],[52,177,40],[52,360,188],[52,363,193],[53,177,193],[53,327,41],[53,363,209],[53,368,194],[53,417,328],[54,179,195],[54,318,42],[54,367,207],[54,413,321],[55,179,43],[55,326,329],[55,367,195],[55,368,208],[55,417,194],[56,355,213],[56,369,210],[56,406,212],[56,407,311],[57,59,211],[57,310,59],[57,369,212],[57,406,310],[58,355,185],[58,359,214],[58,407,213],[58,408,312],[59,310,313],[59,359,187],[59,408,214],[60,222,264],[60,228,215],[60,372,222],[61,221,215],[61,230,216],[61,371,221],[62,220,216],[62,232,217],[63,219,217],[63,259,219],[64,78,223],[64,223,219],[64,260,78],[65,247,79],[65,251,248],[65,371,220],[66,250,245],[66,251,80],[66,371,248],[66,372,221],[67,250,81],[67,296,291],[67,372,245],[67,390,222],[68,82,246],[68,253,323],[68,323,82],[69,83,247],[69,246,83],[69,255,246],[70,223,84],[70,224,218],[71,225,254],[71,254,224],[71,331,225],[72,253,226],[72,324,253],[73,226,255],[73,255,225],[73,332,87],[74,240,227],[74,275,240],[75,227,239],[75,239,229],[76,229,238],[76,238,231],[77,231,237],[77,373,234],[77,377,233],[78,260,235],[78,377,237],[78,378,241],[79,247,252],[79,251,65],[79,381,236],[80,250,66],[81,296,67],[82,323,322],[82,385,249],[82,415,256],[83,246,249],[83,381,252],[83,385,257],[83,386,258],[84,223,241],[84,224,70],[84,378,236],[84,381,242],[85,224,242],[85,331,71],[85,381,258],[85,386,243],[85,419,330],[86,226,244],[86,324,72],[86,385,256],[86,415,325],[87,226,73],[87,332,333],[87,385,244],[87,386,257],[87,419,243],[88,261,259],[88,315,261],[88,373,262],[88,409,315],[89,91,260],[89,316,91],[90,373,233],[90,377,263],[90,409,262],[90,411,314],[91,316,317],[91,377,235],[91,411,263],[92,264,270],[92,389,265],[92,393,277],[93,388,266],[93,389,269],[93,392,279],[93,393,265],[94,305,281],[94,388,268],[94,392,266],[94,405,305],[95,282,306],[95,388,271],[95,405,268],[96,297,108],[96,298,293],[96,388,269],[96,389,294],[96,401,267],[97,296,109],[97,297,294],[97,389,270],[97,390,291],[98,292,110],[98,323,299],[99,111,292],[99,293,111],[99,401,293],[99,402,300],[100,287,271],[100,288,112],[100,388,267],[100,401,272],[101,300,273],[101,327,113],[101,401,300],[101,416,327],[102,324,114],[103,301,274],[103,326,273],[104,277,276],[104,286,275],[105,279,278],[105,285,276],[106,281,280],[106,284,278],[107,95,287],[107,282,95],[107,287,284],[108,297,285],[108,298,96],[109,296,286],[109,297,97],[110,292,295],[110,323,98],[110,403,302],[110,415,322],[111,293,298],[111,403,295],[111,404,303],[112,287,100],[112,288,283],[113,272,101],[113,304,288],[113,327,328],[113,404,304],[113,417,289],[114,274,102],[114,324,325],[114,403,290],[114,415,302],[115,274,290],[115,326,103],[115,403,303],[115,404,289],[115,417,329],[116,391,305],[116,405,307],[116,406,311],[116,407,308],[117,313,310],[117,405,306],[117,406,307],[118,309,280],[118,312,309],[118,391,308],[118,407,312],[119,117,282],[119,313,117],[120,340,0],[121,339,1],[122,338,2],[123,125,5],[124,128,4],[124,164,3],[125,123,334],[125,153,5],[126,150,6],[126,153,335],[127,150,336],[127,196,7],[128,123,10],[129,24,10],[129,159,11],[130,160,13],[130,331,11],[131,27,13],[131,158,12],[132,340,15],[132,344,14],[133,340,14],[133,358,0],[134,339,16],[134,343,15],[135,339,15],[135,340,1],[136,338,17],[136,342,16],[137,338,16],[137,339,2],[138,337,30],[138,341,17],[139,164,337],[139,337,17],[139,338,3],[140,165,18],[140,341,31],[141,342,24],[141,345,19],[142,341,18],[142,342,17],[143,342,19],[143,343,16],[144,343,20],[144,344,15],[145,344,21],[145,362,14],[146,128,24],[146,342,18],[147,129,25],[147,345,24],[148,350,25],[148,419,27],[149,131,26],[149,349,27],[150,127,7],[151,160,9],[152,159,347],[153,126,6],[154,151,23],[154,349,22],[155,150,21],[155,344,20],[156,153,20],[156,343,19],[157,152,19],[157,345,23],[158,151,8],[159,152,9],[159,160,348],[160,151,346],[161,349,26],[161,413,22],[162,349,23],[162,350,27],[163,345,25],[163,350,23],[164,166,28],[165,124,4],[165,166,351],[166,165,29],[167,409,30],[168,341,30],[168,411,31],[169,175,354],[169,358,32],[170,353,32],[170,357,33],[171,352,33],[171,356,34],[172,176,40],[172,198,36],[173,176,352],[173,211,35],[174,172,36],[174,199,353],[175,199,37],[177,53,41],[177,205,365],[178,326,43],[179,54,42],[180,358,14],[180,362,44],[181,357,44],[181,361,45],[182,357,32],[182,358,44],[183,356,45],[183,360,46],[184,356,33],[184,357,45],[185,355,46],[185,359,58],[186,355,34],[186,356,46],[187,211,59],[187,359,47],[188,360,48],[188,363,52],[189,359,46],[189,360,47],[190,360,45],[190,361,48],[191,361,44],[191,362,49],[192,176,47],[192,360,52],[193,177,52],[193,363,53],[194,368,55],[194,417,53],[195,179,55],[195,367,54],[197,204,38],[198,205,39],[200,197,50],[200,367,51],[201,196,49],[201,362,21],[202,199,48],[202,361,49],[203,198,51],[203,363,48],[204,197,364],[204,319,38],[205,206,39],[206,205,366],[207,367,50],[207,413,54],[208,367,55],[208,368,51],[209,363,51],[209,368,53],[210,355,56],[211,369,57],[212,369,56],[212,406,57],[213,355,58],[213,407,56],[214,359,59],[214,408,58],[215,230,61],[215,372,60],[216,232,62],[216,371,61],[217,220,62],[217,234,63],[218,223,70],[218,247,65],[219,223,370],[219,260,64],[220,218,65],[221,371,66],[222,372,67],[224,85,71],[224,254,383],[225,332,73],[226,86,72],[227,228,74],[228,227,376],[228,275,74],[229,230,75],[230,227,75],[230,229,375],[231,232,76],[232,229,76],[232,231,374],[233,373,77],[233,377,90],[234,231,77],[234,259,63],[235,260,91],[235,377,78],[236,238,79],[236,381,84],[237,377,77],[237,378,78],[238,236,378],[238,251,79],[239,250,80],[239,251,379],[240,250,380],[240,296,81],[241,223,78],[241,378,84],[242,224,84],[242,381,85],[243,386,87],[243,419,85],[244,226,87],[244,385,86],[245,250,67],[245,372,66],[246,253,68],[247,254,69],[248,251,66],[248,371,65],[249,246,82],[249,385,83],[250,240,81],[251,239,80],[252,247,83],[252,381,79],[253,246,382],[254,255,69],[255,254,384],[256,385,82],[256,415,86],[257,385,87],[257,386,83],[258,381,83],[258,386,85],[259,261,387],[259,373,88],[260,261,89],[261,316,89],[262,373,90],[262,409,88],[263,377,91],[263,411,90],[264,228,60],[264,277,394],[265,389,93],[265,393,92],[266,388,94],[266,392,93],[267,388,96],[267,401,100],[268,388,95],[268,405,94],[269,388,93],[269,389,96],[270,389,92],[270,390,97],[271,287,95],[271,388,100],[272,288,100],[272,401,101],[273,301,103],[273,416,101],[274,115,103],[274,299,102],[275,277,104],[275,286,398],[276,279,105],[276,286,104],[277,264,92],[278,281,106],[278,285,105],[279,276,393],[279,393,93],[280,284,106],[280,391,118],[281,278,392],[281,305,391],[281,392,94],[282,309,119],[283,287,112],[283,298,108],[284,282,107],[284,287,396],[285,283,108],[285,297,397],[286,297,109],[288,272,113],[288,304,399],[289,404,113],[289,417,115],[290,274,114],[290,403,115],[291,296,97],[291,390,67],[292,301,99],[293,401,96],[294,297,96],[294,389,97],[295,292,111],[295,403,110],[298,304,111],[299,292,98],[299,324,102],[300,401,99],[301,292,400],[301,402,99],[302,403,114],[302,415,110],[303,403,111],[303,404,115],[304,404,111],[305,405,116],[306,282,117],[306,405,95],[307,405,117],[307,406,116],[308,391,116],[308,407,118],[309,282,395],[309,313,119],[310,406,117],[311,406,56],[311,407,116],[312,407,58],[313,309,408],[313,408,59],[314,409,90],[314,411,30],[315,409,28],[316,261,410],[317,316,31],[317,411,91],[319,204,412],[320,319,22],[320,413,50],[321,318,54],[321,413,26],[322,323,110],[322,415,82],[324,299,414],[325,324,86],[325,415,114],[327,178,41],[328,327,53],[328,417,113],[329,326,115],[329,417,55],[330,331,85],[330,419,25],[332,130,13],[332,225,418],[333,332,27],[333,419,87],[334,122,125],[334,123,128],[334,124,122],[334,128,124],[335,121,126],[335,125,121],[335,153,125],[336,120,127],[336,126,120],[336,150,126],[337,164,167],[346,131,160],[346,151,158],[346,158,131],[347,123,152],[347,129,123],[347,159,129],[348,130,159],[348,160,130],[351,124,165],[351,164,124],[351,166,164],[352,171,173],[352,172,174],[352,176,172],[353,170,174],[353,199,175],[354,127,169],[354,175,196],[354,196,127],[364,179,204],[364,197,206],[364,206,179],[365,172,177],[365,198,172],[365,205,198],[366,178,206],[366,205,178],[369,173,210],[369,211,173],[370,217,219],[370,218,220],[370,220,217],[370,223,218],[371,216,220],[372,215,221],[373,259,234],[374,217,232],[374,231,234],[374,234,217],[375,216,230],[375,229,232],[375,232,216],[376,215,228],[376,227,230],[376,230,215],[378,231,238],[378,237,231],[379,229,239],[379,238,229],[379,251,238],[380,227,240],[380,239,227],[380,250,239],[382,226,253],[382,246,255],[382,255,226],[383,218,224],[383,247,218],[383,254,247],[384,225,255],[384,254,225],[387,219,259],[387,260,219],[387,261,260],[390,264,222],[390,270,264],[391,280,281],[392,278,279],[393,276,277],[394,228,264],[394,275,228],[394,277,275],[395,280,309],[395,282,284],[395,284,280],[396,278,284],[396,283,285],[396,285,278],[396,287,283],[397,276,285],[397,286,276],[397,297,286],[398,240,275],[398,286,296],[398,296,240],[399,283,288],[399,298,283],[399,304,298],[400,274,301],[400,292,299],[400,299,274],[402,273,300],[402,301,273],[408,309,312],[410,166,316],[410,261,315],[410,315,166],[412,158,319],[412,204,318],[412,318,158],[414,253,324],[414,299,323],[414,323,253],[416,178,327],[416,273,326],[416,326,178],[418,130,332],[418,225,331],[418,331,130]]
  const vertices = [[386.76572857,0.067496209,68.13232182],[357.31725737,-147.97996601,68.13232182],[273.5005618,-273.12299347,68.13232182],[157.424451,-355.10890986,68.13232182],[136.4367252,-323.40357879,90.15994792],[250.83370298,-220.90573244,90.15994792],[321.61020385,-133.18962017,90.15994792],[348.11669234,0.067496209,90.15994792],[146.77665051,-41.90636232,90.15994792],[179.28597979,-130.99587706,90.15994792],[191.92948736,-271.58249902,90.15994792],[116.33974169,-186.73258574,90.15994792],[106.76639104,-50.59113441,90.15994792],[90.69506577,-108.48671227,90.15994792],[386.76572857,0.067496209,-64.03343474],[357.31725737,-147.97996601,-64.03343474],[273.5005618,-273.12299347,-64.03343474],[157.424451,-355.10890986,-64.03343474],[135.88888772,-322.31800229,-87.16251095],[250.15404302,-219.95487825,-87.22984711],[320.53568736,-132.74454087,-87.22984711],[346.95364407,0.067496209,-87.22984711],[146.77665051,-41.90636232,-86.06106084],[179.28597979,-130.99587706,-86.06106084],[190.69797517,-270.91738907,-86.94033849],[116.33974169,-186.73258574,-86.06106084],[106.76639104,-50.59113441,-86.06106084],[90.69506577,-108.48671227,-86.06106084],[65.92633762,-377.4179941,68.13232182],[59.33003286,-339.70616258,90.15994792],[65.92633762,-377.4179941,-64.03343474],[59.24417908,-338.54173016,-87.22984711],[357.31725737,148.11495843,68.13232182],[273.5005618,273.25798589,68.13232182],[157.424451,355.24390227,68.13232182],[136.4367252,323.53857121,90.15994792],[250.83370298,221.04072486,90.15994792],[321.61020385,133.32461259,90.15994792],[146.77665051,42.04135474,90.15994792],[179.28597979,131.13086947,90.15994792],[191.92948736,271.71749144,90.15994792],[116.33974169,186.86757815,90.15994792],[106.76639104,50.72612683,90.15994792],[90.69506577,108.62170468,90.15994792],[357.31725737,148.11495843,-64.03343474],[273.5005618,273.25798589,-64.03343474],[157.424451,355.24390227,-64.03343474],[135.88888772,322.45299471,-87.16251095],[250.15404302,220.08987067,-87.22984711],[320.53568736,132.87953328,-87.22984711],[146.77665051,42.04135474,-86.06106084],[179.28597979,131.13086947,-86.06106084],[190.69797517,271.05238149,-86.94033849],[116.33974169,186.86757815,-86.06106084],[106.76639104,50.72612683,-86.06106084],[90.69506577,108.62170468,-86.06106084],[65.92633762,377.55298652,68.13232182],[59.33003286,339.841155,90.15994792],[65.92633762,377.55298652,-64.03343474],[59.24417908,338.67672257,-87.22984711],[-386.96759615,0.067496209,68.13232182],[-357.51912496,-147.97996601,68.13232182],[-273.70242939,-273.12299347,68.13232182],[-157.62631858,-355.10890986,68.13232182],[-136.63859278,-323.40357879,90.15994792],[-251.03557057,-220.90573244,90.15994792],[-321.81207143,-133.18962017,90.15994792],[-348.31855992,0.067496209,90.15994792],[-146.9785181,-41.90636232,90.15994792],[-179.48784738,-130.99587706,90.15994792],[-192.13135494,-271.58249902,90.15994792],[-116.54160928,-186.73258574,90.15994792],[-106.96825863,-50.59113441,90.15994792],[-90.89693336,-108.48671227,90.15994792],[-386.96759615,0.067496209,-64.03343474],[-357.51912496,-147.97996601,-64.03343474],[-273.70242939,-273.12299347,-64.03343474],[-157.62631858,-355.10890986,-64.03343474],[-136.0907553,-322.31800229,-87.16251095],[-250.3559106,-219.95487825,-87.22984711],[-320.73755495,-132.74454087,-87.22984711],[-347.15551166,0.067496209,-87.22984711],[-146.9785181,-41.90636232,-86.06106084],[-179.48784738,-130.99587706,-86.06106084],[-190.89984275,-270.91738907,-86.94033849],[-116.54160928,-186.73258574,-86.06106084],[-106.96825863,-50.59113441,-86.06106084],[-90.89693336,-108.48671227,-86.06106084],[-66.12820521,-377.4179941,68.13232182],[-59.53190045,-339.70616258,90.15994792],[-66.12820521,-377.4179941,-64.03343474],[-59.44604667,-338.54173016,-87.22984711],[-357.51912496,148.11495843,68.13232182],[-273.70242939,273.25798589,68.13232182],[-157.62631858,355.24390227,68.13232182],[-136.63859278,323.53857121,90.15994792],[-251.03557057,221.04072486,90.15994792],[-321.81207143,133.32461259,90.15994792],[-146.9785181,42.04135474,90.15994792],[-179.48784738,131.13086947,90.15994792],[-192.13135494,271.71749144,90.15994792],[-116.54160928,186.86757815,90.15994792],[-106.96825863,50.72612683,90.15994792],[-90.89693336,108.62170468,90.15994792],[-357.51912496,148.11495843,-64.03343474],[-273.70242939,273.25798589,-64.03343474],[-157.62631858,355.24390227,-64.03343474],[-136.0907553,322.45299471,-87.16251095],[-250.3559106,220.08987067,-87.22984711],[-320.73755495,132.87953328,-87.22984711],[-146.9785181,42.04135474,-86.06106084],[-179.48784738,131.13086947,-86.06106084],[-190.89984275,271.05238149,-86.94033849],[-116.54160928,186.86757815,-86.06106084],[-106.96825863,50.72612683,-86.06106084],[-90.89693336,108.62170468,-86.06106084],[-66.12820521,377.55298652,68.13232182],[-59.53190045,339.841155,90.15994792],[-66.12820521,377.55298652,-64.03343474],[-59.44604667,338.67672257,-87.22984711],[379.26079093,-75.39224255,68.13232182],[321.50640726,-214.82365888,68.13232182],[214.9720422,-320.07764208,68.13232182],[215.22823299,-259.65433767,90.15994792],[150.81824163,-338.78956667,90.15994792],[261.92450079,-260.31391471,90.15994792],[342.01423443,-141.64124636,90.15994792],[370.2018559,0.067496209,90.15994792],[172.48362604,-303.20531637,90.15994792],[176.78237066,-226.07263089,90.15994792],[103.97124436,-143.10333434,90.15994792],[114.28086582,-86.77587057,90.15994792],[379.26079093,-75.39224255,-64.03343474],[398.56522671,0.067496209,2.04944354],[321.50640726,-214.82365888,-64.03343474],[368.2185722,-152.49543846,2.04944354],[214.9720422,-320.07764208,-64.03343474],[281.79861173,-281.83204931,2.04944354],[113.08867434,-371.78929087,-64.03343474],[162.18216006,-366.31854991,2.04944354],[101.53123295,-333.50360215,-87.22984711],[215.22823299,-259.65433767,-97.86758514],[150.81824163,-338.78956667,-86.06106084],[261.92450079,-260.31391471,-86.06106084],[342.01423443,-141.64124636,-86.06106084],[370.2018559,0.067496209,-86.06106084],[171.50026852,-302.34308983,-87.01775664],[176.78237066,-226.07263089,-86.06106084],[103.97124436,-143.10333434,-99.04823757],[114.28086582,-86.77587057,-86.06106084],[341.36151847,-67.85360854,90.15994792],[158.18751963,-83.88022085,90.15994792],[212.152376,-188.3951286,90.15994792],[289.37695548,-193.35544555,90.15994792],[158.18751963,-83.88022085,-86.06106084],[340.22060315,-67.62666637,-87.22984711],[288.52200019,-192.60404515,-87.22984711],[212.152376,-188.3951286,-86.06106084],[126.77152078,-46.24874837,90.15994792],[164.8887827,-161.27654714,90.15994792],[145.3208377,-116.32619417,90.15994792],[126.77152078,-46.24874837,-99.04823757],[145.3208377,-116.32619417,-99.04823757],[166.38601001,-162.51789561,-97.53799937],[113.08867434,-371.78929087,68.13232182],[101.78072333,-334.63978218,90.15994792],[63.09934987,-361.25578059,90.15994792],[67.94018048,-388.93136492,2.04944354],[63.09934987,-361.25578059,-86.06106084],[379.26079093,75.52723497,68.13232182],[321.50640726,214.9586513,68.13232182],[214.9720422,320.2126345,68.13232182],[215.22823299,259.78933009,90.15994792],[150.81824163,338.92455909,90.15994792],[261.92450079,260.44890712,90.15994792],[342.01423443,141.77623878,90.15994792],[172.48362604,303.34030878,90.15994792],[176.78237066,226.2076233,90.15994792],[103.97124436,143.23832676,90.15994792],[114.28086582,86.91086299,90.15994792],[379.26079093,75.52723497,-64.03343474],[321.50640726,214.9586513,-64.03343474],[368.2185722,152.63043088,2.04944354],[214.9720422,320.2126345,-64.03343474],[281.79861173,281.96704173,2.04944354],[113.08867434,371.92428329,-64.03343474],[162.18216006,366.45354233,2.04944354],[101.53123295,333.63859457,-87.22984711],[215.22823299,259.78933009,-97.86758514],[150.81824163,338.92455909,-86.06106084],[261.92450079,260.44890712,-86.06106084],[342.01423443,141.77623878,-86.06106084],[171.50026852,302.47808225,-87.01775664],[176.78237066,226.2076233,-86.06106084],[103.97124436,143.23832676,-99.04823757],[114.28086582,86.91086299,-86.06106084],[341.36151847,67.98860096,90.15994792],[158.18751963,84.01521327,90.15994792],[212.152376,188.53012101,90.15994792],[289.37695548,193.49043797,90.15994792],[158.18751963,84.01521327,-86.06106084],[340.22060315,67.76165879,-87.22984711],[288.52200019,192.73903757,-87.22984711],[212.152376,188.53012101,-86.06106084],[126.77152078,46.38374079,90.15994792],[164.8887827,161.41153956,90.15994792],[145.3208377,116.46118659,90.15994792],[126.77152078,46.38374079,-99.04823757],[145.3208377,116.46118659,-99.04823757],[166.38601001,162.65288803,-97.53799937],[113.08867434,371.92428329,68.13232182],[101.78072333,334.7747746,90.15994792],[63.09934987,361.39077301,90.15994792],[67.94018048,389.06635734,2.04944354],[63.09934987,361.39077301,-86.06106084],[-379.46265851,-75.39224255,68.13232182],[-321.70827485,-214.82365888,68.13232182],[-215.17390978,-320.07764208,68.13232182],[-215.43010057,-259.65433767,90.15994792],[-151.02010921,-338.78956667,90.15994792],[-262.12636837,-260.31391471,90.15994792],[-342.21610202,-141.64124636,90.15994792],[-370.40372348,0.067496209,90.15994792],[-172.68549362,-303.20531637,90.15994792],[-176.98423824,-226.07263089,90.15994792],[-104.17311194,-143.10333434,90.15994792],[-114.48273341,-86.77587057,90.15994792],[-379.46265851,-75.39224255,-64.03343474],[-398.7670943,0.067496209,2.04944354],[-321.70827485,-214.82365888,-64.03343474],[-368.42043979,-152.49543846,2.04944354],[-215.17390978,-320.07764208,-64.03343474],[-282.00047931,-281.83204931,2.04944354],[-113.29054193,-371.78929087,-64.03343474],[-162.38402764,-366.31854991,2.04944354],[-101.73310053,-333.50360215,-87.22984711],[-215.43010057,-259.65433767,-97.86758514],[-151.02010921,-338.78956667,-86.06106084],[-262.12636837,-260.31391471,-86.06106084],[-342.21610202,-141.64124636,-86.06106084],[-370.40372348,0.067496209,-86.06106084],[-171.7021361,-302.34308983,-87.01775664],[-176.98423824,-226.07263089,-86.06106084],[-104.17311194,-143.10333434,-99.04823757],[-114.48273341,-86.77587057,-86.06106084],[-341.56338605,-67.85360854,90.15994792],[-158.38938721,-83.88022085,90.15994792],[-212.35424358,-188.3951286,90.15994792],[-289.57882306,-193.35544555,90.15994792],[-158.38938721,-83.88022085,-86.06106084],[-340.42247073,-67.62666637,-87.22984711],[-288.72386778,-192.60404515,-87.22984711],[-212.35424358,-188.3951286,-86.06106084],[-126.97338836,-46.24874837,90.15994792],[-165.09065029,-161.27654714,90.15994792],[-145.52270528,-116.32619417,90.15994792],[-126.97338836,-46.24874837,-99.04823757],[-145.52270528,-116.32619417,-99.04823757],[-166.58787759,-162.51789561,-97.53799937],[-113.29054193,-371.78929087,68.13232182],[-101.98259092,-334.63978218,90.15994792],[-63.30121745,-361.25578059,90.15994792],[-68.14204807,-388.93136492,2.04944354],[-63.30121745,-361.25578059,-86.06106084],[-379.46265851,75.52723497,68.13232182],[-321.70827485,214.9586513,68.13232182],[-215.17390978,320.2126345,68.13232182],[-215.43010057,259.78933009,90.15994792],[-151.02010921,338.92455909,90.15994792],[-262.12636837,260.44890712,90.15994792],[-342.21610202,141.77623878,90.15994792],[-172.68549362,303.34030878,90.15994792],[-176.98423824,226.2076233,90.15994792],[-104.17311194,143.23832676,90.15994792],[-114.48273341,86.91086299,90.15994792],[-379.46265851,75.52723497,-64.03343474],[-321.70827485,214.9586513,-64.03343474],[-368.42043979,152.63043088,2.04944354],[-215.17390978,320.2126345,-64.03343474],[-282.00047931,281.96704173,2.04944354],[-113.29054193,371.92428329,-64.03343474],[-162.38402764,366.45354233,2.04944354],[-101.73310053,333.63859457,-87.22984711],[-215.43010057,259.78933009,-97.86758514],[-151.02010921,338.92455909,-86.06106084],[-262.12636837,260.44890712,-86.06106084],[-342.21610202,141.77623878,-86.06106084],[-171.7021361,302.47808225,-87.01775664],[-176.98423824,226.2076233,-86.06106084],[-104.17311194,143.23832676,-99.04823757],[-114.48273341,86.91086299,-86.06106084],[-341.56338605,67.98860096,90.15994792],[-158.38938721,84.01521327,90.15994792],[-212.35424358,188.53012101,90.15994792],[-289.57882306,193.49043797,90.15994792],[-158.38938721,84.01521327,-86.06106084],[-340.42247073,67.76165879,-87.22984711],[-288.72386778,192.73903757,-87.22984711],[-212.35424358,188.53012101,-86.06106084],[-126.97338836,46.38374079,90.15994792],[-165.09065029,161.41153956,90.15994792],[-145.52270528,116.46118659,90.15994792],[-126.97338836,46.38374079,-99.04823757],[-145.52270528,116.46118659,-99.04823757],[-166.58787759,162.65288803,-97.53799937],[-113.29054193,371.92428329,68.13232182],[-101.98259092,334.7747746,90.15994792],[-63.30121745,361.39077301,90.15994792],[-68.14204807,389.06635734,2.04944354],[-63.30121745,361.39077301,-86.06106084],[-0.10093379,341.52994847,90.15994792],[-0.10093379,379.42922093,68.13232182],[-0.10093379,379.42922093,-64.03343474],[-0.10093379,340.36163379,-87.22984711],[-0.10093379,-379.29422851,-64.03343474],[-0.10093379,-379.29422851,68.13232182],[-0.10093379,-341.39495605,90.15994792],[-0.10093379,-340.22664137,-87.22984711],[104.26156612,0.067496209,90.15994792],[142.97302748,0.067496209,90.15994792],[142.97302748,0.067496209,-86.06106084],[104.26156612,0.067496209,-86.06106084],[-143.17489506,0.067496209,-86.06106084],[-143.17489506,0.067496209,90.15994792],[-104.4634337,0.067496209,90.15994792],[-104.4634337,0.067496209,-86.06106084],[-0.10093379,115.85865192,90.15994792],[-0.10093379,173.75422977,90.15994792],[-0.10093379,173.75422977,-86.06106084],[-0.10093379,115.85865192,-86.06106084],[-0.10093379,-173.61923735,-86.06106084],[-0.10093379,-173.61923735,90.15994792],[-0.10093379,-115.7236595,90.15994792],[-0.10093379,-115.7236595,-86.06106084],[206.31684203,-301.92126872,90.15994792],[307.73664221,-205.62299603,90.15994792],[363.01824559,-72.1613994,90.15994792],[116.54097639,-383.1309853,2.04944354],[221.3444376,-331.34892273,2.04944354],[331.31548515,-221.37787519,2.04944354],[390.83138721,-77.69377725,2.04944354],[108.24240963,-355.86807286,-86.06106084],[206.31684203,-301.92126872,-97.86758514],[307.73664221,-205.62299603,-86.06106084],[363.01824559,-72.1613994,-86.06106084],[194.46737333,-207.23387974,-97.86758514],[136.23419273,-85.32804571,90.15994792],[194.46737333,-207.23387974,90.15994792],[147.34698075,-138.39899208,90.15994792],[136.23419273,-85.32804571,-99.04823757],[150.34143537,-140.88168902,-110.19559033],[108.24240963,-355.86807286,90.15994792],[206.31684203,302.05626114,90.15994792],[307.73664221,205.75798844,90.15994792],[363.01824559,72.29639182,90.15994792],[116.54097639,383.26597772,2.04944354],[221.3444376,331.48391515,2.04944354],[331.31548515,221.5128676,2.04944354],[390.83138721,77.82876967,2.04944354],[108.24240963,356.00306528,-86.06106084],[206.31684203,302.05626114,-97.86758514],[307.73664221,205.75798844,-86.06106084],[363.01824559,72.29639182,-86.06106084],[194.46737333,207.36887216,-97.86758514],[136.23419273,85.46303813,90.15994792],[194.46737333,207.36887216,90.15994792],[147.34698075,138.5339845,90.15994792],[136.23419273,85.46303813,-99.04823757],[150.34143537,141.01668143,-110.19559033],[108.24240963,356.00306528,90.15994792],[-206.51870961,-301.92126872,90.15994792],[-307.9385098,-205.62299603,90.15994792],[-363.22011317,-72.1613994,90.15994792],[-116.74284398,-383.1309853,2.04944354],[-221.54630519,-331.34892273,2.04944354],[-331.51735274,-221.37787519,2.04944354],[-391.0332548,-77.69377725,2.04944354],[-108.44427721,-355.86807286,-86.06106084],[-206.51870961,-301.92126872,-97.86758514],[-307.9385098,-205.62299603,-86.06106084],[-363.22011317,-72.1613994,-86.06106084],[-194.66924091,-207.23387974,-97.86758514],[-136.43606031,-85.32804571,90.15994792],[-194.66924091,-207.23387974,90.15994792],[-147.54884834,-138.39899208,90.15994792],[-136.43606031,-85.32804571,-99.04823757],[-150.54330295,-140.88168902,-110.19559033],[-108.44427721,-355.86807286,90.15994792],[-206.51870961,302.05626114,90.15994792],[-307.9385098,205.75798844,90.15994792],[-363.22011317,72.29639182,90.15994792],[-116.74284398,383.26597772,2.04944354],[-221.54630519,331.48391515,2.04944354],[-331.51735274,221.5128676,2.04944354],[-391.0332548,77.82876967,2.04944354],[-108.44427721,356.00306528,-86.06106084],[-206.51870961,302.05626114,-97.86758514],[-307.9385098,205.75798844,-86.06106084],[-363.22011317,72.29639182,-86.06106084],[-194.66924091,207.36887216,-97.86758514],[-136.43606031,85.46303813,90.15994792],[-194.66924091,207.36887216,90.15994792],[-147.54884834,138.5339845,90.15994792],[-136.43606031,85.46303813,-99.04823757],[-150.54330295,141.01668143,-110.19559033],[-108.44427721,356.00306528,90.15994792],[-0.10093379,363.18667559,90.15994792],[-0.10093379,390.99981721,2.04944354],[-0.10093379,363.18667559,-86.06106084],[-0.10093379,-390.8648248,2.04944354],[-0.10093379,-363.05168317,90.15994792],[-0.10093379,-363.05168317,-86.06106084],[123.6172968,0.067496209,90.15994792],[123.62128805,0.067496209,-92.90884623],[-123.81916438,0.067496209,90.15994792],[-123.82315563,0.067496209,-92.90884623],[-0.10093379,144.80644084,90.15994792],[-0.10093379,145.05392869,-86.06341916],[-0.10093379,-144.67144843,90.15994792],[-0.10093379,-144.91893627,-86.06341916]]
  const groups = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
return {faces:faces, vertices:vertices, groups:groups}
}

const main = (params) => {
  const sc = 1, ep = params.ep *2

	const vd = volume()
	const vv = polyhedron({points: vd.vertices, faces: vd.faces})

  //let vol = center({}, rotateY(degToRad(180), rotateX(degToRad(90), vv)))
  let vol = center({}, rotateX(degToRad(90), vv))
  
  let r = [], rH = [], rV = []
  let bV = measureBoundingBox(vol)

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
		
		eH.push(intersect(tmp[i], c2));
		eV.push(intersect(tmp[i], c1));
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
