const validatePlayer = ({
   firstName,
   lastName,
   country,
   score
}) => {
   let regNum = /^\d+$/g
   let regWrd = /^[a-z]+$/ig
   if (firstName.length == 0) {
      return {
         isValid: false,
         msg: '*Player First Name required',
         field: 'first-name'
      }
   }
   if (!firstName.match(regWrd)) {
      return {
         isValid: false,
         msg: '*Player First Name should contain only alphabets',
         field: 'first-name'
      }
   }
   if (lastName.length == 0) {
      return {
         isValid: false,
         msg: '*Player Last Name required',
         field: 'last-name'
      }
   }
   if (!lastName.match(regWrd)) {
      return {
         isValid: false,
         msg: '*Player Last Name should contain only alphabets',
         field: 'last-name'
      }
   }
   if (country.length == 0) {
      return {
         isValid: false,
         msg: '*Player Country Name required',
         field: 'country'
      }
   }
   if (!country.match(regWrd)) {
      return {
         isValid: false,
         msg: '*Player Country Name should contain only alphabets',
         field: 'country'
      }
   }
   if (score.length == 0) {
      return {
         isValid: false,
         msg: '*Player Score required',
         field: 'player-score'
      }
   }
   if (!score.match(regNum)) {
      return {
         isValid: false,
         msg: '*Player Score should contain only numbers',
         field: 'player-score'
      }
   }
   return {
      isValid: true,
      msg: 'Validated',
      field: 'none'
   }
}