const { customAlphabet } = require('nanoid');
const crypto = require('crypto');

// Configuración del alfabeto para Connecta Go
const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const generateShortId = customAlphabet(alphabet, 6);

function createWristbandIdentity(eventPrefix = 'GO') {
    // 1. Código humano para la pulsera física
    const humanCode = `${eventPrefix}-${generateShortId()}-${generateShortId()}`;
    
    // 2. Hash de seguridad para el código QR
    const secretHash = crypto
        .createHash('sha256')
        .update(humanCode + "SALT_SECRETO_CONNECTA") 
        .digest('hex')
        .substring(0, 12);

    return {
        brand: "Connecta Go",
        status: "READY_TO_ACTIVATE",
        physical_label: humanCode,
        qr_payload: `https://connecta.go/verify/${secretHash}`,
        created_at: new Date().toISOString()
    };
}

console.log("\n=== CONNECTA GO ENGINE CORE ===");
const newPulse = createWristbandIdentity('CNCT');
console.log(JSON.stringify(newPulse, null, 2));
console.log("===============================\n");
