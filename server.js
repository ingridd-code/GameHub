
import "dotenv/config";
import app from "./src/app.js";
import conexao from "./src/config/db.js";

const PORTA = Number(process.env.PORTA || 3000);

conexao.connect((erro) => {
    if (erro) {
        console.error(
            "Erro ao conectar ao banco:",
            erro.code || erro.message
        );
        process.exit(1);
    }

    console.log("Conectado ao banco GameHub");

    const servidor = app.listen(PORTA, () => {
        console.log(`Servidor iniciado em http://localhost:${PORTA}`);
    });

    servidor.on("error", (erro) => {
        console.error(
            "Erro ao iniciar servidor:",
            erro.code || erro.message
        );

        conexao.end(() => process.exit(1));
    });
});
