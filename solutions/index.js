/*EJERCICIO 1*/
import net from 'node:net'

export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    callback(null, { time: process.hrtime(startTime), ip })
  })
  
  client.on('error', (err) => {
    client.end()
    callback(err)
  })
}

ping('midu.dev', (err, info) => {
  if (err) console.error(err)
  console.log(info)
})

/*EJERCICIO 2*/
export function obtenerDatosPromise() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            try{
                resolve({ data: 'datos importantes' });
            }catch (e){
                reject(e)
            }
          }, 2000);
    })
}

// Promise.then()
obtenerDatosPromise()
    .then(info => {
        console.log(info)
    })
    .catch(error =>{
        console.error(error)
    })

// await
try{
    const info = await obtenerDatosPromise()
    console.log(info)
}catch(e){
    console.error(e)
}

/*EJERCICIO 3*/

export function procesarArchivo(callback) { 
    fs.readFile('input.txt', 'utf8', (error, contenido) => {
      if (error) {
        console.error('Error leyendo archivo:', error.message);
        callback(error)
      }
  
      setTimeout(() => {
        const textoProcesado = contenido.toUpperCase();
  
        fs.writeFile('output.txt', textoProcesado, error => {
          if (error) {
            console.error('Error guardando archivo:', error.message);
            callback(error)
          }
  
          console.log('Archivo procesado y guardado con éxito');
          callback(true)
        });
  
      }, 1000);
    });
}
