<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> BOLETINES DE EVALUACIÓN</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card bg-variant="light" text-variant="">
                  <b-card-text>
                    <b-row>
                      <b-col lg="4">
                        <h6>Por Periodo</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idBoletin" :aria-describedby="ariaDescribedby" name="some-radios" value="1" @change="idPeriodo=null,idSede=null,idCurso=null">Boletines por periodo</b-form-radio>
                          <b-form-radio v-model="idBoletin" :aria-describedby="ariaDescribedby" name="some-radios" value="2" @change="idPeriodo=null,idSede=null,idCurso=null">Boletines retirados</b-form-radio>
                          <b-form-radio v-model="idBoletin" :aria-describedby="ariaDescribedby" name="some-radios" value="3" @change="idPeriodo=null,idSede=null,idCurso=null">Boletines ubicados/reubicados</b-form-radio>
                          <b-form-radio v-model="idBoletin" :aria-describedby="ariaDescribedby" name="some-radios" value="4" @change="idPeriodo=null,idSede=null,idCurso=null">Boletines promocionados anticipadamente</b-form-radio>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <h6>Boletines Finales</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idBoletin" :aria-describedby="ariaDescribedby" name="some-radios" value="10">Boletines Finales</b-form-radio>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <b-row v-if="idBoletin==1"> 
              <b-col lg="12">
                <b-card>
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> BOLETINES POR PERIODO</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="2">
                        <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                          <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idSede=null,idCurso=null,mostrarBoletines=null"></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6">
                        <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                          <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparComboCursosSede(),mostrarBoletines=null" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                          <b-form-select id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="consultarEstudiantes(),mostrarBoletines=null" :disabled="idSede!=null ? false : true"></b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
                <div v-if="idNivel == 1">
                  <BoletinPree
                    v-if="mostrarBoletines"
                    :estudiantesSeleccionados="estudiantesSeleccionados"
                    :listaAreasAsignaturas="listaAreasAsignaturas"
                    :listaDescriptores="listaDescriptores"
                    :notas="notas"
                    :datosEstudiantes="datosEstudiantes"
                    :anio="Number($store.state.aLectivo)"
                    :periodoActual="idPeriodo"
                    :periodosVisibles="periodosVisibles"
                    :nombreSede="nombreSede"
                    :nombreCurso="nombreCurso"
                    :nombrePeriodo="nombrePeriodo"
                    :nombreJornada="nombreJornada"
                    :nombreDirector="nombreDirector"
                    :idNivel="idNivel"
                    :umbralesA="umbralesA"
                    :umbralesT="umbralesT"
                    :pesosPeriodos="pesosPeriodos"
                    :tipoValComp="tipoValComp"
                    :promCompor="promCompor"
                    :escalaPreescolar="escalaPreescolar"
                    :nuevaEscalaPreescolar="nuevaEscalaPreescolar"
                    :firmasBoletin="firmasBoletin"
                  />
                </div>
                <div v-else>
                  <span v-if="$store.state.idInstitucion == 'eb58bf60-fc83-11ec-a1d1-1dc2835404e5'"> <!-- INEM -->
                    <BoletinPeriodoInem v-if="mostrarBoletines" :estudiantesSeleccionados="estudiantesSeleccionados" :listaAreasAsignaturas="listaAreasAsignaturas" :listaDescriptores="listaDescriptores" :notas="notas" :datosEstudiantes="datosEstudiantes" :anio="Number($store.state.aLectivo)" :periodoActual="idPeriodo" :periodosVisibles="periodosVisibles" :nombreSede="nombreSede" :nombreCurso="nombreCurso" :nombrePeriodo="nombrePeriodo" :nombreJornada="nombreJornada" :nombreDirector="nombreDirector" :idNivel="idNivel" :umbralesA="umbralesA" :umbralesT="umbralesT" :pesosPeriodos="pesosPeriodos" :tipoValComp="tipoValComp" :promCompor="promCompor" :letrasCompor="letrasCompor" :firmasBoletin="firmasBoletin" :descC1="descC1" :descC2="descC2" :descC3="descC3" :idGrado="idGrado" />
                  </span>
                  <span v-else-if="$store.state.idInstitucion == '660fa760-fc83-11ec-a1d1-1dc2835404e5'"> <!-- GRANCOLOMBIANO -->
                    <BoletinPeriodoGranColombiano v-if="mostrarBoletines" :estudiantesSeleccionados="estudiantesSeleccionados" :listaAreasAsignaturas="listaAreasAsignaturas" :listaDescriptores="listaDescriptores" :notas="notas" :datosEstudiantes="datosEstudiantes" :anio="Number($store.state.aLectivo)" :periodoActual="idPeriodo" :periodosVisibles="periodosVisibles" :nombreSede="nombreSede" :nombreCurso="nombreCurso" :nombrePeriodo="nombrePeriodo" :nombreJornada="nombreJornada" :nombreDirector="nombreDirector" :idNivel="idNivel" :umbralesA="umbralesA" :umbralesT="umbralesT" :pesosPeriodos="pesosPeriodos" :tipoValComp="tipoValComp" :promCompor="promCompor" :letrasCompor="letrasCompor" :firmasBoletin="firmasBoletin" :descC1="descC1" :descC2="descC2" :descC3="descC3" :idGrado="idGrado" />
                  </span>
                  <span v-else-if="$store.state.idInstitucion == 'f5529ba0-fcb3-11ec-8267-536b07c743c4'"> <!-- GUSTAVOROJAS -->
                    <BoletinPeriodoGustavoRojas v-if="mostrarBoletines" :estudiantesSeleccionados="estudiantesSeleccionados" :listaAreasAsignaturas="listaAreasAsignaturas" :listaDescriptores="listaDescriptores" :notas="notas" :datosEstudiantes="datosEstudiantes" :anio="Number($store.state.aLectivo)" :periodoActual="idPeriodo" :periodosVisibles="periodosVisibles" :nombreSede="nombreSede" :nombreCurso="nombreCurso" :nombrePeriodo="nombrePeriodo" :nombreJornada="nombreJornada" :nombreDirector="nombreDirector" :idNivel="idNivel" :umbralesA="umbralesA" :umbralesT="umbralesT" :pesosPeriodos="pesosPeriodos" :tipoValComp="tipoValComp" :promCompor="promCompor" :letrasCompor="letrasCompor" :firmasBoletin="firmasBoletin" :descC1="descC1" :descC2="descC2" :descC3="descC3" :idGrado="idGrado" />
                  </span>
                  <span v-else-if="$store.state.idInstitucion == 'bd226a20-fc82-11ec-a1d1-1dc2835404e5'"> <!-- JULIUS -->
                    <BoletinPeriodoJulius v-if="mostrarBoletines" :estudiantesSeleccionados="estudiantesSeleccionados" :listaAreasAsignaturas="listaAreasAsignaturas" :listaDescriptores="listaDescriptores" :notas="notas" :datosEstudiantes="datosEstudiantes" :anio="Number($store.state.aLectivo)" :periodoActual="idPeriodo" :periodosVisibles="periodosVisibles" :nombreSede="nombreSede" :nombreCurso="nombreCurso" :nombrePeriodo="nombrePeriodo" :nombreJornada="nombreJornada" :nombreDirector="nombreDirector" :idNivel="idNivel" :umbralesA="umbralesA" :umbralesT="umbralesT" :pesosPeriodos="pesosPeriodos" :tipoValComp="tipoValComp" :promCompor="promCompor" :letrasCompor="letrasCompor" :firmasBoletin="firmasBoletin" :descC1="descC1" :descC2="descC2" :descC3="descC3" :idGrado="idGrado" />
                  </span>
                  <span v-else-if="$store.state.idInstitucion == 'acaa36d0-fcb1-11ec-8267-536b07c743c4'"> <!-- EMILIANI -->
                    <BoletinPeriodoEmiliani v-if="mostrarBoletines" :estudiantesSeleccionados="estudiantesSeleccionados" :listaAreasAsignaturas="listaAreasAsignaturas" :listaDescriptores="listaDescriptores" :notas="notas" :datosEstudiantes="datosEstudiantes" :anio="Number($store.state.aLectivo)" :periodoActual="idPeriodo" :periodosVisibles="periodosVisibles" :nombreSede="nombreSede" :nombreCurso="nombreCurso" :nombrePeriodo="nombrePeriodo" :nombreJornada="nombreJornada" :nombreDirector="nombreDirector" :idNivel="idNivel" :umbralesA="umbralesA" :umbralesT="umbralesT" :pesosPeriodos="pesosPeriodos" :tipoValComp="tipoValComp" :promCompor="promCompor" :letrasCompor="letrasCompor" :firmasBoletin="firmasBoletin" :descC1="descC1" :descC2="descC2" :descC3="descC3" :idGrado="idGrado" />
                  </span>
                  <span v-else>
                    <BoletinPeriodo v-if="mostrarBoletines" :estudiantesSeleccionados="estudiantesSeleccionados" :listaAreasAsignaturas="listaAreasAsignaturas" :listaDescriptores="listaDescriptores" :notas="notas" :datosEstudiantes="datosEstudiantes" :anio="Number($store.state.aLectivo)" :periodoActual="idPeriodo" :periodosVisibles="periodosVisibles" :nombreSede="nombreSede" :nombreCurso="nombreCurso" :nombrePeriodo="nombrePeriodo" :nombreJornada="nombreJornada" :nombreDirector="nombreDirector" :idNivel="idNivel" :umbralesA="umbralesA" :umbralesT="umbralesT" :pesosPeriodos="pesosPeriodos" :tipoValComp="tipoValComp" :promCompor="promCompor" :letrasCompor="letrasCompor" :firmasBoletin="firmasBoletin" :descC1="descC1" :descC2="descC2" :descC3="descC3" />
                  </span>
                </div>
              </b-col>
            </b-row>
            <b-row v-if="idBoletin==2"> 
              <b-col lg="12">
                <b-card>
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> BOLETINES POR PERIODO</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="2">
                        <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                          <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idSede=null,idCurso=null,mostrarBoletines=null"></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6">
                        <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                          <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparComboCursosSede(),mostrarBoletines=null" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                          <b-form-select id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="consultarEstudiantes(),mostrarBoletines=null" :disabled="idSede!=null ? false : true"></b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
                <div v-if="idNivel == 1">
                  <BoletinPreeRetirado
                    v-if="mostrarBoletines"
                    :estudiantesSeleccionados="estudiantesSeleccionados"
                    :listaAreasAsignaturas="listaAreasAsignaturas"
                    :listaDescriptores="listaDescriptores"
                    :notas="notas"
                    :datosEstudiantes="datosEstudiantes"
                    :anio="Number($store.state.aLectivo)"
                    :periodoActual="idPeriodo"
                    :periodosVisibles="periodosVisibles"
                    :nombreSede="nombreSede"
                    :nombreCurso="nombreCurso"
                    :nombrePeriodo="nombrePeriodo"
                    :nombreJornada="nombreJornada"
                    :nombreDirector="nombreDirector"
                    :idNivel="idNivel"
                    :umbralesA="umbralesA"
                    :umbralesT="umbralesT"
                    :pesosPeriodos="pesosPeriodos"
                    :tipoValComp="tipoValComp"
                    :promCompor="promCompor"
                    :escalaPreescolar="escalaPreescolar"
                    :nuevaEscalaPreescolar="nuevaEscalaPreescolar"
                    :firmasBoletin="firmasBoletin"
                  />
                </div>
                <div v-else>
                  <BoletinPeriodoRetirado
                    v-if="mostrarBoletines"
                    :estudiantesSeleccionados="estudiantesSeleccionados"
                    :listaAreasAsignaturas="listaAreasAsignaturas"
                    :listaDescriptores="listaDescriptores"
                    :notas="notas"
                    :datosEstudiantes="datosEstudiantes"
                    :anio="Number($store.state.aLectivo)"
                    :periodoActual="idPeriodo"
                    :periodosVisibles="periodosVisibles"
                    :nombreSede="nombreSede"
                    :nombreCurso="nombreCurso"
                    :nombrePeriodo="nombrePeriodo"
                    :nombreJornada="nombreJornada"
                    :nombreDirector="nombreDirector"
                    :idNivel="idNivel"
                    :umbralesA="umbralesA"
                    :umbralesT="umbralesT"
                    :pesosPeriodos="pesosPeriodos"
                    :tipoValComp="tipoValComp"
                    :promCompor="promCompor"
                    :letrasCompor="letrasCompor"
                    :firmasBoletin="firmasBoletin"
                  />
                </div>
              </b-col>
            </b-row>
            <b-row v-if="idBoletin==3"> 
              <b-col lg="12">
                <b-card>
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> BOLETINES POR PERIODO</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="2">
                        <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                          <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idSede=null,idCurso=null,mostrarBoletines=null"></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6">
                        <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                          <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparComboCursosSede(),mostrarBoletines=null" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                          <b-form-select id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="consultarEstudiantes(),mostrarBoletines=null" :disabled="idSede!=null ? false : true"></b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
                <div v-if="idNivel == 1">
                  <BoletinPreeReubicado
                    v-if="mostrarBoletines"
                    :estudiantesSeleccionados="estudiantesSeleccionados"
                    :listaAreasAsignaturas="listaAreasAsignaturas"
                    :listaDescriptores="listaDescriptores"
                    :notas="notas"
                    :datosEstudiantes="datosEstudiantes"
                    :anio="Number($store.state.aLectivo)"
                    :periodoActual="idPeriodo"
                    :periodosVisibles="periodosVisibles"
                    :nombreSede="nombreSede"
                    :nombreCurso="nombreCurso"
                    :nombrePeriodo="nombrePeriodo"
                    :nombreJornada="nombreJornada"
                    :nombreDirector="nombreDirector"
                    :idNivel="idNivel"
                    :umbralesA="umbralesA"
                    :umbralesT="umbralesT"
                    :pesosPeriodos="pesosPeriodos"
                    :tipoValComp="tipoValComp"
                    :promCompor="promCompor"
                    :escalaPreescolar="escalaPreescolar"
                    :nuevaEscalaPreescolar="nuevaEscalaPreescolar"
                    :firmasBoletin="firmasBoletin"
                  />
                </div>
                <div v-else>
                  <BoletinPeriodoReubicado
                    v-if="mostrarBoletines"
                    :estudiantesSeleccionados="estudiantesSeleccionados"
                    :listaAreasAsignaturas="listaAreasAsignaturas"
                    :listaDescriptores="listaDescriptores"
                    :notas="notas"
                    :datosEstudiantes="datosEstudiantes"
                    :anio="Number($store.state.aLectivo)"
                    :periodoActual="idPeriodo"
                    :periodosVisibles="periodosVisibles"
                    :nombreSede="nombreSede"
                    :nombreCurso="nombreCurso"
                    :nombrePeriodo="nombrePeriodo"
                    :nombreJornada="nombreJornada"
                    :nombreDirector="nombreDirector"
                    :idNivel="idNivel"
                    :umbralesA="umbralesA"
                    :umbralesT="umbralesT"
                    :pesosPeriodos="pesosPeriodos"
                    :tipoValComp="tipoValComp"
                    :promCompor="promCompor"
                    :letrasCompor="letrasCompor"
                    :firmasBoletin="firmasBoletin"
                  />
                </div>
              </b-col>
            </b-row>
            <b-row v-if="idBoletin==4"> 
              <b-col lg="12">
                <b-card>
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> BOLETINES POR PERIODO</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="2">
                        <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                          <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idSede=null,idCurso=null,mostrarBoletines=null"></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6">
                        <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                          <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparComboCursosSede(),mostrarBoletines=null" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                          <b-form-select id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="consultarEstudiantes(),mostrarBoletines=null" :disabled="idSede!=null ? false : true"></b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
                <div v-if="idNivel == 1">
                  <BoletinPreePromocionado
                    v-if="mostrarBoletines"
                    :estudiantesSeleccionados="estudiantesSeleccionados"
                    :listaAreasAsignaturas="listaAreasAsignaturas"
                    :listaDescriptores="listaDescriptores"
                    :notas="notas"
                    :datosEstudiantes="datosEstudiantes"
                    :anio="Number($store.state.aLectivo)"
                    :periodoActual="idPeriodo"
                    :periodosVisibles="periodosVisibles"
                    :nombreSede="nombreSede"
                    :nombreCurso="nombreCurso"
                    :nombrePeriodo="nombrePeriodo"
                    :nombreJornada="nombreJornada"
                    :nombreDirector="nombreDirector"
                    :idNivel="idNivel"
                    :umbralesA="umbralesA"
                    :umbralesT="umbralesT"
                    :pesosPeriodos="pesosPeriodos"
                    :tipoValComp="tipoValComp"
                    :promCompor="promCompor"
                    :escalaPreescolar="escalaPreescolar"
                    :nuevaEscalaPreescolar="nuevaEscalaPreescolar"
                    :firmasBoletin="firmasBoletin"
                  />
                </div>
                <div v-else>
                  <BoletinPeriodoPromocionado
                    v-if="mostrarBoletines"
                    :estudiantesSeleccionados="estudiantesSeleccionados"
                    :listaAreasAsignaturas="listaAreasAsignaturas"
                    :listaDescriptores="listaDescriptores"
                    :notas="notas"
                    :datosEstudiantes="datosEstudiantes"
                    :anio="Number($store.state.aLectivo)"
                    :periodoActual="idPeriodo"
                    :periodosVisibles="periodosVisibles"
                    :nombreSede="nombreSede"
                    :nombreCurso="nombreCurso"
                    :nombrePeriodo="nombrePeriodo"
                    :nombreJornada="nombreJornada"
                    :nombreDirector="nombreDirector"
                    :idNivel="idNivel"
                    :umbralesA="umbralesA"
                    :umbralesT="umbralesT"
                    :pesosPeriodos="pesosPeriodos"
                    :tipoValComp="tipoValComp"
                    :promCompor="promCompor"
                    :letrasCompor="letrasCompor"
                    :firmasBoletin="firmasBoletin"
                  />
                </div>
              </b-col>
            </b-row>
            <b-row v-if="idBoletin==10"> 
              <b-col lg="12">
                <b-card>
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> BOLETINES DEFINITIVOS</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="6">
                        <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                          <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparComboCursosSede(),mostrarBoletines=null"></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                          <b-form-select id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="consultarEstudiantes(),mostrarBoletines=null" :disabled="idSede!=null ? false : true"></b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
                <div v-if="idNivel == 1">
                  <BoletinPreeFinal v-if="mostrarBoletines" :estudiantesSeleccionados="estudiantesSeleccionados" :listaAreasAsignaturas="listaAreasAsignaturas" :listaDescriptores="listaDescriptores" :notas="notas" :datosEstudiantes="datosEstudiantes" :anio="Number($store.state.aLectivo)" :periodoActual="idPeriodo" :periodosVisibles="periodosVisibles" :nombreSede="nombreSede" :nombreCurso="nombreCurso" :nombrePeriodo="nombrePeriodo" :nombreJornada="nombreJornada" :nombreDirector="nombreDirector" :idNivel="idNivel" :umbralesA="umbralesA" :umbralesT="umbralesT" :pesosPeriodos="pesosPeriodos" :tipoValComp="tipoValComp" :promCompor="promCompor" :escalaPreescolar="escalaPreescolar" :nuevaEscalaPreescolar="nuevaEscalaPreescolar" :firmasBoletin="firmasBoletin" />
                </div>
                <div v-else>
                  <span v-if="$store.state.idInstitucion == '097b7b10-fcaa-11ec-8267-536b07c743c4'"> <!-- RURAL -->
                    <BoletinFinalRural v-if="mostrarBoletines" :listaHabilitaciones="listaHabilitaciones" :estudiantesSeleccionados="estudiantesSeleccionados" :listaAreasAsignaturas="listaAreasAsignaturas" :listaDescriptores="listaDescriptores" :notas="notas" :datosEstudiantes="datosEstudiantes" :anio="Number($store.state.aLectivo)" :periodoActual="idPeriodo" :periodosVisibles="periodosVisibles" :nombreSede="nombreSede" :nombreCurso="nombreCurso" :nombrePeriodo="nombrePeriodo" :nombreJornada="nombreJornada" :nombreDirector="nombreDirector" :idNivel="idNivel" :umbralesA="umbralesA" :umbralesT="umbralesT" :pesosPeriodos="pesosPeriodos" :tipoValComp="tipoValComp" :promCompor="promCompor" :letrasCompor="letrasCompor" :firmasBoletin="firmasBoletin" :descC1="descC1" :descC2="descC2" :descC3="descC3" />
                  </span>
                  <span v-else-if="$store.state.idInstitucion == '660fa760-fc83-11ec-a1d1-1dc2835404e5'"> <!-- GRANCOLOMBIANO -->
                    <BoletinFinalGranColombiano v-if="mostrarBoletines" :listaHabilitaciones="listaHabilitaciones" :estudiantesSeleccionados="estudiantesSeleccionados" :listaAreasAsignaturas="listaAreasAsignaturas" :listaDescriptores="listaDescriptores" :notas="notas" :datosEstudiantes="datosEstudiantes" :anio="Number($store.state.aLectivo)" :periodoActual="idPeriodo" :periodosVisibles="periodosVisibles" :nombreSede="nombreSede" :nombreCurso="nombreCurso" :nombrePeriodo="nombrePeriodo" :nombreJornada="nombreJornada" :nombreDirector="nombreDirector" :idNivel="idNivel" :umbralesA="umbralesA" :umbralesT="umbralesT" :pesosPeriodos="pesosPeriodos" :tipoValComp="tipoValComp" :promCompor="promCompor" :letrasCompor="letrasCompor" :firmasBoletin="firmasBoletin" :descC1="descC1" :descC2="descC2" :descC3="descC3" :idGrado="idGrado" />
                  </span>
                  <!--
                  <span v-else-if="$store.state.idInstitucion == 'eb58bf60-fc83-11ec-a1d1-1dc2835404e5X'"> INEM 
                    <BoletinPeriodoInem v-if="mostrarBoletines" :estudiantesSeleccionados="estudiantesSeleccionados" :listaAreasAsignaturas="listaAreasAsignaturas" :listaDescriptores="listaDescriptores" :notas="notas" :datosEstudiantes="datosEstudiantes" :anio="Number($store.state.aLectivo)" :periodoActual="idPeriodo" :periodosVisibles="periodosVisibles" :nombreSede="nombreSede" :nombreCurso="nombreCurso" :nombrePeriodo="nombrePeriodo" :nombreJornada="nombreJornada" :nombreDirector="nombreDirector" :idNivel="idNivel" :umbralesA="umbralesA" :umbralesT="umbralesT" :pesosPeriodos="pesosPeriodos" :tipoValComp="tipoValComp" :promCompor="promCompor" :letrasCompor="letrasCompor" :firmasBoletin="firmasBoletin" :descC1="descC1" :descC2="descC2" :descC3="descC3" :idGrado="idGrado" />
                  </span>
                  <span v-else-if="$store.state.idInstitucion == 'f5529ba0-fcb3-11ec-8267-536b07c743c4'">  GUSTAVOROJAS 
                    <BoletinPeriodoGustavoRojas v-if="mostrarBoletines" :estudiantesSeleccionados="estudiantesSeleccionados" :listaAreasAsignaturas="listaAreasAsignaturas" :listaDescriptores="listaDescriptores" :notas="notas" :datosEstudiantes="datosEstudiantes" :anio="Number($store.state.aLectivo)" :periodoActual="idPeriodo" :periodosVisibles="periodosVisibles" :nombreSede="nombreSede" :nombreCurso="nombreCurso" :nombrePeriodo="nombrePeriodo" :nombreJornada="nombreJornada" :nombreDirector="nombreDirector" :idNivel="idNivel" :umbralesA="umbralesA" :umbralesT="umbralesT" :pesosPeriodos="pesosPeriodos" :tipoValComp="tipoValComp" :promCompor="promCompor" :letrasCompor="letrasCompor" :firmasBoletin="firmasBoletin" :descC1="descC1" :descC2="descC2" :descC3="descC3" :idGrado="idGrado" />
                  </span>
                  <span v-else-if="$store.state.idInstitucion == 'bd226a20-fc82-11ec-a1d1-1dc2835404e5'">  JULIUS 
                    <BoletinPeriodoJulius v-if="mostrarBoletines" :estudiantesSeleccionados="estudiantesSeleccionados" :listaAreasAsignaturas="listaAreasAsignaturas" :listaDescriptores="listaDescriptores" :notas="notas" :datosEstudiantes="datosEstudiantes" :anio="Number($store.state.aLectivo)" :periodoActual="idPeriodo" :periodosVisibles="periodosVisibles" :nombreSede="nombreSede" :nombreCurso="nombreCurso" :nombrePeriodo="nombrePeriodo" :nombreJornada="nombreJornada" :nombreDirector="nombreDirector" :idNivel="idNivel" :umbralesA="umbralesA" :umbralesT="umbralesT" :pesosPeriodos="pesosPeriodos" :tipoValComp="tipoValComp" :promCompor="promCompor" :letrasCompor="letrasCompor" :firmasBoletin="firmasBoletin" :descC1="descC1" :descC2="descC2" :descC3="descC3" :idGrado="idGrado" />
                  </span>
                  <span v-else-if="$store.state.idInstitucion == 'acaa36d0-fcb1-11ec-8267-536b07c743c4'">  EMILIANI 
                    <BoletinPeriodoEmiliani v-if="mostrarBoletines" :estudiantesSeleccionados="estudiantesSeleccionados" :listaAreasAsignaturas="listaAreasAsignaturas" :listaDescriptores="listaDescriptores" :notas="notas" :datosEstudiantes="datosEstudiantes" :anio="Number($store.state.aLectivo)" :periodoActual="idPeriodo" :periodosVisibles="periodosVisibles" :nombreSede="nombreSede" :nombreCurso="nombreCurso" :nombrePeriodo="nombrePeriodo" :nombreJornada="nombreJornada" :nombreDirector="nombreDirector" :idNivel="idNivel" :umbralesA="umbralesA" :umbralesT="umbralesT" :pesosPeriodos="pesosPeriodos" :tipoValComp="tipoValComp" :promCompor="promCompor" :letrasCompor="letrasCompor" :firmasBoletin="firmasBoletin" :descC1="descC1" :descC2="descC2" :descC3="descC3" :idGrado="idGrado" />
                  </span>
                  -->
                  <span v-else>
                    <BoletinFinal v-if="mostrarBoletines" :listaHabilitaciones="listaHabilitaciones" :estudiantesSeleccionados="estudiantesSeleccionados" :listaAreasAsignaturas="listaAreasAsignaturas" :listaDescriptores="listaDescriptores" :notas="notas" :datosEstudiantes="datosEstudiantes" :anio="Number($store.state.aLectivo)" :periodoActual="idPeriodo" :periodosVisibles="periodosVisibles" :nombreSede="nombreSede" :nombreCurso="nombreCurso" :nombrePeriodo="nombrePeriodo" :nombreJornada="nombreJornada" :nombreDirector="nombreDirector" :idNivel="idNivel" :umbralesA="umbralesA" :umbralesT="umbralesT" :pesosPeriodos="pesosPeriodos" :tipoValComp="tipoValComp" :promCompor="promCompor" :letrasCompor="letrasCompor" :firmasBoletin="firmasBoletin" :descC1="descC1" :descC2="descC2" :descC3="descC3" />
                  </span>
                </div>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idCurso!=null">
              <b-col lg="12"><hr></b-col>
              <b-col lg="12">
                <div v-if="btnCargando">
                  <div class="text-center m-5 text-primary">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                    <br><strong>Cargando planilla...</strong>
                  </div>
                </div>
                <div v-else>
                  <vue-good-table ref="estudiantes" :columns="encabColumnas" :rows="datosEstudiantes" @on-row-click="mostrarBoletines=false" styleClass="vgt-table condensed bordered striped" :line-numbers="true"
                  :select-options="{enabled: true,selectionText: 'estudiantes seleccionados',clearSelectionText: 'Limpiar',}">
                    <template #selected-row-actions>
                      <button class="small btn btn-primary" @click="procesarBoletinesFinales()">Procesar Boletines para Impresión</button>
                    </template>
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                    </div>
                  </vue-good-table>
                </div>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import BoletinPeriodoInem from '@/views/reportes/boletines/BoletinPeriodoInem'
  import BoletinPeriodoGranColombiano from '@/views/reportes/boletines/BoletinPeriodoGranColombiano'
  import BoletinPeriodoGustavoRojas from '@/views/reportes/boletines/BoletinPeriodoGustavoRojas'
  import BoletinPeriodoJulius from '@/views/reportes/boletines/BoletinPeriodoJulius'
  import BoletinPeriodoEmiliani from '@/views/reportes/boletines/BoletinPeriodoEmiliani'
  import BoletinPeriodo from '@/views/reportes/boletines/BoletinPeriodo'
  import BoletinPree from '@/views/reportes/boletines/BoletinPree'
  import BoletinPeriodoRetirado from '@/views/reportes/boletines/BoletinPeriodoRetirado'
  import BoletinPreeRetirado from '@/views/reportes/boletines/BoletinPreeRetirado'
  import BoletinPeriodoReubicado from '@/views/reportes/boletines/BoletinPeriodoReubicado'
  import BoletinPreeReubicado from '@/views/reportes/boletines/BoletinPreeReubicado'
  import BoletinPeriodoPromocionado from '@/views/reportes/boletines/BoletinPeriodoPromocionado'
  import BoletinPreePromocionado from '@/views/reportes/boletines/BoletinPreePromocionado'

  import BoletinPreeFinal from '@/views/reportes/boletines/BoletinPreeFinal'

  import BoletinFinalRural from '@/views/reportes/boletines/BoletinFinalRural'
  import BoletinFinalGranColombiano from '@/views/reportes/boletines/BoletinFinalGranColombiano'
  import BoletinFinal from '@/views/reportes/boletines/BoletinFinal'

  export default {
    name: 'boletines',
    components: {
      VueGoodTable,
      BoletinPeriodoInem,
      BoletinPeriodoGranColombiano,
      BoletinPeriodoGustavoRojas,
      BoletinPeriodoJulius,
      BoletinPeriodoEmiliani,
      BoletinPeriodo,
      BoletinPree,
      BoletinPeriodoRetirado,
      BoletinPreeRetirado,
      BoletinPeriodoReubicado,
      BoletinPreeReubicado,
      BoletinPeriodoPromocionado,
      BoletinPreePromocionado,
      BoletinPreeFinal,
      BoletinFinal,
      BoletinFinalRural,
      BoletinFinalGranColombiano,
    },
    data () {
      return {
        idBoletin: null,
        idSede: null,
        comboSedes: [],
        idPeriodo: null,
        comboPeriodos: null,
        idCurso: null,
        comboCursosSede: [],
        nombreSede: null,
        nombreCurso: null,
        nombrePeriodo: null,
        nombreJornada: null,
        nombreDirector: null,
        coordinador: null,
        idNivel: null,
        btnCargando: false,
        datosSeccion: {},
        encabColumnas: [
          { label: 'Apellidos y Nombres del Estudiante', field: 'nombre', sortable: false, tdClass: this.tdClassFuncE },
          { label: 'Estado', field: 'estado', sortable: false, tdClass: this.tdClassFuncE },
        ],
        estudiantesSeleccionados: [],
        datosEstudiantes: [],
        listaAreasAsignaturas: [],
        listaDescriptores: [],
        notas: [],
        periodosVisibles: [],
        mostrarBoletines: false,
        umbralesA: [],
        umbralesT: [],
        pesosPeriodos: [],
        tipoValComp: null,
        promCompor: null,
        firmasBoletin: null,
        escalaPreescolar: {},
        nuevaEscalaPreescolar: [],
        letrasCompor: [],
        descC1: null,
        descC2: null,
        descC3: null,
        listaReportes: [],
        idGrado: null,
        listaHabilitaciones: []
      }
    },
    methods: {
      procesarBoletinesFinales() {
        if (this.idNivel == 1 && (this.$store.state.idInstitucion == '17ee4f30-fc80-11ec-a1d1-1dc2835404e5' || this.$store.state.idInstitucion == '097b7b10-fcaa-11ec-8267-536b07c743c4' || this.$store.state.idInstitucion == '8a1bd1e0-fcb2-11ec-8267-536b07c743c4')) {
          this.listaReportes = []
          this.$refs.estudiantes.selectedRows.forEach(element => {
            this.listaReportes.push({ 'id': element.idMatricula, 'estudiante': element.nombre, 'pue': element.puesto, 'pro': element.promedio })
          })
          //console.log(JSON.stringify(this.listaReportes))
          let sede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
          let curso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
          let periodo = document.getElementById('periodo')[document.getElementById('periodo').selectedIndex].text
          let uri = "?datos=" + JSON.stringify(this.listaReportes) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + "&escudo=" + this.$store.state.escudoInstitucion + "&sede=" + sede + "&idCurso=" + this.idCurso + "&curso=" + curso + "&jornada=" + this.nombreJornada + "&director=" + this.nombreDirector + "&periodo=" + periodo + "&idPeriodo=" + this.idPeriodo + "&idIe=" + this.$store.state.idInstitucion + "&idNivel=" + this.idNivel + "&puesto=" + this.puesto +
          "&minBaj=" + this.$store.state.datosSecciones[0].minBaj + "&maxBaj=" + this.$store.state.datosSecciones[0].maxBaj + "&minBas=" + this.$store.state.datosSecciones[0].minBas + "&maxBas=" + this.$store.state.datosSecciones[0].maxBas + "&minAlt=" + this.$store.state.datosSecciones[0].minAlt + "&maxAlt=" + this.$store.state.datosSecciones[0].maxAlt + "&minSup=" + this.$store.state.datosSecciones[0].minSup + "&maxSup=" + this.$store.state.datosSecciones[0].maxSup
          let encoded = encodeURI(uri);
          //window.open("http://localhost/siedutunja/php/boletines/" + this.$store.state.daneInstitucion + "as.php" + encoded,"_blank")
          window.open("https://siedutunja.gov.co/php/boletines/" + this.$store.state.daneInstitucion + "as.php" + encoded,"_blank")
        } else {
          this.btnCargando = true
          this.mostrarBoletines = true
          this.estudiantesSeleccionados = this.$refs.estudiantes.selectedRows
          if (this.idPeriodo == 1) this.periodosVisibles = [1]
          if (this.idPeriodo == 2) this.periodosVisibles = [1,2]
          if (this.idPeriodo == 3) this.periodosVisibles = [1,2,3]
          if (this.idPeriodo == 4) this.periodosVisibles = [1,2,3,4]
          this.umbralesA = [this.datosSeccion.minBas,this.datosSeccion.minAlt,this.datosSeccion.minSup,this.datosSeccion.maxSup]
          this.umbralesT = [this.datosSeccion.minBasT,this.datosSeccion.minAltT,this.datosSeccion.minSupT,this.datosSeccion.maxSupT]
          this.pesosPeriodos = [this.datosSeccion.pesoP1,this.datosSeccion.pesoP2,this.datosSeccion.pesoP3,this.datosSeccion.pesoP4]
          this.tipoValComp = this.datosSeccion.tipoValComp
          this.promCompor = this.datosSeccion.promCompor
          this.escalaPreescolar = {I: this.datosSeccion.minBaj, B: this.datosSeccion.minBas, A: this.datosSeccion.minAlt, S: this.datosSeccion.maxSup}
          this.nuevaEscalaPreescolar = [
            {letra: this.datosSeccion.preeL1, umbral: this.datosSeccion.minBaj, desempeno: this.datosSeccion.preeC1},
            {letra: this.datosSeccion.preeL2, umbral: this.datosSeccion.minBas, desempeno: this.datosSeccion.preeC2},
            {letra: this.datosSeccion.preeL3, umbral: this.datosSeccion.minAlt, desempeno: this.datosSeccion.preeC3},
            {letra: this.datosSeccion.preeL4, umbral: this.datosSeccion.maxSup, desempeno: this.datosSeccion.preeC4},
          ]
          this.descC1 = this.datosSeccion.nombreC1 != '' && this.datosSeccion.nombreC1 != null ? this.datosSeccion.nombreC1.substr(0,3) : 'C1'
          this.descC2 = this.datosSeccion.nombreC2 != '' && this.datosSeccion.nombreC2 != null ? this.datosSeccion.nombreC2.substr(0,3) : 'C2'
          this.descC3 = this.datosSeccion.nombreC3 != '' && this.datosSeccion.nombreC3 != null ? this.datosSeccion.nombreC3.substr(0,3) : 'C3'
          this.letrasCompor = [this.datosSeccion.compL1,this.datosSeccion.compL2,this.datosSeccion.compL3,this.datosSeccion.compL4]
          if (this.$store.state.daneInstitucion === '115001002602') { // Sandoval
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>MARINA PEDRAZA CANARIA<br>Rectora</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '315001000293') { // Grancolombiano
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>JUAN CARLOS GONZÁLEZ GALINDO<br>Rector</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '115001002807') { // Gustavo Rojas
            let cordi = ''
            if (this.nombreSede == 'CLUB DE LEONES') {
              cordi = this.idGrado === '08' ? 'ELSA YOLANDA CASCANTE MOLINA' : 'CESAR MALPICA ROJAS'
            } else if (this.nombreSede == 'CENTRAL') {
              cordi = 'ELSA YOLANDA CASCANTE MOLINA'
            } else {
              cordi = 'GLORIA INES VARGAS AVENDAÑO'
            }
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${cordi}<br>Coordinador(a)</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '115001000367') { // Inem
            let cordi = ''
            if (this.nombreSede == 'SEDE PRINCIPAL') {
              cordi = '-'
            } else if (this.nombreSede == 'SEDE LAS AMERICAS') {
              cordi = '-'
            } else if (this.nombreSede == 'SEDE ANTONIO RICAURTE') {
              cordi = '-'
            } else {
              cordi = '-'
            }
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${cordi}<br>Coordinador(a)</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '115001002751') { // Julius
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>FLORIBERTO SANCHEZ SALAZAR<br>Rector</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '115001001061') { // Simon Bolivar
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>MARTHA CECILIA GARCIA MORENO<br>Rectora</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '215001001007') { // Rural
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>JULIO RICARDO ESTUPIÑÁN CÁCERES<br>Rector</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '315001001613') { // Emiliani
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>JENARO ANTONIO ESPITIA ORDOÑEZ<br>Rector</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '115001000065') { // Silvino
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>OMAR SANDOVAL FONSECA<br>Rector</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '115001000430') { // Santiago
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>MAURICIO FONSECA ALVAREZ<br>Rector</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '315001001893') { // Gonzalo Suarez
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>CAMILO GALÁN GALÁN<br>Coordinador</p>
                  </td>
                </tr>
              </table>
            `
          } else {  // Enslap
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                </tr>
              </table>
            `
          }
          setTimeout(()=>{
            this.btnCargando = false
          },500)
        }
      },
      procesarBoletines() {
        if (this.idNivel == 1 && (this.$store.state.idInstitucion == '17ee4f30-fc80-11ec-a1d1-1dc2835404e5' || this.$store.state.idInstitucion == '097b7b10-fcaa-11ec-8267-536b07c743c4' || this.$store.state.idInstitucion == '8a1bd1e0-fcb2-11ec-8267-536b07c743c4')) {
          this.listaReportes = []
          this.$refs.estudiantes.selectedRows.forEach(element => {
            this.listaReportes.push({ 'id': element.idMatricula, 'estudiante': element.nombre, 'pue': element.puesto, 'pro': element.promedio })
          })
          //console.log(JSON.stringify(this.listaReportes))
          let sede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
          let curso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
          let periodo = document.getElementById('periodo')[document.getElementById('periodo').selectedIndex].text
          let uri = "?datos=" + JSON.stringify(this.listaReportes) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + "&escudo=" + this.$store.state.escudoInstitucion + "&sede=" + sede + "&idCurso=" + this.idCurso + "&curso=" + curso + "&jornada=" + this.nombreJornada + "&director=" + this.nombreDirector + "&periodo=" + periodo + "&idPeriodo=" + this.idPeriodo + "&idIe=" + this.$store.state.idInstitucion + "&idNivel=" + this.idNivel + "&puesto=" + this.puesto +
          "&minBaj=" + this.$store.state.datosSecciones[0].minBaj + "&maxBaj=" + this.$store.state.datosSecciones[0].maxBaj + "&minBas=" + this.$store.state.datosSecciones[0].minBas + "&maxBas=" + this.$store.state.datosSecciones[0].maxBas + "&minAlt=" + this.$store.state.datosSecciones[0].minAlt + "&maxAlt=" + this.$store.state.datosSecciones[0].maxAlt + "&minSup=" + this.$store.state.datosSecciones[0].minSup + "&maxSup=" + this.$store.state.datosSecciones[0].maxSup
          let encoded = encodeURI(uri);
          //window.open("http://localhost/siedutunja/php/boletines/" + this.$store.state.daneInstitucion + "as.php" + encoded,"_blank")
          window.open("https://siedutunja.gov.co/php/boletines/" + this.$store.state.daneInstitucion + "as.php" + encoded,"_blank")
        } else {
          this.btnCargando = true
          this.mostrarBoletines = true
          this.estudiantesSeleccionados = this.$refs.estudiantes.selectedRows
          if (this.idPeriodo == 1) this.periodosVisibles = [1]
          if (this.idPeriodo == 2) this.periodosVisibles = [1,2]
          if (this.idPeriodo == 3) this.periodosVisibles = [1,2,3]
          if (this.idPeriodo == 4) this.periodosVisibles = [1,2,3,4]
          this.umbralesA = [this.datosSeccion.minBas,this.datosSeccion.minAlt,this.datosSeccion.minSup,this.datosSeccion.maxSup]
          this.umbralesT = [this.datosSeccion.minBasT,this.datosSeccion.minAltT,this.datosSeccion.minSupT,this.datosSeccion.maxSupT]
          this.pesosPeriodos = [this.datosSeccion.pesoP1,this.datosSeccion.pesoP2,this.datosSeccion.pesoP3,this.datosSeccion.pesoP4]
          this.tipoValComp = this.datosSeccion.tipoValComp
          this.promCompor = this.datosSeccion.promCompor
          this.escalaPreescolar = {I: this.datosSeccion.minBaj, B: this.datosSeccion.minBas, A: this.datosSeccion.minAlt, S: this.datosSeccion.maxSup}
          this.nuevaEscalaPreescolar = [
            {letra: this.datosSeccion.preeL1, umbral: this.datosSeccion.minBaj, desempeno: this.datosSeccion.preeC1},
            {letra: this.datosSeccion.preeL2, umbral: this.datosSeccion.minBas, desempeno: this.datosSeccion.preeC2},
            {letra: this.datosSeccion.preeL3, umbral: this.datosSeccion.minAlt, desempeno: this.datosSeccion.preeC3},
            {letra: this.datosSeccion.preeL4, umbral: this.datosSeccion.maxSup, desempeno: this.datosSeccion.preeC4},
          ]
          this.descC1 = this.datosSeccion.nombreC1 != '' && this.datosSeccion.nombreC1 != null ? this.datosSeccion.nombreC1.substr(0,3) : 'C1'
          this.descC2 = this.datosSeccion.nombreC2 != '' && this.datosSeccion.nombreC2 != null ? this.datosSeccion.nombreC2.substr(0,3) : 'C2'
          this.descC3 = this.datosSeccion.nombreC3 != '' && this.datosSeccion.nombreC3 != null ? this.datosSeccion.nombreC3.substr(0,3) : 'C3'
          this.letrasCompor = [this.datosSeccion.compL1,this.datosSeccion.compL2,this.datosSeccion.compL3,this.datosSeccion.compL4]
          if (this.$store.state.daneInstitucion === '115001002602') { // Sandoval
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>MARINA PEDRAZA CANARIA<br>Rectora</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '315001000293') { // Grancolombiano
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>JUAN CARLOS GONZÁLEZ GALINDO<br>Rector</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '115001002807') { // Gustavo Rojas
            let cordi = ''
            if (this.nombreSede == 'CLUB DE LEONES') {
              cordi = this.idGrado === '08' ? 'ELSA YOLANDA CASCANTE MOLINA' : 'CESAR MALPICA ROJAS'
            } else if (this.nombreSede == 'CENTRAL') {
              cordi = 'ELSA YOLANDA CASCANTE MOLINA'
            } else {
              cordi = 'GLORIA INES VARGAS AVENDAÑO'
            }
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${cordi}<br>Coordinador(a)</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '115001000367') { // Inem
            let cordi = ''
            if (this.nombreSede == 'SEDE PRINCIPAL') {
              cordi = '-'
            } else if (this.nombreSede == 'SEDE LAS AMERICAS') {
              cordi = '-'
            } else if (this.nombreSede == 'SEDE ANTONIO RICAURTE') {
              cordi = '-'
            } else {
              cordi = '-'
            }
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${cordi}<br>Coordinador(a)</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '115001002751') { // Julius
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>FLORIBERTO SANCHEZ SALAZAR<br>Rector</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '115001001061') { // Simon Bolivar
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>MARTHA CECILIA GARCIA MORENO<br>Rectora</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '215001001007') { // Rural
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>JULIO RICARDO ESTUPIÑÁN CÁCERES<br>Rector</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '315001001613') { // Emiliani
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>JENARO ANTONIO ESPITIA ORDOÑEZ<br>Rector</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '115001000065') { // Silvino
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>OMAR SANDOVAL FONSECA<br>Rector</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '115001000430') { // Santiago
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>MAURICIO FONSECA ALVAREZ<br>Rector</p>
                  </td>
                </tr>
              </table>
            `
          } else if (this.$store.state.daneInstitucion === '315001001893') { // Gonzalo Suarez
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                  <td style="width: 50%;">
                    <p>________________________________________<br>CAMILO GALÁN GALÁN<br>Coordinador</p>
                  </td>
                </tr>
              </table>
            `
          } else {  // Enslap
            this.firmasBoletin = `
              <table class="firmas" style="width: 100%;">
                <tr>
                  <td style="width: 50%;">
                    <p>________________________________________<br>${this.nombreDirector}<br>Director(a) de Curso</p>
                  </td>
                </tr>
              </table>
            `
          }
          setTimeout(()=>{
            this.btnCargando = false
          },500)
        }
      },
      async consultarNotas() {
        this.notas = []
        if (this.idBoletin == 1) {
          await axios
          .get(CONFIG.ROOT_PATH + 'boletines/notas/curso/periodo', {params: {idCurso: this.idCurso, periodo: this.idPeriodo, vigencia: this.$store.state.aLectivo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Notas boletines curso periodo')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.notas = response.data.datos
                //console.log(JSON.stringify(this.notas))
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Notas boletines curso periodo. Intente más tarde.' + err)
            this.btnCargando = false
          })
        } else if (this.idBoletin == 2) { //RETIRADOS
          await axios
          .get(CONFIG.ROOT_PATH + 'boletines/notas/curso/periodo/retirados', {params: {idCurso: this.idCurso, periodo: this.idPeriodo, vigencia: this.$store.state.aLectivo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Notas boletines curso periodo')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.notas = response.data.datos
                //console.log(JSON.stringify(this.notas))
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Notas boletines curso periodo. Intente más tarde.' + err)
            this.btnCargando = false
          })
        } else if (this.idBoletin == 3) { //UBICADOS - REUBICADOS
          await axios
          .get(CONFIG.ROOT_PATH + 'boletines/notas/curso/periodo/reubicados', {params: {idCurso: this.idCurso, periodo: this.idPeriodo, vigencia: this.$store.state.aLectivo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Notas boletines curso periodo')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.notas = response.data.datos
                //console.log(JSON.stringify(this.notas))
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Notas boletines curso periodo. Intente más tarde.' + err)
            this.btnCargando = false
          })
        } else if (this.idBoletin == 4) { //PROMOCIONADO ANTICIPADAMENTE
          await axios
          .get(CONFIG.ROOT_PATH + 'boletines/notas/curso/periodo/promocionados', {params: {idCurso: this.idCurso, periodo: this.idPeriodo, vigencia: this.$store.state.aLectivo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Notas boletines curso periodo')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.notas = response.data.datos
                //console.log(JSON.stringify(this.notas))
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Notas boletines curso periodo. Intente más tarde.' + err)
            this.btnCargando = false
          })
        } else if (this.idBoletin == 10) {
          let apiRuta = 0
          if (this.$store.state.idInstitucion == '660fa760-fc83-11ec-a1d1-1dc2835404e5') {  // Gran Colombiano
            this.idPeriodo = 4
            apiRuta = 'boletines/notas/curso/finales/acumulado'
          }
          else {
            this.idPeriodo = 4
            apiRuta = 'boletines/notas/curso/finales/acumulado'
          }
          await axios
          .get(CONFIG.ROOT_PATH + apiRuta, {params: {idCurso: this.idCurso, periodo: this.idPeriodo, vigencia: this.$store.state.aLectivo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Notas boletines curso periodo')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.notas = response.data.datos
                //console.log(JSON.stringify(this.notas))
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Notas boletines curso periodo. Intente más tarde.' + err)
            this.btnCargando = false
          })
        }
      },
      async consultarAreasAsignaturas() {
        this.listaAreasAsignaturas = []
        await axios
        .get(CONFIG.ROOT_PATH + 'boletines/areasasignaturas/curso', {params: {idCurso: this.idCurso}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista areas-asignaturas curso')
            this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              this.listaAreasAsignaturas = response.data.datos
              //console.log(JSON.stringify(this.listaAreasAsignaturas))
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista areas-asignaturas curso. Intente más tarde.' + err)
          this.btnCargando = false
        })
      },
      async consultarDescriptores() {
        this.listaDescriptores = []
        await axios
        .get(CONFIG.ROOT_PATH + 'boletines/descriptores/curso', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista descriptores curso')
            this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              this.listaDescriptores = response.data.datos
              //console.log(JSON.stringify(this.listaDescriptores))
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista descriptores curso. Intente más tarde.' + err)
          this.btnCargando = false
        })
      },
      async consultarEstudiantes() { 
        this.btnCargando = true
        if (this.idCurso != null) { 
          this.$store.state.datosCursos.forEach(element => {
            if (element.id == this.idCurso) {
              this.nombreJornada = element.jornada
              this.nombreDirector = element.docente
              this.idNivel = element.id_nivel
              this.idGrado = element.id_grado
            }
          })
          this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
          this.nombreCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
          this.idBoletin == 10 ? this.nombrePeriodo = 'DEFINITIVO' : this.nombrePeriodo = document.getElementById('periodo')[document.getElementById('periodo').selectedIndex].text
          this.datosEstudiantes = []
          let apiRuta = 0
          if (this.idBoletin == 1) apiRuta = 'boletines/listacurso/boletines'
          else if (this.idBoletin == 2) apiRuta = 'boletines/listacurso/boletines/retirados'
          else if (this.idBoletin == 3) apiRuta = 'boletines/listacurso/boletines/reubicados'
          else if (this.idBoletin == 4) apiRuta = 'boletines/listacurso/boletines/promocionados'
          else if (this.idBoletin == 10) apiRuta = 'boletines/listacurso/boletines'
          await axios
          .get(CONFIG.ROOT_PATH + apiRuta, { params: { idCurso: this.idCurso, vigencia: this.$store.state.aLectivo }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Lista Curso')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.datosEstudiantes = response.data.datos
                //console.log(JSON.stringify(this.datosEstudiantes))
                if (this.idNivel == 1 && this.$store.state.idInstitucion == '17ee4f30-fc80-11ec-a1d1-1dc2835404e5') {
                  this.btnCargando = false
                } else {
                  this.consultarNotas()
                  this.consultarAreasAsignaturas()
                  this.consultarHabilitaciones()
                  //this.consultarDescriptores()
                }
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Curso. Intente más tarde.' + err)
            this.btnCargando = false
          })
        }
        //console.log(JSON.stringify(this.datosEstudiantes))
        this.btnCargando = false
      },
      consultarHabilitaciones() {
        this.listaHabilitaciones = []
        axios
        .get(CONFIG.ROOT_PATH + 'boletines/habilitaciones/curso', {params: {vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta habilitacion')
            this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              this.listaHabilitaciones = response.data.datos
              //console.log(JSON.stringify(response.data.datos))
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta habilitacion. Intente más tarde.' + err)
        })
      },
      async ocuparComboCursosSede() {
        this.comboCursosSede = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.comboCursosSede.push({ 'value': element.id, 'text': element.nomenclatura.toUpperCase() })
          }
        })
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      async ocuparComboPeriodos() {
        this.comboPeriodos = []
        this.$store.state.periodos.forEach(element => {
          this.comboPeriodos.push({ 'value': element.id, 'text': element.periodo.toUpperCase() })
        })
      },
      tdClassFuncE(row) {
        if (row.id_estado_actual == 2) { 
          return 'text-danger' 
        }
        if (row.id_estado_actual == 3 || row.id_estado_actual == 4) { 
          return 'text-warning' 
        }
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.ocuparComboSedes()
      this.ocuparComboPeriodos()
      this.datosSeccion = this.$store.state.datosSecciones[this.$store.state.idSeccion - 1]
      //console.log(JSON.stringify(this.datosSeccion))
    }
  }
</script>