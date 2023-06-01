/**
 * Generates a random ID - https://stackoverflow.com/a/6860916/21061
 * @return The random ID that has been generated
 */
export function generateRandomID() {
   const S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
   };

   return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}
