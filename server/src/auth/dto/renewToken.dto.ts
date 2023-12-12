import { IsNotEmpty } from 'class-validator';

export class RenewTokenDTO {
    @IsNotEmpty()
    refreshToken: string;
}
