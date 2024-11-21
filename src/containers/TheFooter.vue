<template>
  <CFooter :fixed="false">
    <div>
      <CIcon name="cil-shield-alt" style="margin-top: -5px" />
      {{ this.pie }}
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank"></span>
      <a href="https://www.siedutunja.gov.co/" target="_blank">{{ this.proyecto }}</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} - Ver: {{ version }}</span>
    </div>
  </CFooter>
</template>

<script>
  import { version,description } from '@/../package.json'
  export default {
    name: 'TheFooter',
    data () {
      return {
        pie: this.$store.state.nombreInstitucion,
        proyecto: description,
        version: version
      }
    },
    methods: {
    },
    beforeMount() {
    }
  }
</script>
