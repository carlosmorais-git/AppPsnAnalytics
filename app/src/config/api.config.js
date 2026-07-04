// Configuração de API para diferentes ambientes

/**
 * IMPORTANTE: Para React Native/Expo usar IP local da máquina
 *
 * Para descobrir seu IP:
 * - Windows: abra cmd e digite: ipconfig
 *   Procure por "Endereço IPv4" (ex: 192.168.0.10)
 *
 * - Linux/Mac: abra terminal e digite: ifconfig
 *   Procure por "inet" (ex: 192.168.0.10)
 *
 * NÃO use "localhost" ou "10.0.0.208" no React Native!
 */

// Altere este IP para o IP do rotiador
const LOCAL_IP = "10.0.0.208"; // MUDE PARA SEU IP LOCAL

export const API_CONFIG = {
  // Para desenvolvimento local com Expo
  development: {
    baseURL: `http://${LOCAL_IP}:8000/api`,
    timeout: 2500, // 2 segundos
  },

  // Para produção (quando publicar o app)
  production: {
    baseURL: "https://seu-backend.com/api",
    timeout: 10000,
  },
};

// Detectar ambiente automaticamente
export const getCurrentConfig = () => {
  // Por padrão usa development
  // Você pode adicionar lógica para detectar ambiente aqui
  return API_CONFIG.development;
};
