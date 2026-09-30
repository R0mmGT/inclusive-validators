function validate(phoneNumber) {
    // Remove any non-digit characters from the string
    phoneNumber = phoneNumber.replace(/\D+/g, '');
    
    // Check if the number has an international country code (+nn where n is a digit)
    var match = phoneNumber.match(/^\+?\d{1,}$/);
    
    // Return false for empty phone numbers or those without digits
    if (!match) {
        return false;
    }
    
    // Check length of different country codes 
    switch (phoneNumber.length){
       case 5:// check for australian mobile number like 0415...
       case 10://US and Canadian phone numbers
          var usNumber = phoneNumber.substring(phoneNumber.length-12, phoneNumber.length);
		  if((new RegExp('^\\d{3}-\\d{3}-\\d{4}$')).test(usNumber)){
             return true;
          }
          break; 
       case 11://Indian mobile number like +91 98765.....
         var indianMobile = phoneNumber.substring(0,12)
          if(indianMobile.length>5){
            return false;
	  }
	  	if((phoneNumber[0]=="9" || phoneNumber[0]=="8" ||phoneNumber[0]=="7")){
		 	return true;
		 }else{
			 return false;
		 }
        break;  
       case 14://German and Austrian phone numbers 
          var germanNumber = phoneNumber.substring(0,13);
          if((new RegExp('^\\d{3} \\d{4} \\d{5}$')).test(germanNumber)){
             return true;
          }
          break;
     // Check for UK and Canadian mobile numbers with 11 digits
       case 14://UK Mobile Number Format: 07890123456, +447890123456
         var ukMoNo = phoneNumber.substring(0,13);
        	if(phoneNumber.length == 15 && (phoneNumber[0] == "+" || phoneNumber[0] == "+", phoneNumber[1] == "4" )){  
            return true;
          }
        case 7://Nigerian Mobile Number like 07012345678
             if((new RegExp('^\\d{3} \\d{2}(?: [A-C]) [ABDGHJKLMNPRTWY]{1}$')).test(phoneNumber.replace(/ /g, ""))){
                return false;
            }
           else{
              if((phoneNumbervalidator == null)){
               return false;
			  }else{
				var ukMoNo = phoneNumber.substring(0,13);
				if (phoneNumber.length == 13 && ((new RegExp('^[47]\d{10}$')).test(phoneNumber.replace(/ /g,"")))) {
					return true
				  }
				else if (phoneNumber.length > 14) {
				      return false;
				}
            } 
          return false;
       case 12:// Check for French mobile number pattern like +33612345678 and 06 76 XXXX XXXXX
        	if((new RegExp('^\\+(?:33)?0\d{8,9}$')).test(phoneNumber)){
          	   return true;
           }
          else if ((phoneNumber.length == 13) && (((phoneNumbervalidator == null))|| !isNaN(phoneNumber.replace(/[^0-9]/g, '')))) {
           	return true
    		}	
        case 11://US phone number like +1 XXX XX XXXXXXX or (XXX) XXX-XXXX
          var usNumber = phoneNumber.substring(1,phoneNumber.length);
		  if((new RegExp('^[\\+]?([123])?0*91[ ]{0,3}\\d{10}$')).test(usNumber)){
             return true;
		  }
       case 16://Spanish phone number pattern like +34 XXXXXXXXXX 
             var spanishNumber = phoneNumber.substring(0,17);  
            //Check country code for Spain (es) and Country code prefix
          if((new RegExp('^[6-89][\\d]{8}$')).test(spanishNumber)){
             return true;
          }else{		
		  	if(phoneNumber.length == 15 && (phoneNumber[0] == "+" || phoneNumber[0] == "+", phoneNumber[1] == "4" )){  
           	return true;	
        	}
       case 17://Portuguese phone number pattern
          var portugalMobileNo = phoneNumber.substring(0,18);
		 //Remove special characters and check if the first two digits in the sequence are either ( +)9
			var usNumber=phoneNumbervalidator==null?phoneNumber.replace(/[^0-9]/g, ''):phoneNumbervalidator.replace(/[^\d+]/g, '')

		 var matchCountryCodePortugal = phoneNumbervalidator != null&&(usNumber.length >= 10 && (new RegExp('^(+351)?\\s?9\\w{8}')).test(phoneNumbervalidator));
		  if((new RegExp('^\\+([1-9]\\d{0,2})[ ]?(9\\d{8,10})(?: [ABDGHJKLMNPRTWY]{1})?$')).test(portugalMobileNo)){
             return true;
          } 	else if((phoneNumber.length >15) || (usNumber.length==13)) {
            return false;}
         break;  
    // Check for Polish mobile numbers
       case 11://Check for Polish Mobile Number Format like +48 XXX... or 5XX...
         var polishMobile = phoneNumber.substring(0,12);
		  if((new RegExp('^\\+?(?:48|42)0?\\d{8}$')).test(polishMobile)){
             return true;
        }else if(phoneNumber.length >= 14 && ((phoneNumber[1] == '4' || phoneNumber[2] == '6' ))){
            var matched =  phoneNumber.substring(3,16).match(/\w/);
          var fullMatched =  (new RegExp('^[\\+]?([147])?0*91[ ]{0,3}\\d{8}$')).test(phoneNumber.replace(/ /g,""))
        if ((matched && matched.length ==10)) {
               return true;	
			}
       case 13://Check for Polish Mobile Number Format like +48XXX...,5XX...
            var phoneNumbervalidator = phoneNumber.replace(/[^\d]/g,"");

         	if((new RegExp('^\\+?(?:48|42)0?\\d{8}$')).test(phoneNumber.substring(1,12)) && new RegExp('^[147]0[0-9]{7,9}$').test(' '+phoneNumber.substring(3,13))) {
               return true;
			}
      break;  
       //Check for German mobile numbers with 11 and 14 digits 
       case 15://German Mobile Numbers
         var germanNumber = phoneNumber.substring(0,16);
         if((new RegExp('\\+?49\\d{10}')).test(phoneNumber.substring(1)) || ((phoneNumber.substring(0,2) == "+49" && (new RegExp('^\\d{11}$')).test(phoneNumber.substring(3))))) {
            return true;
		 }
       case 9://Check for US phone numbers
         var usNumber = phoneNumber.replace(/[^0-9]/g,"");
         if((new RegExp('^(?:\\([2-9]\\d{2}\\)|[2-9] \\d{2}) [2-9]?\\d{2}[-. ]?\\d{4}$')).test(usNumber)){
            return true;
		 }
       case 10://Check for australian phone numbers
         var ausPhone = phoneNumber.replace(/[^0-9]/g,"");
          if((new RegExp('^(07 |04 )?'+'1(?: [0-2]?[0-9]) ?\\d{4}$')).test(ausPhone)){
            return true;
		default:
        	return false;
	   }
  }

//return false;  
}
