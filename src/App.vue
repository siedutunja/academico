<template>
  <div>
    <ModalIdle v-if="isIdle" />
    <router-view />
  </div>
</template>

<script>
  import ModalIdle from "@/views/componentes/ModalIdle.vue"

  export default {
    name: 'App',
    components: {
      ModalIdle
    },
    data () {
      return {
      }
    },
    methods: {
      iniciarVista() {
        this.$router.push('/bienvenida')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
      isIdle() {
        return this.$store.state.idleVue.isIdle
      }
    },
    beforeMount() {
      this.iniciarVista()
    }
  }
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';

  .encabezadoVista {
    background: rgb(210, 237, 100);
    margin-top: 0;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  }
</style>
