<template>
  <CDropdown inNav class="c-header-nav-items" add-menu-classes="pt-0">
    <template #toggler>
      <CHeaderNavLink>
        <CIcon name="cilSettings"/>Configuración
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center text-light" color="dark">
      <strong>Configuración del Sistema</strong>
    </CDropdownHeader>
    <CDropdownItem to="/configuracion/especialidadesie">
      <CIcon name="cilTag" />Especialidades
    </CDropdownItem>
    <CDropdownItem to="/configuracion/rutasie">
      <CIcon name="cilLocationPin" />Rutas
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem to="/configuracion/sedesie">
      <CIcon name="cilBuilding" />Sedes
    </CDropdownItem>
    <CDropdownItem to="/configuracion/seccionesie">
      <CIcon name="cilBank" />Secciones
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem to="/configuracion/configurardocumentos">
      <CIcon name="cilLayers" />Personalizar Documentos
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem to="/administrativos/listaadministrativos">
      <CIcon name="cilGroup" />Gestión de Personal Administrativo
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem to="/configuracion/criteriosevaluacion">
      <CIcon name="cilGroup" />Criterios de Evaluación
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem to="/configuracion/configurarconsultaacudiente">
      <CIcon name="cilGroup" />Consulta Boletines por los Acudientes
    </CDropdownItem>
    <!--
    <CDropdownItem to="infoinstitucional">
      <CIcon name="cilBuilding" />Datos Generales de la IE
    </CDropdownItem>
    <CDropdownItem to="/configuracion/nuevavigencia" v-if="$store.state.idRol == 1">
      <CIcon name="cilBuilding" />Habilitar Nuevo Año Lectivo
    </CDropdownItem>
    -->
    <div v-if="$store.state.idRol == 1">
      <CDropdownDivider/>
      <CDropdownItem to="/configuracion/superadmin">
        <CIcon name="cilSpeedometer" />Super Administrador
      </CDropdownItem>
    </div>
  </CDropdown>
</template>

<script>
  export default {
    name: 'MenuConfiguracion',
    data () {
      return { 
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>