/**
 * @description Get User basic informations
 * @param {string} name Name of the user
 * @return {{name: string, lastname: string, gender: string, isValid: boolean}}
 * @example
 * const toto = GetUserBasicInfos('John')
 * console.log(toto) // John
 * @author Adrew Watson
 * @version 1.0.0
 */
const GetUserBasicInfos = (name) => ({
  name,
  lastname: "Doe",
  gender: "Male",
  isValid: true,
});

export default GetUserBasicInfos;
