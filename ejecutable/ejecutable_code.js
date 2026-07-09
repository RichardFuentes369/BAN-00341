const { execSync, spawn } = require('child_process');
const os = require('os');

async function main() {
    const platform = os.platform();
    console.log(`Detectado: ${platform}`);

    // 1. Verificación de SSH
    try {
        execSync('ssh -V', { stdio: 'ignore' });
        console.log('✅ SSH detectado correctamente.');
    } catch (e) {
        console.error('❌ SSH no encontrado. Por favor, asegúrate de tener instalado "openssh-client".');
        process.exit(1);
    }

    // 2. Lanzar el túnel
    console.log('🚀 Iniciando túnel hacia pinggy.io...');
    console.log('--------------------------------------');

    /**
     * Usamos stdio: 'inherit' para que todo lo que diga el proceso 
     * de SSH aparezca directamente en tu terminal sin filtros.
     * Esto evita que el ejecutable de 'pkg' se congele.
     */
    const tunnel = spawn('ssh', [
        '-p', '443', 
        '-o', 'ServerAliveInterval=30',
        '-o', 'StrictHostKeyChecking=no', 
        '-R0:localhost:3000', 
        'a.pinggy.io'
    ], {
        stdio: 'inherit'
    });

    // Manejo de errores en caso de que el proceso SSH no pueda ni siquiera iniciarse
    tunnel.on('error', (err) => {
        console.error('\n❌ Error crítico al iniciar el proceso SSH:', err.message);
    });

    // Aviso si el túnel se cierra inesperadamente
    tunnel.on('close', (code) => {
        if (code !== 0) {
            console.log(`\n⚠️ El túnel se cerró inesperadamente con código: ${code}`);
        } else {
            console.log('\n✅ Túnel finalizado.');
        }
    });
}

// Ejecutar
main().catch((err) => {
    console.error('Error fatal:', err);
});