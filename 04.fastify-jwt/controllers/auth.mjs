import { loginMiddleware, logoutMiddleware, signupMiddleware } from "../middlewares/auth.mjs"
import { issueJWTToken } from "../middlewares/main.mjs"

export const signupController = async (req, res) => {

    try {

        await signupMiddleware(req,res)
        await issueJWTToken(req,res)
        res.send({ message: "signup successfull", data: req?.tokenPayload })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}

export const loginController = async (req, res) => {

    try {

        await loginMiddleware(req,res)
        await issueJWTToken(req,res)
        res.send({ message: "login successfull", data: req?.tokenPayload })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}

export const logoutController = async (req, res) => {

    try {

        await logoutMiddleware(req,res)

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}