import { Request, Response } from "express";
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../service/auth.service";


export class AuthController {

    constructor(
        public readonly authService: AuthService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal Server Error'})
    }

    registerUser = (req: Request, res: Response) => {

        const [error, registerDto] = RegisterUserDto.create(req.body)

        if(error) return res.json({error})

        this.authService.registerUser(registerDto!)
            .then( (user) => res.json(user))
            .catch( error => this.handleError(error, res) )
    }

    loginUser = (req: Request, res: Response) => {

        res.json('loginUser')
    }

    validateUser = (req: Request, res: Response) => {

        res.json('validatedUser')
    }
}