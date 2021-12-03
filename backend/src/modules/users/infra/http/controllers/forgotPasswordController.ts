import { Request, Response } from 'express';
import { container } from 'tsyringe';
import sendForgotPasswordEmail from '@modules/users/services/sendForgotPasswordEmail-service';

class forgotPasswordController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;
        console.log(email);

        const SendForgotPasswordEmail = container.resolve(
            sendForgotPasswordEmail,
        );

        await SendForgotPasswordEmail.execute({ email });

        return res.status(204).json({
            message: 'success',
        });
    }
}

export default forgotPasswordController;
