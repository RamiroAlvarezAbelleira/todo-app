import * as Yup from "yup"

export const registerScheme = Yup.object().shape({
    email: Yup.string().email("invalid email").required("Email is required."),
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(6, "at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Please confirm your password")
})