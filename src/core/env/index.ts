import 'dotenv/config'
import z from 'zod'

// schema de validações para as variavéis de ambiente com Zod
const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string()
})

// parse do schema para o process.env
const _env = envSchema.safeParse(process.env)


if(_env.success === false) {
  // formatação de erros atráves do metódo formart
  console.error("Invalid enviroment variable", _env.error.format())
  //derrubar aplicação caso falhe alguma váriavel de ambiente
  throw new Error("Invalid enviroment variable")
}

//export da _env para uso na aplicação
export const env = (_env.data)