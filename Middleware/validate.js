import { ZodError } from "zod";

export const validate =
  (schema, property = "body") =>
  (req, res, next) => {
    try {
      req[property] = schema.parse(req[property]);
      next();
    } 
    catch (err) {
        
      if (err instanceof ZodError) {
        const formattedErrors = err.issues.map(issue => ({
          field: issue.path[0],
          message: issue.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: formattedErrors,
        });
      }

      
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
