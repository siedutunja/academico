<template>
  <CDropdown inNav class="c-header-nav-items" add-menu-classes="pt-0">
    <template #toggler>
      <CHeaderNavLink>
        <CIcon name="cilBank"/>Sección
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center text-light" color="dark">
      <strong>Cambiar de Sección</strong>
    </CDropdownHeader>
    <div v-for="item in listaSecciones" :key="item.id">
      <CDropdownItem v-if="item.id_seccion != $store.state.idSeccion" @click="cambiarSeccion(item)">
        <CIcon name="cilBank" /> {{item.seccion}}
      </CDropdownItem>
    </div>
  </CDropdown>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'

  export default {
    name: 'MenuSecciones',
    data () {
      return { 
        listaSecciones: this.$store.state.datosSecciones
      }
    },
    methods: {
      cambiarSeccion(item) {
        let titulo = 'Cambiar de Sección'
        let pregunta = '¿Esta seguro que desea cambiar a la Sección ' + item.seccion + '?'
        this.$bvModal.msgBoxConfirm(pregunta, {
          headerBgVariant: 'primary',
          headerTextVariant: 'light',
          bodyBgVariant: 'light',
          bodyBgClass: 'text-center',
          title: titulo,
          size: '',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'Si, ' + titulo,
          cancelVariant: 'danger',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          bodyClass: 'p-5',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            sessionStorage.setItem('idSeccion', item.id_seccion)
            this.$store.commit('set', ['idSeccion', item.id_seccion])
            this.$store.commit('set', ['nombreSeccion', item.seccion])
            //this.cargarDatosSedes()
            this.$router.push('/bienvenida')
          }
        })
        return true
      },
      /*
      async cargarDatosSedes() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/carguesedes', {params: {idInstitucion: this.$store.state.idInstitucion, idSeccion: this.$store.state.idSeccion}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Sedes Activas')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosSedes', response.data.datos])
              this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Se ha cambiado de Sección correctamente.')
            } else {
              this.$store.commit('set', ['datosSedes', []])
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Sedes Activas. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      */
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    }
  }
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>