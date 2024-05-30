import jwt from 'jsonwebtoken';

export const validarJWT = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-token']

    console.log(token)

    if (!token){
        return res.status(401).send('A token is required for authentication')
    }

    try{
        token = token.replace(/^Bearer\s+/, '')
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)

        req.user = decoded
    }catch(e){
        console.log(e)
        return res.status(401).send('Invalid Token')
    }

    return next()
}