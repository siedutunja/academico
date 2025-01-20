<template>
  <CDropdown inNav class="c-header-nav-items" add-menu-classes="pt-0">
    <template #toggler>
      <CHeaderNavLink>
        <CIcon name="cilApps"/>Pei
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center text-light" color="dark">
      <strong>Plan Educativo Institucional</strong>
    </CDropdownHeader>
    <CDropdownItem to="/configuracion/gradossedeie">
      <CIcon name="cilDialpad" />Grados
    </CDropdownItem>
    <CDropdownItem to="/configuracion/cursosgrado">
      <CIcon name="cilBlurLinear" />Cursos
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem to="/configuracion/listaareas">
      <CIcon name="cilList" />Areas
    </CDropdownItem>
    <CDropdownItem to="/configuracion/listaasignaturas">
      <CIcon name="cilListRich" />Asignaturas
    </CDropdownItem>
    <CDropdownItem to="/configuracion/planestudios">
      <CIcon name="cilBraille" />Plan de Estudios por Grado
    </CDropdownItem>
    <!--
    <CDropdownDivider/>
    <CDropdownItem to="infoinstitucional">
      <CIcon name="cilBuilding" />Datos Generales de la IE
    </CDropdownItem>
    <CDropdownItem to="/configuracion/nuevavigencia" v-if="$store.state.idRol == 1">
      <CIcon name="cilBuilding" />Habilitar Nuevo Año Lectivo
    </CDropdownItem>
    -->
  </CDropdown>
</template>

<script>
  export default {
    name: 'MenuPei',
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