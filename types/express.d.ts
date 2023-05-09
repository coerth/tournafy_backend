/*  namespace Express {
    interface Request {
      requestTime?: string;
    }
  }
  
   interface Error {
    statusCode: number;
    status: string;
    isOperational?: boolean;
  }

  */

import { Session } from "../types/types";

declare module 'express-serve-static-core' {
  interface Request {
    session: Session
  }
}

export {}

// declare global {
//   namespace Express {
//     interface Request {
//       session: Session
//     }
//   }
// }

