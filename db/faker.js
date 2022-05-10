const { faker } = require('@faker-js/faker');

const generateRandomUser = () => {
const randomName = faker.name.firstName();
const randomEmail = faker.internet.email();

const randomUser = [randomName, randomEmail];

let output = `('${randomUser[0]}', '${randomUser[1]}', 'password')`;

return output;

};

module.exports = generateRandomUser;
