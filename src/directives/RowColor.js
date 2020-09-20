Vue.directive('row-blue', {
  // Quando o elemento vinculado é inserido no DOM...
  bind: function (el, binding="false") {
    if(binding.value){
      el.style="border-bottom: 1px solid rgba(83, 51, 237, 1);"
    }
  }
})