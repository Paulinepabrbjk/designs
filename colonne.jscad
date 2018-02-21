// PARAMETRES
function getParameterDefinitions() {
  return [
    { name: 'nbp', type: 'int', initial: 3, caption: "Nombre de pans:" },
    { name: 'echX', type: 'float', initial: 0.5, caption: "D&eacute;formation(x):" },
    { name: 'echY', type: 'float', initial: 1, caption: "D&eacute;formation(y):" },
    { name: 'a1', type: 'float', initial: -11.5, caption: "Inclinaison(x):" },
    { name: 'd1', type: 'float', initial: 4.5, caption: "D&eacute;calage(x):" },
    { name: 'd2', type: 'float', initial: -47, caption: "D&eacute;calage(y):" },
    { name: 'piece', type: 'text',
    initial :'polygon([[0,0/*1:0,0,0,0*/] ,[-1.1,0] ,[-2.15,0] ,[-3.26,0] ,[-4.29,0] ,[-5.4,0] ,[-6.57,0] ,[-7.76,0] ,[-8.96,0] ,[-10.14,0] ,[-11.27,0] ,[-12.34,0] ,[-13.5,0] ,[-14.63,0] ,[-15.63,0],[-16,0/*1:0,0,0,0*/] ,[-15.56,-0.96] ,[-15.23,-2.02] ,[-14.99,-3.11] ,[-14.84,-4.23] ,[-14.76,-5.3] ,[-14.76,-6.49] ,[-14.81,-7.53] ,[-14.92,-8.64] ,[-15.1,-9.83] ,[-15.35,-11.1] ,[-15.6,-12.1] ,[-15.89,-13.14] ,[-16.24,-14.23] ,[-16.64,-15.36] ,[-17.1,-16.53] ,[-17.63,-17.75] ,[-18.22,-19.01] ,[-18.88,-20.31] ,[-19.36,-21.21] ,[-19.87,-22.12] ,[-20.42,-23.05],[-21,-24/*1:10,16,2,0*/] ,[-19.98,-24] ,[-18.92,-24] ,[-17.83,-24] ,[-16.78,-24] ,[-15.69,-24] ,[-14.59,-24] ,[-13.5,-24] ,[-12.46,-24],[-12,-24/*1:-3,0,-2,18*/] ,[-12.1,-22.94] ,[-12.17,-21.93] ,[-12.2,-20.51] ,[-12.15,-19.18] ,[-12.03,-17.95] ,[-11.85,-16.81] ,[-11.61,-15.76] ,[-11.32,-14.79] ,[-10.84,-13.63] ,[-10.29,-12.61] ,[-9.67,-11.71] ,[-8.99,-10.94] ,[-8.09,-10.12] ,[-7.14,-9.47] ,[-6.16,-8.96] ,[-5.19,-8.57] ,[-4.04,-8.25] ,[-2.97,-8.05] ,[-1.86,-7.95] ,[-0.84,-7.94],[0,-8/*1:0,0,0,0*/] ,[0,-6.93] ,[0,-5.85] ,[0,-4.83] ,[0,-3.76] ,[0,-2.7] ,[0,-1.63] ,[0,-0.61]]);',
    caption: "Mod&egrave;le:" },
    { name: 'antipiece', type: 'text', initial :'', caption: "Soustraire:" }, 
    { name: 'couleur', type: 'text', initial: 'BurlyWood', caption: "Couleur:"},
    { name: 'symetrie', type: 'choice',
  values: ["BAS", ""], captions: ["Bas+Droite", "Droite"],
  caption: 'Sym&eacute;trie:'}    
  ];
}

