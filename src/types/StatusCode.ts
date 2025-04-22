export enum StatusCode {
    OK = 200, // Requisição bem-sucedida
    CREATED = 201, // Recurso criado com sucesso
    ACCEPTED = 202, // Requisição aceita para processamento
    NO_CONTENT = 204, // Requisição bem-sucedida, mas sem corpo na resposta
  
    BAD_REQUEST = 400, // Erro do cliente (requisição malformada)
    UNAUTHORIZED = 401, // Falta de autenticação válida
    FORBIDDEN = 403, // Cliente autenticado, mas sem permissão
    NOT_FOUND = 404, // Recurso não encontrado
    CONFLICT = 409, // Conflito de estado (ex: dados já existem)
    UNPROCESSABLE_ENTITY = 422, // Entidade semântica inválida (ex: validação falhou)
  
    INTERNAL_SERVER_ERROR = 500, // Erro interno no servidor
    NOT_IMPLEMENTED = 501, // Funcionalidade não implementada
    BAD_GATEWAY = 502, // Resposta inválida de um servidor upstream
    SERVICE_UNAVAILABLE = 503, // Serviço indisponível (servidor em manutenção ou sobrecarregado)
  }
  
export default StatusCode