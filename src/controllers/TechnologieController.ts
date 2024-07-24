import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { StatusCodes } from "http-status-codes";
import { Technologie } from "../models/Technologie";
import { User } from "../models/User";

interface BodyType {
    title: string;
    deadline: string;
    user: User;
}

export const TechnologieGet = (req: Request, res: Response) => {
    const { user } = req.body as { user: User };
    res.status(StatusCodes.OK).json(user.technologies);
};

export const TechnologiePost = (req: Request, res: Response) => {
    const { title, deadline, user } = req.body as BodyType;

    if (!title || !deadline) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "title e deadline são obrigatórios!",
        });
        return;
    }

    const newTechnologie: Technologie = {
        id: uuid(),
        title,
        studied: false,
        deadline: new Date(deadline),
        created_at: new Date(),
    };

    user.technologies.push(newTechnologie);
    res.status(StatusCodes.CREATED).json(newTechnologie);
};

export const TechnologiePut = (req: Request, res: Response) => {
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

    user.technologies.map((technologie) => {
        if (technologie.id === id) {
            technologie.title = title;
            technologie.deadline = new Date(deadline);
            res.status(StatusCodes.OK).json(technologie);
            return;
        }
    });
    res.status(StatusCodes.NOT_FOUND).json({
        error: "Nenhuma tecnologia encontrada com o id: " + id,
    });
};

export const TechnologiePatch = (req: Request, res: Response) => {
    const { user } = req.body as BodyType;
    const { id } = req.params as { id: string };

    if (!id) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "id é obrigatório pela url!",
        });
        return;
    }

    user.technologies.map((technologie) => {
        if (technologie.id === id) {
            technologie.studied = true;
            res.status(StatusCodes.OK).json(technologie);
            return;
        }
    });
    res.status(StatusCodes.NOT_FOUND).json({
        error: "Nenhuma tecnologia encontrada com o id: " + id,
    });
};

export const TechnologieDelete = (req: Request, res: Response) => {
    const { user } = req.body as BodyType;
    const { id } = req.params as { id: string };

    if (!id) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "id é obrigatório pela url!",
        });
        return;
    }

    let removed: boolean = false;
    user.technologies = user.technologies.filter((technologie) => {
        if (technologie.id === id) {
            removed = true;
            return;
        }
        return technologie;
    });

    if (removed) {
        res.status(StatusCodes.OK).json(user.technologies);
    }

    res.status(StatusCodes.NOT_FOUND).json({
        error: "Nenhuma tecnologia encontrada com o id: " + id,
    });
};
