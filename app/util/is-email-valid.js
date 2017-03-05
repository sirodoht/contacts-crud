/**
 * Function to check if given email is valid.
 * @param {string} email The given email to check;
 * @return {boolean} True (valid) or false (invalid).
 */
export default function isEmailValid(email) {
  if (email.indexOf('@') === -1) {
    return false;
  }
  return true;
}
