const { execSync, spawn } = require('child_process');
const os = require('os');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const preguntarHost = () => {
    return new Promise((resolve) => {
        console.log('\nSelecciona el tipo de host:');
        console.log('1) localhost');
        console.log('2) Otro dominio/IP');
        rl.question('Opción: ', (opcion) => {
            if (opcion.trim() === '1') {
                resolve('localhost');
            } else if (opcion.trim() === '2') {
                rl.question('Introduce el dominio o IP: ', (host) => {
                    resolve(host.trim());
                });
            } else {
                console.log('⚠️ Opción no válida, usando localhost por defecto.');
                resolve('localhost');
            }
        });
    });
};

const preguntarPuerto = () => {
    return new Promise((resolve) => {
        rl.question('Introduce el puerto local (default 3000): ', (input) => {
            resolve(input.trim() || '3000');
        });
    });
};

async function main() {
    const platform = os.platform();
    console.log(`Detectado: ${platform}`);

    // 1. Obtener host y puerto
    const host = await preguntarHost();
    const puerto = await preguntarPuerto();
    rl.close();

    // 2. Verificación de SSH
    try {
        execSync('ssh -V', { stdio: 'ignore' });
        console.log('✅ SSH detectado.');
    } catch (e) {
        console.error('❌ SSH no encontrado.');
        process.exit(1);
    }

    // 3. Lanzar túnel
    console.log(`🚀 Iniciando túnel para ${host}:${puerto} hacia pinggy.io...`);
    console.log('--------------------------------------');

    const tunnel = spawn('ssh', [
        '-p', '443', 
        '-o', 'ServerAliveInterval=30',
        '-o', 'StrictHostKeyChecking=no', 
        '-R', `0:${host}:${puerto}`, // Nota: Separar el '-R' ayuda a evitar errores en Windows
        'tcp@a.pinggy.io'            // 👈 AQUÍ: Agregamos 'tcp@' para que no use tu usuario local
    ], {
        stdio: 'inherit'
    });

    tunnel.on('close', (code) => {
        if (code !== 0) console.log(`\n⚠️ Túnel cerrado con código: ${code}`);
    });
}

main().catch((err) => console.error('Error fatal:', err));
