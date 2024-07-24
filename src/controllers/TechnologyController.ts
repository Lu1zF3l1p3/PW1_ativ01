import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { StatusCodes } from "http-status-codes";
import { Technology } from "../models/Technology";
import { User } from "../models/User";

interface BodyType {
    title: string;
    deadline: string;
    user: User;
}

export const TechnologyGet = (req: Request, res: Response) => {
    const { user } = req.body as { user: User };
    res.status(StatusCodes.OK).json(user.technologies);
};

export const TechnologyPost = (req: Request, res: Response) => {
    const { title, deadline, user } = req.body as BodyType;

    if (!title || !deadline) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "title e deadline são obrigatórios!",
        });
        return;
    }

    const newTechnology: Technology = {
        id: uuid(),
        title,
        studied: false,
        deadline: new Date(deadline),
        created_at: new Date(),
    };

    user.technologies.push(newTechnology);
    res.status(StatusCodes.CREATED).json(newTechnology);
};

export const TechnologyPut = (req: Request, res: Response) => {
    const { title, deadline, user } = req.body as BodyType;
    const { id } = req.params as { id: string };

    if (!title || !deadline) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "title e deadline são obrigatórios!",
        });
        return;
    }

    if (!id) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "id é obrigatório pela url!",
        });
        return;
    }

    let finded: boolean = false;
    user.technologies.map((technology) => {
        if (technology.id === id) {
            technology.title = title;
            technology.deadline = new Date(deadline);
            finded = true;
            res.status(StatusCodes.OK).json(technology);
            return;
        }
    });
    if (!finded) {
        res.status(StatusCodes.NOT_FOUND).json({
            error: "Nenhuma tecnologia encontrada com o id: " + id,
        });
    }
};

export const TechnologyPatch = (req: Request, res: Response) => {
    const { user } = req.body as BodyType;
    const { id } = req.params as { id: string };

    if (!id) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "id é obrigatório pela url!",
        });
        return;
    }

    let finded: boolean = false;
    user.technologies.map((technology) => {
        if (technology.id === id) {
            technology.studied = true;
            finded = true;
            res.status(StatusCodes.OK).json(technology);
            return;
        }
    });
    if (!finded) {
        res.status(StatusCodes.NOT_FOUND).json({
            error: "Nenhuma tecnologia encontrada com o id: " + id,
        });
    }
};

export const TechnologyDelete = (req: Request, res: Response) => {
    const { user } = req.body as BodyType;
    const { id } = req.params as { id: string };

    if (!id) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "id é obrigatório pela url!",
        });
        return;
    }

    let removed: boolean = false;
    user.technologies = user.technologies.filter((technology) => {
        if (technology.id === id) {
            removed = true;
            return;
        }
        return technology;
    });

    if (removed) {
        res.status(StatusCodes.OK).json(user.technologies);
    } else {
        res.status(StatusCodes.NOT_FOUND).json({
            error: "Nenhuma tecnologia encontrada com o id: " + id,
        });
    }
};
