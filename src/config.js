import JSEncrypt from "jsencrypt";

// encryption
const encrypt = new JSEncrypt();
const publicKey =
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyXToQ4BWmGaU+ZgtWlBQ" +
  "tXxG4lx07gF3aliZn/8vXUEkrDFQI7ciXL5fdNWfr7wAzMYHZI1afEvf/CcDZkXg" +
  "AXwkZsBm9m3Nhw1iiqBJGxAldIhxsoZWJpfUQGNMTUKGC+Mg9ugPzjaNgk7sRR2f" +
  "vW0wRY+z+FnOdwmIBBBZJ5Dky7E4i1wZNbvBg9CJK+5QARNYB1GAcijM+o3ibwO4" +
  "kL/a6EBHWg46YFFhO9vB9zIXqvs5FBns1tFqXD/bpGJ7wUkpxZCeniVuFYC17KVL" +
  "vo1rBna1znwhRIdfHHQjWWjjwgtCtK1XgXlvwag0DAyTJ/wT01PBexJDM0b/ES3a" +
  "wwIDAQAB";

encrypt.setPublicKey(publicKey);

export default {
  cookieID: "JSRS",
  encrypt: (data) => {
    let dataStr = JSON.stringify(data);
    return encrypt.encrypt(dataStr);
  },
};
