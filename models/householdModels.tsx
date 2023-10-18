import { User } from "./userModels";

interface Household {
    id: number,
    users: Array<User>,
}

export { Household };