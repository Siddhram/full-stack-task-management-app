function hastoken(){
    if(JSON.parse(localStorage.getItem('token'))){
        return true;
    }
   return false;
}
export default  hastoken;