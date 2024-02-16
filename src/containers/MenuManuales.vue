<template>
  <CDropdown inNav class="c-header-nav-items" add-menu-classes="pt-0">
    <template #toggler>
      <CHeaderNavLink>
        <CIcon name="cilBook"/>Manuales
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="dark"></CDropdownHeader>
    <CDropdownItem  @click="guia34">
      <CIcon name="" />Guia 34 PMI
    </CDropdownItem>
    <!--
    <CDropdownDivider/>
    <CDropdownItem to="/usuarios/usuariossec">
      <CIcon name="cilUserFollow" />Usuarios Secretaría
    </CDropdownItem>
    <CDropdownItem to="/planeacion/actividadespa">
      <CIcon name="cilList" />Menu 4
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem to="/planeacion/gestionpa">
      <CIcon name="cilBlur" />Menu 5
    </CDropdownItem>
    -->
  </CDropdown>
</template>

<script>
  export default {
    name: 'MenuGestion',
    data () {
      return { 
      }
    },
    methods: {
      guia34() {
        let ruta = "https://siedutunja.gov.co/manuales/Guia_34_PMI.pdf"
        window.open(ruta, '_blank')
      }
    }
  }
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>