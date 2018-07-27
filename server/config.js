module.exports = {
    port: 3030,
    dbUrl: "mongodb://localhost:27017/mywebsite",
    corsConfig: {
        origin: "*",
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
      }
}