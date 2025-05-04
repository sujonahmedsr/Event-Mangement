import { Server } from 'http';
import app from './app'
import Config from './Config';

async function main() {
    const server: Server = app.listen(Config.port, () => {
        console.log("Sever is running on port ", Config.port);
    })
}

main();