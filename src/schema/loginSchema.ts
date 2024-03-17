import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Insira um e-mail válido.")
    .required("O campo de e-mail é obrigatório."),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .max(32, "A senha deve ter no máximo 32 caracteres.")
    .required("O campo de senha é obrigatório."),
});
