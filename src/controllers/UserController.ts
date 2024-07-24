import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { db } from "../database/Database";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/User";

interface BodyType {
    name: string;
    username: string;
}

export const UserGetAll = (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json(db);
};

export const UserPost = (req: Request, res: Response) => {
    const { name, username } = req.body as BodyType;
    if (!name || !username) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "name e username são obrigatórios!",
        });
        return;
    }
    const userExist = db.find((user) => user.username === username);

    if (userExist) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "Já existe um usuário com esse username",
        });
        return;
    }
    const newUser: User = {
        id: uuid(),
        name,
        username,
        technologies: [],
    };
    db.push(newUser);
    res.status(StatusCodes.CREATED).json(newUser);
};
