import { UserType } from "@/types/user.types"
import httpBaseApi from "../common/http.service"

class UserService {
    createUser = async (data: object): Promise<UserType> => {
        return httpBaseApi.httpPost("/users", data)
    }
}

const userService = new UserService()

export default userService