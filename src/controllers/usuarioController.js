import { buscarEmailUsuario, criarUsuarioService } from "../services/usuarioService.js";
import { hash, compare } from "bcrypt";

export const criarUsuarioController = async(req, res)=>{
    try{
        const {nome, email, senha} = req.body;
        if( await buscarEmailUsuario(email)){
            return res.status(400).json({message: 'e-mail já existente'})
        };
        const senhaHash = await hash(senha, 10);
        const resultado = await criarUsuarioService(nome, email, senhaHash)
        res.status(201).json({message: "usuário criado com sucesso"});
    } catch(err){
        res.status(500).json({message: "erro ao criar usuário"})
    }

}


export const loginUsuarioController = async (req, res)=>{
    try{
        const {email, senha} = req.body;
        const usuario = await buscarEmailUsuario(email);
        if(!usuario){
           return res.status(401).json({messagem: "E-mail ou senha incorretos"})
        }

        const senhaHash = usuario.senha
        const isMatch = await compare(senha, senhaHash)
        if(isMatch){
           return res.status(200).json({message:"Logado com sucesso"});
        } else {
            return res.status(401).json({message:"E-mail ou senha incorretos"})
        }
    } catch(err){
        return res.status(500).json({message: "erro ao logar."})
    }
}