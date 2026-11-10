
import conexao from "../config/db.js";

// Listar todos os jogadores
export function listar(callback) {
    const sql = "SELECT * FROM jogadores ORDER BY id";
    conexao.query(sql, callback);
}

// Buscar jogador pelo ID
export function listarPorId(id, callback) {
    const sql = "SELECT * FROM jogadores WHERE id = ?";
    conexao.query(sql, [id], callback);
}

// Cadastrar jogador
export function criar(dados, callback) {
    const sql = "INSERT INTO jogadores (nome, email, nickname) VALUES (?, ?, ?)";
    conexao.query(sql, [
        dados.nome,
        dados.email,
        dados.nickname
    ], callback);
}

// Atualizar jogador
export function atualizar(id, dados, callback) {
    const sql = "UPDATE jogadores SET nome = ?, email = ?, nickname = ? WHERE id = ?";
    conexao.query(sql, [
        dados.nome,
        dados.email,
        dados.nickname,
        id
    ], callback);
}

// Excluir jogador
export function excluir(id, callback) {
    const sql = "DELETE FROM jogadores WHERE id = ?";
    conexao.query(sql, [id], callback);
}
