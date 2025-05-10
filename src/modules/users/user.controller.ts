import { Request, Response } from "express";
import { createUserSchema, updateUserSchema } from "./user.validation";
import { userService } from "./users.service";
import { User } from "./user.model";


const createUser = async (req: Request, res: Response): Promise<void> => {
    const result = createUserSchema.safeParse(req.body);

    if (!result.success) {
     res.status(400).json({ error: result.error.errors });
        return;
    }

    console.log(result.data);

    const user = await userService.createUser(result.data as User);
    res.status(201).json(user);
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = updateUserSchema.safeParse({ ...req.body, id });

    if (!result.success) {
    res.status(400).json({ error: result.error.errors });
        return;
    }

    const user = await userService.updateUser(result.data as User);
    res.status(200).json(user);
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
    res.status(400).json({ error: "User ID is required" });
        return;
    }

    const user = await userService.deleteUser({ id } as User);
    res.status(200).json(user);
};

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
    res.status(400).json({ error: "User ID is required" });
        return;
    }

    const user = await userService.findById(id);
    res.status(200).json(user);
};

const getAllUsers = async (req: Request, res: Response) => {
    const users = await userService.findAll();
    res.status(200).json(users);
};

export{createUser, updateUser, deleteUser, getUserById, getAllUsers};


