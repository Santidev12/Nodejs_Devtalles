import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

const { b:base, l:limit, s:showTable} = yarg;
let tabla = 
`=================
   Tabla del ${base}
================\n
` 
for (let i = 0; i <= limit; i++) {
    const resultado = base * i;
    tabla += `${base} x ${i} = ${resultado}\n`
}

if(showTable){
    console.log(tabla)
}
fs.writeFile('outputs/tabla5.txt', tabla, (err) => {
    if(err) throw err;    
})

