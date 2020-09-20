Vue.component('c-dataTable', {
  template: `
    <div>
      <v-simple-table
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title> {{tableTitle}} </v-toolbar-title> 

            <v-divider
              class="mx-4"
              inset
              vertical
            >
            </v-divider>
            
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"                                 
                  dark
                  v-on="on"
                  @click="registerContact"
                >
                {{registerButtonName}}
                </v-btn>
              </template>
              
              <v-card>
                <v-card-title>
                  <span class="headline">{{dialogTitle}}</span>
                </v-card-title>

                <v-card-text>
                
                  <v-container> 
                    <v-form  ref="form">
                      <v-row>
                        <v-col cols="12">

                          <v-text-field 
                            label="Nome"
                            v-model="contactData.name"
                            :rules="rules.nameRule"
                          />

                          <v-text-field
                            label="Telefone" 
                            v-model="contactData.telephone"
                            v-mask="masks.telephoneMask"
                            :rules="rules.telephoneRule"
                          />
                          
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>

                </v-card-text>
                
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
                  <v-btn color="blue darken-1" text @click="submitForm">Save</v-btn>
                </v-card-actions>

              </v-card>
            </v-dialog>

          </v-toolbar>
        </template>

        <template v-slot:default>
          <thead>       
            <tr>
              <th :key="index" v-for="(thName, index) of thValues" class="text-left">{{thName}}</th>
            </tr>
          </thead>
          
          <tbody>
            <tr :key="contact.telephone" v-for="(contact, index) in readContactData">
            
              <td :key="index" v-for="(tdValue, index) of contact" v-row-blue="changeTableRowColor(contact.telephone)">
                {{tdValue}}
              </td>

              <td v-row-blue="changeTableRowColor(contact.telephone)"> 
                <v-icon                                         
                  small
                  class="mr-1"
                  @click="editRowTable(index)"
                  
                >
                  mdi-pencil
                </v-icon>
        
                <v-icon
                  small
                  @click="removeRowTable(index)"
                >
                  mdi-delete
                </v-icon>
              </td>
            </tr>
          </tbody>
        </template>

      </v-simple-table>
    </div>
    
  `,

  data() {
    return{
      dialog: false,
      isRegisterData: false,
      isEditingData: {
        value: false,
        index: ''
      }, 
      registerButtonName: 'Novo Cadastro',
      contactData: {
        name: '',
        telephone: ''
      },
      rules: {
        nameRule: [ v => this.stringValidator(v, /^((\b[A-zÀ-ú']{3,40}\b)\s*){2,}$/g) || "Seu nome deve conter o mínimo de duas palavras e pelo menos 3 letras cada (nome ou sobrenome)!" ],
        telephoneRule: [ v => this.stringValidator(v, /^\([0-9]{2}\) [0-9]?[0-9]{4}-[0-9]{4}$/) || "Seu telefone de ser no seguinte formato: (##) (#####-####)"]
      },
      masks: {
        telephoneMask: '(##) #####-####'
      },
      tableTitle: 'Contatos',
      thValues: [
        'Nome',
        'Telefone',
        'Ações'
      ]
    }
  },

  mixins: [ stringValidators ],

  computed: {
    dialogTitle: function() { 
      return this.isEditingData.value ? 'Dados para editar contato' : 'Dados para novo contato'
    },

    ...Vuex.mapGetters([ 'readContactData' ])
  },

  methods: {
    ...Vuex.mapActions([ 
      'includeContactData', 
      'updateContactData', 
      'deleteContactData' 
    ]),

    registerContact() {
      this.dialog = true;
      return this.isRegisterData = true
    },

    closeDialog() { 
      this.isRegisterData = false;
      this.isEditingData.value = false;
      this.clearForm();
      return this.dialog = false
    },

    validateForm() {
      return this.$refs.form.validate()
    },

    submitForm() {
      if(this.validateForm()){

        if(this.isEditingData.value) { 
          this.updateContactData({index: this.isEditingData.index, data: this.contactData});
        } else {
          this.includeContactData({...this.contactData});
        }

        this.closeDialog()
      }

      return
    },

    editRowTable(index) {
      this.dialog = true;
      this.contactData = {...this.readContactData[index]}
      return this.isEditingData = {
        value: true,
        index
      }
    },

    removeRowTable(index) {
      return this.deleteContactData(index)
    },

    clearForm() {
      return this.contactData = {
        name: '',
        telephone: ''
      }
    },

    changeTableRowColor(verifiedValue){
      let isChange = this.dddValidator(verifiedValue, '(11)');
      return isChange ? true : false
    }
  }

});