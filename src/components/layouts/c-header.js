Vue.component('c-header', {
  template: `
    <v-app-bar
      hide-on-scroll
      app
      dark
      color="primary"
    >
    <slot></slot>

    </v-app-bar>
  `
});