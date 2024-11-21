<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            :src="$store.state.foto"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center text-light" color="dark">
      <strong>Cuenta del Usuario</strong>
    </CDropdownHeader>
    <CDropdownItem to="/perfiles/perfilusuario" v-if="$store.state.idRol != 12">
      <CIcon name="cil-user" /> Datos Usuario
    </CDropdownItem>
    <CDropdownItem to="/perfiles/cambioclave">
      <CIcon name="cilShieldAlt" /> Cambiar Contraseña
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem @click="cerrarSesion">
      <CIcon name="cil-lock-locked" /> Cerrar Sesión
    </CDropdownItem>
  </CDropdown>
</template>

<script>
  import * as CONFIG from '@/assets/config.js'

  export default {
    name: 'TheHeaderDropdownAccnt',
    data () {
      return { 
        itemsCount: 1
      }
    },
    methods: {
      cerrarSesion() {
        this.$bvModal.msgBoxConfirm('¿Esta seguro de terminar la sesión?', {
          headerBgVariant: 'primary',
          headerTextVariant: 'light',
          bodyBgVariant: 'light',
          bodyBgClass: 'text-center',
          title: 'Cerrar Sesión',
          size: '',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'Si, quiero terminar la sesión',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          bodyClass: 'p-5',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            sessionStorage.clear()
            location.replace(CONFIG.ROOT_WEBSITE)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>