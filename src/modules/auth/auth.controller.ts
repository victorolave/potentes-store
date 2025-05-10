import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { RegisterUserDto, LoginUserDto } from "./dto/auth.dto";
import { UserPresenter } from "../users/presenters"; // For formatting responses

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const loginUserDto = req.body as LoginUserDto;

      const result = await AuthService.login(loginUserDto);

      if (!result) {
        res
          .status(401)
          .json(
            UserPresenter.formatError({ message: "Invalid email or password" })
          );
        return;
      }

      res
        .status(200)
        .json(UserPresenter.formatSuccess(result, "Login successful"));
    } catch (error: any) {
      res.status(500).json(UserPresenter.formatError(error));
    }
  }
}
