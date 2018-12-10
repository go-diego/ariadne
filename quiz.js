/**NOTE:
 * fernet is not included in this project
 */
let fernet = require("fernet");
let secret = new fernet.Secret("TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=");
let message =
    "gAAAAABcCZx2ZP6nhfox4XLCF4f70HFDiFzxrd2Pq7avNEC1o5gLcXZw_vZ7Uz3KolnikDPJhjqyalvAOe1sepnUbqmgSXOlGK-upWvsxQufutwu7N8GZxMiCT1qgT8G8IFMds9XXCx1ZLlNEIanGIFawQORqwGTLJQYVQtkdVALawEL6JlOIiZcVPoja_pRLdQ0CRNQsk3x";
let token = new fernet.Token({secret: secret, token: message, ttl: 0});
const decoded = token.decode();

console.log("DECODED", decoded);
//https://engineering-application.britecore.com/e/t6e118s11t/midLevelFrontendDeveloper

/**
 * This is the code I used to get the first url
 */
function secret() {
    const SECRET = [
        104,
        116,
        116,
        112,
        115,
        58,
        47,
        47,
        101,
        110,
        103,
        105,
        110,
        101,
        101,
        114,
        105,
        110,
        103,
        45,
        97,
        112,
        112,
        108,
        105,
        99,
        97,
        116,
        105,
        111,
        110,
        46,
        98,
        114,
        105,
        116,
        101,
        99,
        111,
        114,
        101,
        46,
        99,
        111,
        109,
        47,
        113,
        117,
        105,
        122,
        47,
        115,
        97,
        97,
        115,
        100,
        97,
        115,
        100,
        108,
        102,
        108,
        102,
        108,
        115
    ];

    return SECRET.map(value => String.fromCharCode(value)).join("");
}
