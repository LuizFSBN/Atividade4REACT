import './RegisterForm.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";

import src from '../../Assets/NavHeader.svg'
import background from '../../Assets/Login_Background.jpg'

interface RegisterFormData {
    nome: string;
    email: string;
    senha: string;
}

const savedData = localStorage.getItem("registerFormData");
const defaultValues = savedData ? JSON.parse(savedData) : {};

export default function RegisterForm() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormData>({ defaultValues });

    const navigate = useNavigate();

    const onSubmit = (data: RegisterFormData) => {
        console.log(data);
        localStorage.setItem("registerFormData", JSON.stringify(data));
        reset();
        navigate("/login");
    };

    return (
        <div className="register-container w-full h-screen flex justify-end font-poppins" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

            <div className='w-2/4 h-auto flex flex-col mt-3 bg-white items-center justify-center font-poppins border-t-2 border-l-2 rounded-tl-3xl'>
                <img className='mb-8' src={src} alt="Navigation Header" />

                <div className='inset-shadow-sms p-8 rounded-lg border border-gray-300 flex flex-col'>
                    <h1 className="text-2xl font-bold">Crie sua Conta</h1>
                    <span className='text-sm text-gray-500 mb-10'>Informe seu nome, e-mail e senha</span>

                    <form className="flex flex-col gap-5 w-80" onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col'>
                            <label className='text-xs font-bold text-gray-500'>NOME</label>
                            <input
                                type="text"
                                placeholder="Digite o nome completo"
                                className="h-10 text-sm bg-white border-b border-gray-300  outline-blue-700 font-poppins"
                                {...register("nome", { required: "Nome obrigatório" })}
                            />
                            {errors.nome && <p className='text-xs text-red-600 mt-2'>{errors.nome.message}</p>}
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-xs font-bold text-gray-500'>E-MAIL</label>
                            <input
                                type="text"
                                placeholder="exemplo@mail.com"
                                className="h-10 text-sm bg-white border-b border-gray-300  outline-blue-700 font-poppins"
                                {...register("email", { required: "E-mail obrigatório" })}
                            />
                            {errors.email && <p className='text-xs text-red-600 mt-2'>{errors.email.message}</p>}
                        </div>

                        <div className='flex flex-col mb-3'>
                            <label className='text-xs font-bold text-gray-500'>SENHA</label>
                            <input
                                type="password"
                                placeholder="Digite sua senha"
                                className="h-10 text-sm bg-white border-b border-gray-300  outline-blue-700 font-poppins"
                                {...register("senha", { required: "Senha obrigatória", minLength: { value: 6, message: "Mínimo 6 dígitos" } })}
                            />
                            {errors.senha && <p className="text-xs text-red-600 mt-2">{errors.senha.message}</p>}
                        </div>

                            <button
                                type="submit"
                                className="h-13 w-full bg-black rounded-md text-white font-semibold text-base px-3 cursor-pointer transition-filter duration-200 hover:brightness-90 border-none"
                            >
                                Cadastrar
                            </button>
                  
                    </form>

                </div>

                <div className='inset-shadow-sms p-8 mt-5 rounded-lg border border-gray-300 flex flex-col w-97'>
                    <h1 className="text-1.5xl font-bold">Já uma conta?</h1>
                    <span className='text-sm text-gray-500 mb-8'>Entre agora mesmo</span>

                    <Link to="/login">
                        <button
                            type="submit"
                            className="h-13 w-full bg-gray-200 rounded-md text-black font-semibold text-base px-3 cursor-pointer transition-filter duration-200 hover:brightness-90 border-none"
                        >
                            Acessar conta
                        </button>
                    </Link>

                </div>
            </div>

        </div>
    )
}
