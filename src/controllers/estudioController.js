
import * as estudioModel from "../models/estudioModel.js";

export function listar(req, res, next) {
    estudioModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        res.status(200).json(resultado);
    });
}

export function obterPorId(req, res, next) {
    estudioModel.listarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Estúdio não encontrado"
            });
        }

        res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { nome, pais } = req.body ?? {};

    if (!nome || !pais ||
        typeof nome !== "string" ||
        typeof pais !== "string" ||
        !nome.trim() || !pais.trim()) {
        return res.status(400).json({
            erro: "Informe nome e país"
        });
    }

    estudioModel.criar(
        { nome: nome.trim(), pais: pais.trim() },
        (erro, resultado) => {
            if (erro) return next(erro);

            res.status(201).json({
                mensagem: "Estúdio cadastrado com sucesso",
                id: resultado.insertId
            });
        }
    );
}

export function atualizar(req, res, next) {
    const { nome, pais } = req.body ?? {};

    if (!nome || !pais ||
        typeof nome !== "string" ||
        typeof pais !== "string" ||
        !nome.trim() || !pais.trim()) {
        return res.status(400).json({
            erro: "Informe nome e país"
        });
    }

    estudioModel.listarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Estúdio não encontrado"
            });
        }

        estudioModel.atualizar(
            req.id,
            { nome: nome.trim(), pais: pais.trim() },
            (erro) => {
                if (erro) return next(erro);

                res.status(200).json({
                    mensagem: "Estúdio atualizado com sucesso"
                });
            }
        );
    });
}

export function excluir(req, res, next) {
    estudioModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: "Estúdio não encontrado"
            });
        }

        res.status(200).json({
            mensagem: "Estúdio excluído com sucesso"
        });
    });
}
