import { Request, Response } from 'express';
import { container } from 'tsyringe';
import resetPasswordService from '@modules/users/services/resetPasswordService';

class resetPasswordController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { token, password, password_confirmation } = req.body;

        const resetPassword = container.resolve(resetPasswordService);

        await resetPassword.execute({
            token,
            password,
            password_confirmation,
        });

        return res.status(204).json({
            message: 'password changed with success',
        });
    }
}

export default resetPasswordController;
