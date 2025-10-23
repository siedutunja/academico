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
      <CHeaderNavItem class="px-1" v-if="$store.state.idRol == 1 || $store.state.idRol == 12">
        <CHeaderNavLink>
          <MenuPei/>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-1">
        <CHeaderNavLink>
          <MenuSecciones/>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-1" v-if="$store.state.idRol == 1 || $store.state.idRol == 12">
        <CHeaderNavLink>
          <MenuConfiguracion/>
        </CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-calendar"/><span class="ml-2 text-primary"><strong @click="cambiarVigencia">AÑO LECTIVO {{ $store.state.aLectivo }}</strong></span><span class="mx-3">|</span>
          <CIcon name="cil-user" class="mr-1"/>{{ $store.state.nombreUsuario }} {{ $store.state.apellidoUsuario }} - {{ $store.state.nemoRol }}
        </CHeaderNavLink>
      </CHeaderNavItem>
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader>
  </CHeader>
</template>

<script>
  import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
  import MenuPei from './MenuPei'
  import MenuConfiguracion from './MenuConfiguracion'
  import MenuGestion from './MenuGestion'
  import MenuSecciones from './MenuSecciones'

  export default {
    name: 'TheHeader',
    components: {
      TheHeaderDropdownAccnt,
      MenuPei,
      MenuConfiguracion,
      MenuGestion,
      MenuSecciones
    },
    data () {
      return { 
        itemsCount: 1
      }
    },
    methods: {
      cambiarVigencia() {
        this.$bvModal.msgBoxConfirm('Desea cambiar de Año Lectivo?', {
          headerBgVariant: 'primary',
          headerTextVariant: 'light',
          bodyBgVariant: 'light',
          bodyBgClass: 'text-center',
          title: 'Cambiar Año Lectivo',
          size: '',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'Si, Cambiar de Año Lectivo',
          cancelVariant: 'danger',
          cancelTitle: 'Cancelar',
          bodyClass: 'p-5',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.$router.push('/bienvenida')
          }
        })
      }
    }
  }
</script>
