const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    environment: process.env.ENVIRONMENT,
    testHost: process.env.TEST_HOST
    // put other setting in here, it clean using this way rather than using process.env in code
}