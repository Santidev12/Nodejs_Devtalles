import mongoose from 'mongoose';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { UserModel } from '../../data';
import { CustomError, UserEntity } from '../../domain';
import { bcryptAdapter } from '../../config';


export class AuthService {

    // DI
    constructor(){}

    public async registerUser( registerDto: RegisterUserDto) {

        const existUser = await UserModel.findOne({ email: registerDto.email })
        if( existUser ) throw CustomError.badRequest('Email already exist')

        try {
            const user = new UserModel(registerDto)
            
            // encriptar la contraseña
            user.password = bcryptAdapter.hash( registerDto.password );

            await user.save()
            // JWT <--- para mantener autenticado al usuario

            // Email de confirmacion

            const { password, ...rest } = UserEntity.fromObject(user)


            return { 
                user: rest,
                token: 'ABC'
            }; 

        } catch (error) {
            
            throw CustomError.internalServer(`${ error }`)
        }

    }
}