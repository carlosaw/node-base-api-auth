import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const Auth = {
  private: (req: Request, res: Response, next: NextFunction) => {
    
    let success = false;// Não autorizado
    
    // Fazer verificação de auth
    if(req.headers.authorization) {

      const [authType, token] = req.headers.authorization.split(' ');
      if(authType === 'Bearer') {
        //console.log('TOKEN', token);
        try {
          JWT.verify(
            token,
            process.env.JWT_SECRET_KEY as string
          );
          //console.log("DECODED", decoded);
          success = true;

        } catch(err) {
          // Não mostra erro nenhum
        }
      }
    }

    if(success) {// Se é Sucesso
      next();// Passa para o próximo passo.
    } else {
      res.status(403);// Not Authorized
      res.json({ error: 'Não autorizado!'});
    }

  }
}