const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({path: 'src/.env'});

const envFile = `export const environment = {
    production: ${process.env.production === 'true'},
    urlBase: '${process.env.urlBase}',
};
`;

const targetDevPath = path.join(__dirname, './src/environments/environment.development.ts');
const targetProdPath = path.join(__dirname, './src/environments/environment.ts');

// Generar archivo de desarrollo
fs.writeFile(targetDevPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(successColor, `${checkSign} Archivo environment.development.ts generado exitosamente`);
    }
});

// Generar archivo de producción si production es true
if (process.env.production === 'true') {
    fs.writeFile(targetProdPath, envFile, (err) => {
        if (err) {
            console.error(err); 
            throw err;
        } else {
            console.log(successColor, `${checkSign} Archivo environment.ts generado exitosamente`);
        }
    });
}
