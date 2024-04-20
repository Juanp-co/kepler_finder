const fs = require('fs');
const { parse } = require('csv-parse');
const { log } = require('console');

const results = [];

function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', data => {
        if(isHabitablePlanet(data)){
            results.push(data)
        }
    })
    .on('error', error => {
        console.log(`Error reading file: ${error}`);
    })
    .on('end', () => {
        console.log(results.map(planet => planet.kepler_name));
        console.log(`Total result planets habitable ${results.length}`);
    });
