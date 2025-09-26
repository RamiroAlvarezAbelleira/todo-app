import * as Yup from "yup"

export const loginScheme = Yup.object().shape({
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string().min(6, "at least 6 characters").required("required")
})