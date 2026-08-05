<?php
header('Content-Type: application/json');

// Permitir CORS (para desarrollo)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Responder a solicitudes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$tema = $data['tema'] ?? '';
$tono = $data['tono'] ?? 'amigable';
$longitud = $data['longitud'] ?? 'medio';
$contexto = $data['contexto'] ?? '';

// VALIDAR
if (empty($tema)) {
    echo json_encode(['success' => false, 'error' => 'El tema es obligatorio']);
    exit;
}

// 🔑 TU API KEY DE GEMINI
$apiKey = 'AQ.Ab8RN6KXEV2ZUIdz0TEQS2hJtPB8ka3Nfy9B_RbDwgoyq1oQ';
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$apiKey";

// CONSTRUIR PROMPT SEGÚN LONGITUD
$longitudMap = [
    'corto' => 'Muy corto (máximo 2 líneas)',
    'medio' => 'Medio (3-5 líneas)',
    'largo' => 'Largo (6-8 líneas)'
];
$longitudTexto = $longitudMap[$longitud] ?? 'Medio (3-5 líneas)';

$prompt = "Genera un mensaje profesional para WhatsApp sobre: \"$tema\".

Requisitos:
- Tono: $tono
- Longitud: $longitudTexto
- Contexto adicional: $contexto

Instrucciones:
1. El mensaje debe ser claro, directo y listo para copiar y pegar en WhatsApp.
2. Incluye un llamado a la acción claro (ej: "¡Reserva tu lugar!", "¡Contáctanos ahora!", etc.).
3. No incluyas saludos genéricos como "Hola" o "Saludos" al inicio.
4. No incluyas firmas como "Atentamente" o "Saludos cordiales".
5. Si es posible, incluye emojis relevantes para hacerlo más atractivo.
6. El mensaje debe ser persuasivo y profesional.

Genera SOLO el mensaje, sin explicaciones adicionales.";

$payload = [
    'contents' => [
        [
            'parts' => [
                ['text' => $prompt]
            ]
        ]
    ],
    'generationConfig' => [
        'temperature' => 0.8,
        'maxOutputTokens' => 300,
        'topP' => 0.95,
        'topK' => 40
    ]
];

// LLAMAR A GEMINI
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// Verificar errores de cURL
if ($curlError) {
    echo json_encode(['success' => false, 'error' => "Error de conexión: $curlError"]);
    exit;
}

if ($httpCode === 200) {
    $result = json_decode($response, true);
    $textoGenerado = $result['candidates'][0]['content']['parts'][0]['text'] ?? 'No se pudo generar el texto.';
    
    // Limpiar texto (eliminar saltos de línea extra)
    $textoGenerado = trim(preg_replace('/\s+/', ' ', $textoGenerado));
    
    echo json_encode(['success' => true, 'texto' => $textoGenerado]);
} else {
    // Intentar obtener mensaje de error de Google
    $errorData = json_decode($response, true);
    $errorMessage = $errorData['error']['message'] ?? "Error HTTP $httpCode";
    echo json_encode(['success' => false, 'error' => "Error: $errorMessage"]);
}
?>