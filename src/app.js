import express from "express";
import cors from "cors";

import estudioRoute from "./routes/estudioRoute.js";
import jogoRoute from "./routes/jogoRoute.js";
import jogadorRoute from "./routes/jogadorRoute.js";
import tratarErro from "./middlewares/tratarErro.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "API do GameHub funcionando"
    });
});

// Rotas dos recursos
app.use("/estudios", estudioRoute);
app.use("/jogos", jogoRoute);
app.use("/jogadores", jogadorRoute);

// Tratamento de rotas inexistentes
app.use((req, res) => {
    res.status(404).json({
        erro: "Rota não encontrada"
    });
});

// Tratamento de erros
app.use(tratarErro);

export default app;