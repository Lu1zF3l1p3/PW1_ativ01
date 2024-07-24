import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { UserGetAll, UserPost } from "../controllers/UserController";
import {
    TechnologieDelete,
    TechnologieGet,
    TechnologiePatch,
    TechnologiePost,
    TechnologiePut,
} from "../controllers/TechnologieController";
import { checkExistsUserAccount } from "../middlewares/CheckUser";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(StatusCodes.ACCEPTED).send("Funcionando");
});

router.post("/users", UserPost);
router.get("/users", UserGetAll);

router.post("/technologies", checkExistsUserAccount, TechnologiePost);
router.get("/technologies", checkExistsUserAccount, TechnologieGet);
router.put("/technologies/:id", checkExistsUserAccount, TechnologiePut);
router.patch(
    "/technologies/:id/studied",
    checkExistsUserAccount,
    TechnologiePatch
);
router.delete("/technologies/:id", checkExistsUserAccount, TechnologieDelete);

export { router };
