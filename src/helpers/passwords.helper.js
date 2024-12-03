const bcrypt = require('bcrypt');
const salts = 10;

async function hashPassword(password) {
    return await bcrypt.hash(password, salts);
}

async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashPassword,
    verifyPassword,
};
