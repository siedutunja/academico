<template>
  <CDropdown inNav class="c-header-nav-items" add-menu-classes="pt-0">
    <template #toggler>
      <CHeaderNavLink>
        <CIcon name="cilBlur"/>Gestión
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center text-light" color="dark">
      <strong>Gestión del Sistema</strong>
    </CDropdownHeader>
    <CDropdownItem to="/administrativos/listaadministrativos" v-if="$store.state.idRol == 1 || $store.state.idRol == 12">
      <CIcon name="cilGroup" />Personal Administrativo
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem to="/docentes/listadocentes" v-if="$store.state.idRol == 1 || $store.state.idRol == 12">
      <CIcon name="cilGroup" />Docentes
    </CDropdownItem>
  </CDropdown>
</template>

<script>
  export default {
    name: 'menugestion',
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