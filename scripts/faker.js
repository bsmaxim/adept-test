import { faker } from '@faker-js/faker';
import fs from 'fs'


const DATABASE_PATH = './src/mock/data.json'

var data = []


for (var i = 1; i < 12001; i++)
{
    data.push({
        id: i,
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        selected: false
    })
}


fs.writeFileSync(DATABASE_PATH, JSON.stringify({ companies: data }, null, 2))



