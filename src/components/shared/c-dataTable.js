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
                            v-mask="inputRules.telephone"
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
                  <v-btn color="blue darken-1" text @click="savedData">Save</v-btn>
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
            <tr :key="contact.telephone" v-for="(contact, index) in savedContacts">
            
              <td :key="index" v-for="(tdValue, index) of contact" v-row-blue="changeRowColor(contact.telephone)">
                {{tdValue}}
              </td>

              <td v-row-blue="changeRowColor(contact.telephone)"> 
                <v-icon                                         
                  small
                  class="mr-1"
                  @click="editRowTable(index)"
                  
                >
                  mdi-pencil
                </v-icon>
        
                <v-icon
                  small
                  @click="removeContact(index)"
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
        nameRule: [ v => this.stringValidator(v, /^((\b[A-zÀ-ú']{3,40}\b)\s*){2,}$/g) || "Seu nome deve conter o mínimo de duas palavras com 3 letras cada!" ],
        telephoneRule: [ v => this.stringValidator(v, /^\([0-9]{2}\) [0-9]?[0-9]{4}-[0-9]{4}$/) || "Seu telefone de ser no seguinte formato: (##) (#####-####)"]
      },
      inputRules: {
        telephone: '(##) #####-####'
      },
      tableTitle: 'Contatos',
      thValues: [
        'Nome',
        'Telefone',
        'Ações'
      ],
      savedContacts: []
    }
  },

  computed: {
    dialogTitle: function() { 
      return this.isEditingData.value ? 'Dados para editar contato' : 'Dados para novo contato'
    }
  },
  
  watch: {
  },
  
  methods: {

    closeDialog() { 
      this.isRegisterData = false;
      this.isEditingData.value = false;
      this.clearForm();
      return this.dialog = false;
    },

    registerContact() {
      this.dialog = true;
      return this.isRegisterData = true;
    },

    savedData() {
      if(this.$refs.form.validate()){
        

        if(this.isEditingData.value) { 
          this.savedContacts.splice(this.isEditingData.index, 1, {...this.contactData});
        } else {
          this.savedContacts.push({...this.contactData});
        }
        this.isEditingData.value = false;
        this.isRegisterData = false;
        this.clearForm();
        this.submitForm();
        return this.dialog = false;
      }
    },

    submitForm() {
      
    },

    editRowTable(index) {
      this.dialog = true;
      this.contactData = {...this.savedContacts[index]}
      return this.isEditingData = {
        value: true,
        index
      }
    },

    removeContact(index) {
      this.savedContacts.splice(index, 1);
    },

    clearForm() {
      this.contactData = {
        name: '',
        telephone: ''
      }
    },

    changeRowColor(verifiedValue){
      let isChange = this.dddValidator(verifiedValue, '(11)');
      return isChange ? true : false;
    },

    stringValidator(string, regex){
      let str = string;
      return ( str.search(regex) === -1 ) ? false : true
    },

    dddValidator(compared, comparator) {
      if (!this.stringValidator(compared, /\(\d{2}\)/g)) return false

      let regexp = new RegExp(/\(\d{2}\)/g);
      let dddValue = regexp.exec(compared)[0];
      return dddValue === comparator ? true : false 
    }
  }

});