<?php
    $idMat = $_GET['token'];
?>

<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <title>Siedutunja - Ficha Matricula</title>
    <style>
        table, th, td {
        border:1px solid black;
        padding-left: 5px;
        }
    </style>
  </head>
  <body>
    <div class="container">
        <img class="float-left" id="escudo" height="110"/>
        <div class="text-center">
            <div>REPUBLICA DE COLOMBIA</div>
            <div>SECRETARÍA DE EDUCACIÓN TERRITORIAl DE TUNJA</div>
            <div><strong><span id="ie">IE</span></strong></div>
            <div>TUNJA - BOYACÁ</div>
            <!--<div><span id="nit">NIT</span></div>-->
            <h5>FICHA DE MATRICULA AÑO LECTIVO <span id="vigencia"></span></h5>
        </div>
        <table style="width:100%">
            <tr>
                <td style="width:15%">Fecha Matricula</td><td id="fechaMat" style="width:25%"></td><td style="width:15%">Fecha Renovación</td><td id="renovMat" style="width:20%"></td><td style="width:10%">Código</td><td id="codigMat" style="width:25%"></td>
            </tr>
            <tr>
                <td>Sede</td><td id="sede"></td><td>Grado</td><td id="grado"></td><td>Especialidad</td><td id="especialidad"></td>
            </tr>
        </table>
        <table style="width:100%; margin-top: 15px;" class="text-center">
            <tr>
                <th>DATOS DEL ESTUDIANTE</th>
            </tr>
        </table>
        <table style="width:100%;">
            <tr>
                <td style="width:10%">Nombre</td><td id="estudiante" style="width:33%">NOMBREE</td><td style="width:10%">Documento</td><td id="documentoE" style="width:32%">DOCUMENTO</td><td style="width:10%">Género</td><td id="generoE" style="width:5%">GENERO</td>
            </tr>
            <tr>
                <td style="width:10%">Nacimiento</td><td id="naceE" style="width:33%">NACEE</td><td style="width:10%">EPS</td><td id="epsE" style="width:32%">EPS</td><td style="width:10%">RH</td><td id="rhE" style="width:5%">RH</td>
            </tr>
            <tr>
                <td style="width:10%">Dirección</td><td id="direccionE" style="width:33%">DIR</td><td style="width:10%">Teléfonos</td><td id="telefonoE" style="width:32%">TEL</td><td style="width:10%">Estrato</td><td id="estratoE" style="width:5%">ESTRATO</td>
            </tr>
            <tr>
                <td style="width:10%">Correo</td><td id="correoE" style="width:33%">CORREO</td><td style="width:10%">Discapacidad</td><td id="discapacidadE" style="width:32%">DISCA</td><td style="width:10%">Sisben</td><td id="sisbenE" style="width:5%">SISBEN</td>
            </tr>
        </table>
        <table style="width:100%; margin-top: 15px;" class="text-center">
            <tr>
                <th>DATOS FAMILIARES</th>
            </tr>
        </table>
        <table style="width:100%;">
            <tr>
                <td style="width:10%">Papá</td><td id="papa" style="width:40%">PAPA</td><td style="width:10%">Mamá</td><td id="mama" style="width:40%">MAMA</td>
            </tr>
            <tr>
                <td style="width:10%">Documento</td><td id="documentoP" style="width:40%">DOC</td><td style="width:10%">Documento</td><td id="documentoM" style="width:40%">DOC</td>
            </tr>
            <tr>
                <td style="width:10%">Dirección</td><td id="direccionP" style="width:40%">DIR</td><td style="width:10%">Dirección</td><td id="direccionM" style="width:40%">DIR</td>
            </tr>
            <tr>
                <td style="width:10%">Teléfonos</td><td id="telefonoP" style="width:40%">TEL</td><td style="width:10%">Teléfonos</td><td id="telefonoM" style="width:40%">TEL</td>
            </tr>
            <tr>
                <td style="width:10%">Ocupación</td><td id="ocupacionP" style="width:40%">OCUPA</td><td style="width:10%">Ocupación</td><td id="ocupacionM" style="width:40%">OCUPA</td>
            </tr>
        </table>
        <table style="width:100%; margin-top: 15px;" class="text-center">
            <tr>
                <th>DATOS DEL ACUDIENTE</th>
            </tr>
        </table>
        <table style="width:100%;">
            <tr>
                <td style="width:10%">Acudiente</td><td id="acudiente" style="width:40%">ACUD</td><td style="width:10%">Documento</td><td id="documentoA" style="width:40%">DOC</td>
            </tr>
            <tr>
                <td style="width:10%">Dirección</td><td id="direccionA" style="width:40%">DIR</td><td style="width:10%">Teléfonos</td><td id="telefonoA" style="width:40%">TEL</td>
            </tr>
            <tr>
                <td style="width:10%">Ocupación</td><td id="ocupacionA" style="width:40%">OCUPA</td><td style="width:10%">Parentesco</td><td id="parentesco" style="width:40%">PAREN</td>
            </tr>
        </table>
        <table style="width:100%; margin-top: 15px;" class="text-center">
            <tr>
                <th>OBSERVACIONES</th>
            </tr>
        </table>
        <table style="width:100%;">
            <tr>
                <td style="width:100%; height:50px;" id="observaciones">OBSERVA</td>
            </tr>
        </table>
        <table style="width:100%; margin-top: 15px;" class="text-center">
            <tr>
                <th>RENOVACIONES</th>
            </tr>
        </table>
        <table style="width:100%;">
            <tr class="text-center">
                <td style="width:15%;">Fecha</td><td style="width:10%;">Vigencia</td><td style="width:15%;">Grado</td><td style="width:15%;">Firma Estudiante</td><td style="width:15%;">Firma Acudiente</td><td style="width:15%;">Firma Secretario(a)</td><td style="width:15%;">Firma Rector(a)</td>
            </tr>
            <tr class="text-center">
                <td style="width:15%; height:40px;"></td><td style="width:10%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td>
            </tr>
            <tr class="text-center">
                <td style="width:15%; height:40px;"></td><td style="width:10%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td>
            </tr>
            <tr class="text-center">
                <td style="width:15%; height:40px;"></td><td style="width:10%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td>
            </tr>
            <tr class="text-center">
                <td style="width:15%; height:40px;"></td><td style="width:10%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td>
            </tr>
            <tr class="text-center">
                <td style="width:15%; height:40px;"></td><td style="width:10%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td>
            </tr>
            <tr class="text-center">
                <td style="width:15%; height:40px;"></td><td style="width:10%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td>
            </tr>
            <tr class="text-center">
                <td style="width:15%; height:40px;"></td><td style="width:10%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td>
            </tr>
            <tr class="text-center">
                <td style="width:15%; height:40px;"></td><td style="width:10%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td>
            </tr>
            <tr class="text-center">
                <td style="width:15%; height:40px;"></td><td style="width:10%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td>
            </tr>
            <tr class="text-center">
                <td style="width:15%; height:40px;"></td><td style="width:10%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td>
            </tr>
            <tr class="text-center">
                <td style="width:15%; height:40px;"></td><td style="width:10%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td>
            </tr>
            <tr class="text-center">
                <td style="width:15%; height:40px;"></td><td style="width:10%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td><td style="width:15%;"></td>
            </tr>
        </table>
        <table style="width:100%; margin-top: 15px;">
            <tr>
                <td>La firma de la matricula del padre de familia y/o acudiente y estudiante conlleva a la aceptación del PEI (Sistema de Evaluación Institucional), Manual de Convivencia, la utilización de imágenes, fotografías y videos con fines netamente educativos y registros prdagógicos por la autoridad
                    competente y el porte adecuado del uniforme desde el inicio del año escolar. <span id="otra_obs"></span>
                </td>
            </tr>
        </table>
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
        var datosMatricula = {}
        var escudo = 'escudo-base.png';
        $(document).ready(function() {
            //$('#datosInstitucion').hide();
            consultarMatricula();
        });
        function consultarMatricula() {
            var id = "<?=$idMat ?>";
            axios 
            .get("http://localhost:5001/api/academico/matriculas/fichamatricula", { params: { idMatricula: id }})
            .then(response => {
                if (response.data.error){
                    alert(response.data.error + ' * Error - Consulta Ficha Matricula');
                } else{
                    datosMatricula = response.data.datos;
                    document.getElementById("ie").innerHTML = datosMatricula.institucion;
                    //document.getElementById("nit").innerHTML = datosMatricula.nit;
                    document.getElementById("fechaMat").innerHTML = datosMatricula.creado.substr(0,10);
                    document.getElementById("vigencia").innerHTML = datosMatricula.vigencia;
                    document.getElementById("renovMat").innerHTML = datosMatricula.creado.substr(0,10);
                    document.getElementById("codigMat").innerHTML = datosMatricula.codigo;
                    document.getElementById("sede").innerHTML = datosMatricula.sede;
                    document.getElementById("grado").innerHTML = datosMatricula.grado;
                    document.getElementById("especialidad").innerHTML = datosMatricula.especialidad;
                    document.getElementById("estudiante").innerHTML = datosMatricula.estudiante;
                    document.getElementById("documentoE").innerHTML = datosMatricula.nomenclatura + '-' + datosMatricula.documento + ' de ' + datosMatricula.municipioDocE;
                    document.getElementById("generoE").innerHTML = datosMatricula.id_genero;
                    document.getElementById("naceE").innerHTML = datosMatricula.fecha_nacimiento.substr(0,10) + ' en ' + datosMatricula.municipioNacE;
                    document.getElementById("epsE").innerHTML = datosMatricula.eps;
                    document.getElementById("rhE").innerHTML = datosMatricula.rh;
                    document.getElementById("direccionE").innerHTML = datosMatricula.direccion + ' de ' + datosMatricula.municipioDirE;
                    document.getElementById("telefonoE").innerHTML = datosMatricula.telefono1 + ' - ' + datosMatricula.telefono2;
                    if(datosMatricula.id_estrato == 9)
                        document.getElementById("estratoE").innerHTML = '-';
                    else
                        document.getElementById("estratoE").innerHTML = datosMatricula.id_estrato;
                    document.getElementById("correoE").innerHTML = datosMatricula.correo;
                    document.getElementById("discapacidadE").innerHTML = datosMatricula.discapacidad;
                    document.getElementById("sisbenE").innerHTML = datosMatricula.subgrupo;
                    document.getElementById("papa").innerHTML = datosMatricula.papa;
                    document.getElementById("mama").innerHTML = datosMatricula.mama;
                    document.getElementById("documentoP").innerHTML = datosMatricula.nomenclaturaP + ' # ' + datosMatricula.documentoP;
                    document.getElementById("documentoM").innerHTML = datosMatricula.nomenclaturaM + ' # ' + datosMatricula.documentoM;
                    document.getElementById("direccionP").innerHTML = datosMatricula.direccionP + ' - ' + datosMatricula.barrioP;
                    document.getElementById("direccionM").innerHTML = datosMatricula.direccionM + ' - ' + datosMatricula.barrioM;
                    document.getElementById("telefonoP").innerHTML = datosMatricula.telefono1P + ' - ' + datosMatricula.telefono2P;
                    document.getElementById("telefonoM").innerHTML = datosMatricula.telefono1M + ' - ' + datosMatricula.telefono2M;
                    document.getElementById("ocupacionP").innerHTML = datosMatricula.ocupacionP;
                    document.getElementById("ocupacionM").innerHTML = datosMatricula.ocupacionM;
                    document.getElementById("acudiente").innerHTML = datosMatricula.acudiente;
                    document.getElementById("documentoA").innerHTML = datosMatricula.nomenclaturaA + ' # ' + datosMatricula.documentoA;
                    document.getElementById("direccionA").innerHTML = datosMatricula.direccionA + ' - ' + datosMatricula.barrioA;
                    document.getElementById("telefonoA").innerHTML = datosMatricula.telefono1A + ' - ' + datosMatricula.telefono2A;
                    document.getElementById("ocupacionA").innerHTML = datosMatricula.ocupacionA;
                    document.getElementById("parentesco").innerHTML = datosMatricula.parentesco;
                    if (datosMatricula.obs_matricula == null || datosMatricula.obs_matricula == '') {
                        document.getElementById("observaciones").innerHTML = '-';
                    } else {
                        document.getElementById("observaciones").innerHTML = datosMatricula.obs_matricula;
                    }
                    if (datosMatricula.id == 'eb58bf60-fc83-11ec-a1d1-1dc2835404e5') {
                        document.getElementById("otra_obs").innerHTML = 'Se da por notificado de la circular 08 del 28 de octubre de 2024.';
                    }
                    let ruta = 'https://siedutunja.gov.co/api/colegios/escudos/' + datosMatricula.escudo
                    let imagenEscudo = document.getElementById("escudo");
                    let newimg = document.createElement("img");
                    newimg.setAttribute("src", ruta);
                    imagenEscudo.appendChild(newimg);
                }
            })
            .catch(err => {
                alert('Algo salio mal y no se pudo realizar la consulta: Ficha Matricula. Intente más tarde.' + err);
            })
            
        }
    </script>
  </body>
</html>