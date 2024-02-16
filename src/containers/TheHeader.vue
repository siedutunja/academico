<template>
  <CHeader fixed with-subheader light>
    <CToggler in-header class="ml-3 d-lg-none" @click="$store.commit('toggleSidebarMobile')"/>
    <CToggler in-header class="ml-3 d-md-down-none" @click="$store.commit('toggleSidebarDesktop')"/>
    <CHeaderBrand class="mx-auto d-lg-none" to="/inicio">
      <CIcon src="logo_header_movil.png" name="logo" height="40" alt="Logo"/>
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-1">
        <CHeaderNavLink to="/inicio">
          <CIcon name="cil-home" style="margin-right: 0.3rem;" />Inicio
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-1" v-if="$store.state.idRol == 5">
        <CHeaderNavLink>
          <MenuConfiguracion/>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-1">
        <CHeaderNavLink>
          <MenuManuales/>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-1">
        <CHeaderNavLink>
          <CIcon name="cil-bell"/>
          <CBadge color="danger" class="ml-2">{{ itemsCount }}</CBadge>
        </CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-user" class="mr-1"/>{{ $store.state.nombreUsuario }} {{ $store.state.apellidoUsuario }} - {{ $store.state.nemoRol }}
        </CHeaderNavLink>
      </CHeaderNavItem>
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
    <!--
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader>
    -->
  </CHeader>
</template>

<script>
  import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
  import MenuConfiguracion from './MenuConfiguracion'
  import MenuManuales from './MenuManuales'

  export default {
    name: 'TheHeader',
    components: {
      TheHeaderDropdownAccnt,
      MenuConfiguracion,
      MenuManuales
    },
    data () {
      return { 
        itemsCount: 1
      }
    }
  }
</script>
