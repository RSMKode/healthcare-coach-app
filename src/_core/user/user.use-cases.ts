import { getUser } from "./user.services"

export const getUserUseCase = () => {
    return getUser();
}