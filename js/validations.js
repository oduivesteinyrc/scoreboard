const validatePlayer = ({
   firstName,
   lastName,
   company,
   score,
   uuid
}) => {
   let regNum = /^\d+$/g
   let regWrd = /^[a-z\-\s]+$/ig
   if (!uuid || uuid.trim().length === 0) {
      return {
         isValid: false,
         msg: '*UUID is verplicht',
         field: 'uuid'
      }
   }
   if (firstName.length == 0) {
      return {
         isValid: false,
         msg: '*Voornaam is verplicht',
         field: 'first-name'
      }
   }
   if (!firstName.match(regWrd)) {
      return {
         isValid: false,
         msg: '*Voornaam mag alleen letters, streepjes en spaties bevatten',
         field: 'first-name'
      }
   }
   if (lastName.length == 0) {
      return {
         isValid: false,
         msg: '*Achternaam is verplicht',
         field: 'last-name'
      }
   }
   if (!lastName.match(regWrd)) {
      return {
         isValid: false,
         msg: '*Achternaam mag alleen letters bevatten',
         field: 'last-name'
      }
   }
   // if (company.length == 0) {
   //    return {
   //       isValid: false,
   //       msg: '*Player company Name required',
   //       field: 'company'
   //    }
   // }
   // if (!company.match(regWrd)) {
   //    return {
   //       isValid: false,
   //       msg: '*Player company Name should contain only alphabets',
   //       field: 'company'
   //    }
   // }
   if (score.length == 0) {
      return {
         isValid: false,
         msg: '*Score is verplicht',
         field: 'player-score'
      }
   }
   if (!score.match(regNum)) {
      return {
         isValid: false,
         msg: '*Score mag alleen cijfers bevatten',
         field: 'player-score'
      }
   }
   return {
      isValid: true,
      msg: 'Validated',
      field: 'none'
   }
}