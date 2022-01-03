import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/User';

dotenv.config();

export const Auth = {
  private: async (req: Request, res: Response, next: NextFunction) => {
    
    let success = false;// Não autorizado
    
    // Fazer verificação de auth
    if(req.headers.authorization) {
      // Basic64
      let hash: string = req.headers.authorization.substring(6);
      let decoded: string = Buffer.from(hash, 'base64').toString();
      let data: string[] = decoded.split(':');
      if(data.length === 2) {
        let hasUser = await User.findOne({
          where: {
            email: data[0],
            password: data[1]
          }
        });
        if(hasUser) {
          success = true;
        }
      }


      /*const [authType, token] = req.headers.authorization.split(' ');
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
      }*/
    }
    

    if(success) {// Se é Sucesso
      next();// Passa para o próximo passo.
    } else {
      res.status(403);// Not Authorized
      res.json({ error: 'Não autorizado!'});
    }

  }
}