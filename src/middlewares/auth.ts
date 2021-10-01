import { Request, Response, NextFunction } from 'express';
import { nextTick } from 'process';
export const Auth = {
  private: (req: Request, res: Response, next: NextFunction) => {
    // Fazer verificação de auth
    let success = false;// Sucesso é verdadeiro
    if(success) {// Se é Sucesso
      next();// Passa para o próximo passo.
    } else {
      res.status(403);// Not Authorized
      res.json({ error: 'Não autorizado!'});
    }

  }
}