function main(params) {

function mi_profil(){
P = eval(params.piece);
//P = polygon([[0,8/*1:0,0,0,0*/] ,[0,9.07] ,[0,10.15] ,[0,11.17] ,[0,12.24] ,[0,13.3] ,[0,14.37] ,[0,15.39],[0,16/*1:0,0,0,0*/] ,[1.08,15.99] ,[2.18,15.98] ,[3.24,15.96] ,[4.47,15.94] ,[5.86,15.9] ,[6.86,15.88] ,[7.93,15.84] ,[9.06,15.8] ,[10.23,15.76] ,[11.46,15.71] ,[12.72,15.65] ,[14.03,15.58] ,[15.37,15.51] ,[16.74,15.42] ,[18.13,15.33] ,[19.55,15.23] ,[20.98,15.12] ,[22.42,15] ,[23.88,14.88] ,[25.33,14.73] ,[26.79,14.58] ,[28.24,14.42] ,[29.68,14.24] ,[31.1,14.06] ,[32.51,13.86] ,[33.9,13.64] ,[35.26,13.41] ,[36.59,13.17] ,[37.88,12.91] ,[39.13,12.64] ,[40.34,12.35] ,[41.49,12.05] ,[42.6,11.73] ,[43.65,11.39] ,[44.63,11.04] ,[45.99,10.47] ,[47.18,9.87] ,[48.19,9.22] ,[49,8.52] ,[49.77,7.53],[50,7/*1:-3,9,5,-10*/] ,[50.36,6.05] ,[50.56,4.99] ,[50.59,3.85] ,[50.48,2.62] ,[50.23,1.32] ,[49.85,-0.05] ,[49.53,-1] ,[49.16,-1.97] ,[48.74,-2.96] ,[48.28,-3.98] ,[47.78,-5.01] ,[47.24,-6.05] ,[46.66,-7.11] ,[46.05,-8.17] ,[45.42,-9.24] ,[44.75,-10.32] ,[44.06,-11.4] ,[43.36,-12.48] ,[42.63,-13.56] ,[41.89,-14.63] ,[41.14,-15.69] ,[40.38,-16.75] ,[39.61,-17.79] ,[38.84,-18.82] ,[38.07,-19.84] ,[37.3,-20.83] ,[36.54,-21.8] ,[35.78,-22.75] ,[35.04,-23.67] ,[34.31,-24.56] ,[33.6,-25.42] ,[32.91,-26.25] ,[32.25,-27.04] ,[31.3,-28.16] ,[30.42,-29.18] ,[29.61,-30.09] ,[28.9,-30.9] ,[28.1,-31.79] ,[27.39,-32.58],[27,-33/*1:0,0,0,0*/] ,[25.88,-33] ,[24.82,-33] ,[23.72,-33] ,[22.46,-33] ,[21.37,-33] ,[20.21,-33] ,[19,-33] ,[17.76,-33] ,[16.5,-33] ,[15.24,-33] ,[14,-33] ,[12.79,-33] ,[11.63,-33] ,[10.54,-33] ,[9.52,-33] ,[8.39,-33] ,[7.28,-33] ,[6.22,-33],[6,-33/*1:0,0,0,0*/] ,[6.31,-32.05] ,[6.8,-31.05] ,[7.35,-30.15] ,[8,-29.25] ,[8.7,-28.41] ,[9.39,-27.66] ,[10.18,-26.88] ,[11.09,-26.07] ,[11.91,-25.41] ,[12.8,-24.72] ,[13.78,-24.03] ,[14.86,-23.33] ,[15.72,-22.79] ,[16.64,-22.26] ,[17.61,-21.72] ,[18.64,-21.18],[19,-21/*1:-12,-6,11,5*/] ,[19.98,-20.56] ,[20.94,-20.13] ,[21.87,-19.71] ,[23.08,-19.17] ,[24.24,-18.64] ,[25.36,-18.12] ,[26.44,-17.59] ,[27.46,-17.07] ,[28.44,-16.53] ,[29.36,-15.97] ,[30.24,-15.4] ,[31.06,-14.8] ,[32,-14] ,[32.85,-13.14] ,[33.62,-12.22] ,[34.28,-11.21] ,[34.85,-10.11] ,[35.23,-9.16] ,[35.54,-8.13] ,[35.79,-7.03] ,[35.96,-5.85] ,[36.06,-4.58] ,[36.09,-3.57] ,[36.08,-2.51] ,[36.03,-1.39],[36,-1/*1:1,-13,1,11*/] ,[35.94,0.26] ,[35.55,1.4] ,[34.85,2.42] ,[33.87,3.34] ,[32.97,3.96] ,[31.94,4.53] ,[30.8,5.05] ,[29.55,5.51] ,[28.21,5.93] ,[26.79,6.3] ,[25.8,6.53] ,[24.79,6.73] ,[23.76,6.92] ,[22.71,7.09] ,[21.64,7.25] ,[20.56,7.39] ,[19.47,7.51] ,[18.38,7.63] ,[17.28,7.72] ,[16.19,7.81] ,[15.1,7.88] ,[14.02,7.95] ,[12.96,8] ,[11.91,8.04] ,[10.89,8.08] ,[9.88,8.1] ,[8.43,8.13] ,[7.06,8.14] ,[5.77,8.14] ,[4.57,8.13] ,[3.49,8.11] ,[2.24,8.08] ,[1.24,8.05] ,[0.17,8.01]]);

S = params.antipiece;
if (S !== ''){
//S = polygon([[4,14],[4,11/*1:0,0,0,0*/] ,[5.12,10.92] ,[6.18,10.83] ,[7.23,10.74] ,[8.45,10.64] ,[9.47,10.55] ,[10.55,10.45] ,[11.71,10.35] ,[12.92,10.23] ,[14.18,10.1] ,[15.48,9.97] ,[16.81,9.83] ,[18.17,9.68] ,[19.54,9.52] ,[20.92,9.35] ,[22.31,9.18] ,[23.68,8.99] ,[25.04,8.8] ,[26.37,8.61] ,[27.67,8.4] ,[28.92,8.19] ,[30.13,7.97] ,[31.28,7.75] ,[32.36,7.52] ,[33.37,7.28] ,[34.58,6.95] ,[35.63,6.61] ,[36.67,6.18],[37,6/*1:-5,3,17,-11*/] ,[37.95,5.32] ,[38.78,4.62] ,[39.48,3.88] ,[40.3,2.72] ,[40.86,1.5] ,[41.19,0.24] ,[41.29,-1.07] ,[41.18,-2.42] ,[40.88,-3.8] ,[40.39,-5.2] ,[39.98,-6.15] ,[39.5,-7.1] ,[38.95,-8.06] ,[38.34,-9.02] ,[37.68,-9.98] ,[36.97,-10.94] ,[36.22,-11.9] ,[35.42,-12.86] ,[34.59,-13.8] ,[33.72,-14.74] ,[32.83,-15.67] ,[31.92,-16.58] ,[30.98,-17.48] ,[30.04,-18.37] ,[29.08,-19.23] ,[28.12,-20.08] ,[27.16,-20.91] ,[26.21,-21.71] ,[25.26,-22.48] ,[24.33,-23.23] ,[23.41,-23.95] ,[22.52,-24.64] ,[21.66,-25.3] ,[20.83,-25.92] ,[19.65,-26.79] ,[18.57,-27.56] ,[17.61,-28.24] ,[16.77,-28.82] ,[15.88,-29.42] ,[15.01,-29.99],[15,-30],[27,-30/*1:0,0,0,0*/] ,[27.67,-29.18] ,[28.38,-28.31] ,[29.09,-27.42] ,[29.92,-26.36] ,[30.61,-25.48] ,[31.35,-24.52] ,[32.13,-23.49] ,[32.96,-22.4] ,[33.81,-21.24] ,[34.69,-20.04] ,[35.29,-19.21] ,[35.9,-18.37] ,[36.51,-17.5] ,[37.13,-16.62] ,[37.74,-15.73] ,[38.35,-14.83] ,[38.97,-13.92] ,[39.57,-13] ,[40.18,-12.07] ,[40.77,-11.14] ,[41.35,-10.21] ,[41.92,-9.27] ,[42.48,-8.34] ,[43.02,-7.41] ,[43.55,-6.49] ,[44.05,-5.57] ,[44.54,-4.65] ,[45,-3.75] ,[45.64,-2.42] ,[46.22,-1.13] ,[46.73,0.13] ,[47.17,1.35] ,[47.52,2.51] ,[47.79,3.62] ,[47.96,4.67],[48,5/*1:-1,-11,-20,10*/] ,[46.8,5.59] ,[45.58,6.15] ,[44.36,6.68] ,[43.14,7.19] ,[41.91,7.68] ,[40.68,8.15] ,[39.44,8.59] ,[38.21,9] ,[36.97,9.4] ,[35.74,9.78] ,[34.52,10.13] ,[33.3,10.47] ,[32.08,10.78] ,[30.87,11.08] ,[29.68,11.35] ,[28.49,11.61] ,[27.31,11.86] ,[26.15,12.08] ,[25,12.29] ,[23.87,12.49] ,[22.76,12.67] ,[21.66,12.83] ,[20.59,12.99] ,[19.53,13.12] ,[18.5,13.25] ,[17.49,13.36] ,[16.03,13.51] ,[14.63,13.64] ,[13.29,13.74] ,[12.02,13.83] ,[10.83,13.9] ,[9.72,13.95] ,[8.7,13.98] ,[7.47,14.01] ,[6.41,14.03] ,[5.33,14.03] ,[4.25,14.01]]);
//S = polygon([[4,14],[4,11/*1:0,0,0,0*/] ,[5.12,11.02] ,[6.28,11.03] ,[7.46,11.02] ,[8.48,11.01] ,[9.6,10.99] ,[10.81,10.96] ,[12.11,10.91] ,[13.47,10.85] ,[14.89,10.77] ,[16.37,10.68] ,[17.38,10.6] ,[18.4,10.51] ,[19.43,10.42] ,[20.48,10.31] ,[21.53,10.19] ,[22.58,10.06] ,[23.63,9.91] ,[24.68,9.75] ,[25.73,9.58] ,[26.77,9.39] ,[27.79,9.19] ,[28.8,8.97] ,[29.79,8.74] ,[30.77,8.49] ,[32.18,8.08] ,[33.53,7.63] ,[34.81,7.13] ,[36,6.59] ,[37.11,6] ,[38.11,5.37] ,[38.99,4.68] ,[39.75,3.94] ,[40.38,3.15],[41,2/*1:-4,10,1,-19*/] ,[41.03,0.87] ,[40.99,-0.25] ,[40.89,-1.35] ,[40.73,-2.44] ,[40.52,-3.51] ,[40.25,-4.57] ,[39.92,-5.61] ,[39.55,-6.63] ,[39.14,-7.64] ,[38.68,-8.62] ,[38.18,-9.59] ,[37.64,-10.55] ,[37.07,-11.48] ,[36.46,-12.4] ,[35.82,-13.29] ,[35.16,-14.17] ,[34.47,-15.02] ,[33.76,-15.86] ,[33.03,-16.68] ,[32.28,-17.47] ,[31.52,-18.25] ,[30.74,-19] ,[29.96,-19.73] ,[29.17,-20.44] ,[28.38,-21.12] ,[27.58,-21.79] ,[26.79,-22.43] ,[26,-23.05] ,[24.83,-23.93] ,[23.68,-24.75] ,[22.56,-25.52] ,[21.49,-26.24] ,[20.47,-26.89] ,[19.51,-27.49] ,[18.62,-28.02] ,[17.55,-28.64] ,[16.64,-29.15] ,[15.62,-29.69],[15,-30],[24,-30/*1:0,0,0,0*/] ,[24.88,-29.26] ,[25.7,-28.53] ,[26.52,-27.79] ,[27.47,-26.92] ,[28.25,-26.18] ,[29.09,-25.38] ,[29.98,-24.5] ,[30.91,-23.57] ,[31.87,-22.58] ,[32.86,-21.53] ,[33.88,-20.42] ,[34.56,-19.66] ,[35.25,-18.87] ,[35.94,-18.07] ,[36.63,-17.25] ,[37.32,-16.4] ,[38.01,-15.54] ,[38.69,-14.66] ,[39.36,-13.77] ,[40.02,-12.86] ,[40.67,-11.94] ,[41.31,-11] ,[41.93,-10.06] ,[42.54,-9.1] ,[43.12,-8.13] ,[43.68,-7.15] ,[44.22,-6.16] ,[44.74,-5.17] ,[45.22,-4.17] ,[45.68,-3.16] ,[46.1,-2.15] ,[46.49,-1.13] ,[46.84,-0.11] ,[47.16,0.91] ,[47.43,1.93] ,[47.67,2.96] ,[47.86,3.98],[48,5/*1:-2,-17,-1,9*/] ,[47.68,6.04] ,[47,6.99] ,[45.97,7.87] ,[45,8.47] ,[43.87,9.04] ,[42.6,9.56] ,[41.2,10.05] ,[40.2,10.35] ,[39.15,10.64] ,[38.06,10.91] ,[36.92,11.17] ,[35.76,11.41] ,[34.56,11.64] ,[33.33,11.86] ,[32.08,12.06] ,[30.81,12.24] ,[29.53,12.42] ,[28.23,12.58] ,[26.93,12.73] ,[25.63,12.88] ,[24.32,13] ,[23.02,13.12] ,[21.73,13.23] ,[20.46,13.33] ,[19.2,13.42] ,[17.96,13.51] ,[16.75,13.58] ,[15.57,13.65] ,[14.42,13.71] ,[13.32,13.76] ,[12.25,13.8] ,[11.23,13.84] ,[9.79,13.89] ,[8.48,13.93] ,[7.31,13.96] ,[6.3,13.98] ,[5.2,13.99] ,[4.2,14]]);
  
  S = eval(S);
  return P.subtract(S);
}
else
  return P;
}

function profil(){
    csg = union([mi_profil(), mi_profil().mirroredX()])
        .scale([params.echX, params.echY, 1]);
return csg;
}

function volume(){
    var a = 360/params.nbp, csg =[], i, A, B;

    A = linear_extrude({height:0.65}, profil(params.echX));
    for(i=0; i<params.nbp; i++){
        B = rotate([params.a1, i*a, 0], A);
        B = B.translate([params.d1 * sin(i*a),0, params.d1 * cos(i*a)]);
        csg.push(B);
    }
return union(csg);
}

function lampe(){
    var csg = [], A;

    A = volume();
    if (params.symetrie === ''){
        A = A.translate([0, -params.d2, 0]);
    }
    csg.push(A);
    
    if (params.symetrie == 'BAS'){
        A = A.rotateZ(180).translate([0, params.d2, 0]);
        csg.push(A);
    }
return color(params.couleur, union(csg));
}

L = center([true,true,false], lampe());
return L.translate([0,25,0]).rotateX(90);
}