import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../database/Database";
import { User } from "../models/User";

export const checkExistsUserAccount = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username } = req.headers as { username: string };

    if (!username) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "username é obrigatório no header!",
        });
        return;
    }
    const userExist = db.find((user) => user.username === username);
    if (!userExist) {
        res.status(StatusCodes.NOT_FOUND).json({
            error: "Usuário " + username + " não encontrado!",
        });
        return;
    }
    req.body.user = userExist as User;
    next();
};
