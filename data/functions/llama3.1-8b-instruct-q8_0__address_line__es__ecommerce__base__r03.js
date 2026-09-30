function validate(address) {
    let valid = /^([A-Za-z0-9]+ [A-Za-z0-9]+)$/.test(address);
        
    if(!valid){
        return false;
}
    
    for (let char of address){
      if (!CharacterExists(char, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789') ) {
          valid = false ;
       }
   }

   let words = address.split(" ").length;

   if(words < 2 || words >3 ){
       valid = false; 
      
   }

    return (valid == true);
}

function CharacterExists(a,b) {
 let answer=true;
 
 for(let char of b){
      if (a===char)
          continue ;
        else{
            if (!([ a  ].includes(char)))
                    answer=false;

        }
     }
  return answer ;  
   }
