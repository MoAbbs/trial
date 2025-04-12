
export default {
  type: 'postProcessor',
  name: 'Trimming',
  process: function(value, key, options, translator) {
    /* return manipulated value */
    // debugger
    // if(translator.language == "en"){
    //   return key[0];
    // }
    const word = key[0];
    const lower = word.replace(/\s+/g, ' ').trim().toLowerCase()
    if(lower == 'slibrary file'){
      // console.log(word, lower)
    }
    if(word != lower){
      const trans = translator.translate(lower, options)
      if(trans == lower){
        return value
      }
      return trans
    }
    return value;
  }
}