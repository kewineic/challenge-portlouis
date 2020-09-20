Vue.component('App', {
  template: `
    <v-app>
      <c-header>
        <template v-slot:default>
          <v-toolbar-title>Desafio Portlouis</v-toolbar-title>
        </template>
      </c-header>

      <v-main> 
        <v-container> 
          <c-dataTable />
        </v-container>
      </v-main>

      <c-footer> 
        <template v-slot:text-footer>
          Desafio para a empresa Portlouis utilizando VueJs, VueX e Vuetify.
        </template>

        <template v-slot:copyright-footer>
          {{getDate()}} — <strong>Kewin Costa</strong>
        </template>
      </c-footer>

    </v-app>
  `,
  
  mixins: [getDateMixin]
});