export default ()=>{
  String.prototype.toTitle = function(){
    return this.replace(/(\_)/g, ' ').replace(/\b(\w)/g, s => s.toUpperCase())
  }
}