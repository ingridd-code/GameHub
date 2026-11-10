
import conexao from "../config/db.js";

// Listar todos os jogos
export function listar(callback) {
    const sql = "SELECT * FROM jogos ORDER BY id";
    conexao.query(sql, callback);
}

// Buscar jogo pelo ID
export function listarPorId(id, callback) {
    const sql = "SELECT * FROM jogos WHERE id = ?";
    conexao.query(sql, [id], callback);
}

// Cadastrar jogo
export function criar(dados, callback) {
    const sql = "INSERT INTO jogos (titulo, ano_lancamento, estudio_id) VALUES (?, ?, ?)";
    conexao.query(sql, [
        dados.titulo,
        dados.ano_lancamento,
        dados.estudio_id
    ], callback);
}

// Atualizar jogo
export function atualizar(id, dados, callback) {
    const sql = "UPDATE jogos SET titulo = ?, ano_lancamento = ?, estudio_id = ? WHERE id = ?";
    conexao.query(sql, [
        dados.titulo,
        dados.ano_lancamento,
        dados.estudio_id,
        id
    ], callback);
}

// Excluir jogo
export function excluir(id, callback) {
    const sql = "DELETE FROM jogos WHERE id = ?";
    conexao.query(sql, [id], callback);
}
