Vue.component('c-footer', {
    template: `
      <v-footer
        dark
        color="primary"
      >
        <v-container>
          <v-card
            flat
            tile
            class="indigo white--text text-center"
            color="primary"
          >

            <v-card-text class="white--text pt-0">
              <slot name="text-footer"> </slot >
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text color="black" class="white--text">
              <slot name="copyright-footer"> </slot >
            </v-card-text>
          </v-card>
        </v-container>
      </v-footer>
    `
});
