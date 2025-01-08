import { UserApplicationDTO } from "../../application/types/UserApplicationDTO";
import { EntityInterface } from "../entityInterface";

export class UserEntity implements EntityInterface<UserApplicationDTO> {
    private user: UserApplicationDTO;
    
    constructor(user: UserApplicationDTO) {
        this.validate(user);
        this.user = user;
    }

    validate(user: UserApplicationDTO) {
        if (!user.id || !user.firstName || !user.lastName || !user.email) {
            throw new Error('Invalid user data');
        }
    }

    toPrimitive() {
        return this.user;
    }
}