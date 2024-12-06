<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="book" aria-hidden="true"></b-icon> MANUALES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <h5>
                  <ul>
                    <li class="mt-3"><a href="https://siedutunja.gov.co/manuales/academico/ManualLogin_1.pdf" target="_blank"> Manual de Ingreso al Sistema</a></li>
                    <li class="mt-3"><a href="https://siedutunja.gov.co/manuales/academico/ManualAdmon_1.pdf" target="_blank"> Manual Administrador del Sistema</a></li>
                  </ul>
                </h5>
                
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Haga clic sobre el manual a consultar.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: 'manuales',
    components: {
    },
    data () {
      return {

      }
    },
    methods: {
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
    }
  }
</script>