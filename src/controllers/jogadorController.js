
import * as jogadorModel from "../models/jogadorModel.js";
import { textoValido } from "../utils/validacoes.js";

export function listar(req, res, next) {
    jogadorModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        res.status(200).json(resultado);
    });
}

export function obterPorId(req, res, next) {
    jogadorModel.listarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Jogador não encontrado" });
        }

        res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { nome, email, nickname } = req.body ?? {};

    if (!textoValido(nome, 100) ||
        !textoValido(email, 150) ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
        !textoValido(nickname, 20) ||
        !/^[A-Za-z0-9_]{3,20}$/.test(nickname.trim())) {
        return res.status(400).json({
            erro: "Informe nome, email válido e nickname com 3 a 20 caracteres"
        });
    }

    const dados = {
        nome: nome.trim(),
        email: email.trim(),
        nickname: nickname.trim()
    };

    jogadorModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);

        res.status(201).json({
            mensagem: "Jogador cadastrado com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    const { nome, email, nickname } = req.body ?? {};

    if (!textoValido(nome, 100) ||
        !textoValido(email, 150) ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
        !textoValido(nickname, 20) ||
        !/^[A-Za-z0-9_]{3,20}$/.test(nickname.trim())) {
        return res.status(400).json({
            erro: "Informe nome, email válido e nickname com 3 a 20 caracteres"
        });
    }

    const dados = {
        nome: nome.trim(),
        email: email.trim(),
        nickname: nickname.trim()
    };

    jogadorModel.listarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Jogador não encontrado" });
        }

        jogadorModel.atualizar(req.id, dados, (erro) => {
            if (erro) return next(erro);

            res.status(200).json({
                mensagem: "Jogador atualizado com sucesso"
            });
        });
    });
}

export function excluir(req, res, next) {
    jogadorModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Jogador não encontrado" });
        }

        res.status(200).json({
            mensagem: "Jogador excluído com sucesso"
        });
    });
}
