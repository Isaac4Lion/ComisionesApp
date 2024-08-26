const perfil = async (req, res) =>{
    if (req.admin){
        delete req.admin.token
        delete req.admin.password
        delete req.admin.confirmarEmail
        delete req.admin.createdAt
        delete req.admin.__v
        res.status(200).json(req.admin)
    }else if (req.user){
        delete req.user.token
        delete req.user.password
        delete req.user.confirmarEmail
        delete req.user.createdAt
        delete req.user.__v
        res.status(200).json(req.user)
    }
}
export default perfil