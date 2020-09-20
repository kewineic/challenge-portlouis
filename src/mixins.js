const getDateMixin = {
  methods: {
    getDate() {
      return new Date().getFullYear()
    }
  }
}

const stringValidators = {
  methods: {
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
}