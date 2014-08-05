var app = angular.module('app', []);
var fs = require('fs');

/* Retorna el listado de temas .css del directorio 'temas' en forma
 * de diccionario [{nombre: '??', archivo: "??.css"}, ...]
 */
function obtener_listado_de_temas() {
  var archivos = fs.readdirSync('../temas').filter(function(e) {
    return /.css/.test(e);
  });

  var resultado = [];

  for (var i in archivos) {
    var filename = archivos[i];

    resultado.push({
      nombre: filename.replace('.css', ''),
      archivo: filename
    });
  }

  return resultado;
}



app.controller('MainCtrl', function MainCtrl($scope) {
  $scope.data = {};
  $scope.data.seleccionado = 0;

  $scope.data.temas = obtener_listado_de_temas();

  $scope.obtener_clase = function(indice, elemento) {
    if (indice === $scope.data.seleccionado)
      return "activo";
    else
      return "";
  }

  $scope.seleccionar = function(indice) {
    $scope.data.seleccionado = indice;
    var archivo_a_copiar = '../temas/' + $scope.data.temas[indice].archivo;
    var destino = "/Users/hugoruscitti/.huayra/theme.css"

    fs.writeFileSync(destino, fs.readFileSync(archivo_a_copiar));
  }

})
