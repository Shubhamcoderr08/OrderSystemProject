// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Order System Backend API",
//       version: "1.0.0",
//       description: "Backend API for Order System",
//     },
//     servers: [
//       {
//         url: "http://localhost:8004",   // match .env PORT
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },
//   },
//   apis: ["./API/Routes/**/*.js"],
// };

// // 🔥 THIS LINE IS REQUIRED
// const swaggerSpec = swaggerJSDoc(options);

// // 🔥 EXPORT BOTH (THIS WAS MISSING / WRONG)
// export { swaggerUi, swaggerSpec };
