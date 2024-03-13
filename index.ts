import "dotenv/config";
import app from "./src/app";

const config = {
    port: process.env.PORT || 3000,
};
let server: any;

server = app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: Error) => {
    console.error(error);
    exitHandler();
}