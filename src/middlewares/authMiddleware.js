import jwt from "jsonwebtoken";

export const autenticarToken = (req, res, next) => {
    // 1. Captura o cabeçalho Authorization da requisição
    const authHeader = req.headers['authorization'];

    // O cabeçalho vem no formato: "Bearer eyJhbGciOiJIUzI1..."
    // Dividimos a string pelo espaço e pegamos apenas o token
    const token = authHeader && authHeader.split(' ')[1];

    // 2. Se o token não foi enviado
    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
        // 3. Verifica se o token é válido usando a chave secreta do .env
        const secretKey = process.env.JWT_SECRET;
        const usuarioDecodificado = jwt.verify(token, secretKey);

        // 4. Anexa os dados do usuário no objeto req para os próximos controllers usarem
        req.usuario = usuarioDecodificado;

        // 5. Passa a requisição adiante para a rota/controller
        next();
    } catch (err) {
        // Se o token expirou ou a assinatura é inválida
        return res.status(403).json({ message: "Token inválido ou expirado." });
    }
};