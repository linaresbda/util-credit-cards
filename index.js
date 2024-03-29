const axios = require('axios');

/*
 * JavaScript implementation of the Luhn algorithm, with calculation and validation functions
 * https://simplycalc.com/luhn-source.php
 */

/* luhn_checksum
 * Implement the Luhn algorithm to calculate the Luhn check digit.
 * Return the check digit.
 */
function luhn_checksum(code) {
  var len = code.length
  var parity = len % 2
  var sum = 0
  for (var i = len - 1; i >= 0; i--) {
    var d = parseInt(code.charAt(i))
    if (i % 2 == parity) { d *= 2 }
    if (d > 9) { d -= 9 }
    sum += d
  }
  return sum % 10
}

/* luhn_caclulate
* Return a full code (including check digit), from the specified partial code (without check digit).
*/
function luhn_calculate(partcode) {
  var checksum = luhn_checksum(partcode + "0")
  return checksum == 0 ? 0 : 10 - checksum
}

/* luhn_validate
* Return true if specified code (with check digit) is valid.
*/
function luhn_validate(fullcode) {
  return luhn_checksum(fullcode) == 0
}

async function info_card(numbercard) {
  let firsts6DigitsCard = numbercard.toString().substring(0, 6);
  let endpoint = `https://lookup.binlist.net/${firsts6DigitsCard}`;
  let response = await axios.get(endpoint).catch(err => console.log(err));
  if (response) {
    let { data: { scheme: procesador, type: tipo, bank: {name: banco}  } } = response;
    return { procesador, tipo, banco };
  } else {
    return {};
  }
}

module.exports = { luhn_validate, luhn_calculate, luhn_checksum, info_card };