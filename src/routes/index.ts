import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { UserGetAll, UserPost } from "../controllers/UserController";
import {
    TechnologyDelete,
    TechnologyGet,
    TechnologyPatch,
    TechnologyPost,
    TechnologyPut,
} from "../controllers/TechnologyController";
import { checkExistsUserAccount } from "../middlewares/CheckUser";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(StatusCodes.ACCEPTED).send("Funcionando");
});

router.post("/users", UserPost);
router.get("/users", UserGetAll);

router.post("/technologies", checkExistsUserAccount, TechnologyPost);
router.get("/technologies", checkExistsUserAccount, TechnologyGet);
router.put("/technologies/:id", checkExistsUserAccount, TechnologyPut);
router.patch(
    "/technologies/:id/studied",
    checkExistsUserAccount,
    TechnologyPatch
);
router.delete("/technologies/:id", checkExistsUserAccount, TechnologyDelete);

export { router };
