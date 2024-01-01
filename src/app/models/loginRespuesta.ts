import { LoginDTO } from "./loginDTO";

export class LoginRespuesta {

    message: string = "";
	loginDTO: LoginDTO = new LoginDTO();
    status: boolean = false;

}