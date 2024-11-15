import { IsEmail, IsNumber, IsString } from "class-validator"

export class CreateDbDto {

    

    @IsString({
        message: 'Имя не строка',
    })
    full_name: string

    @IsString({
        message: 'Роль не строка',
    })
    role: string


    @IsNumber({}, {
        message: 'Номер телефона должен быть числом',
    })
    efficiency: number;
}

export type UpdateDbDto = Partial<CreateDbDto>

