import { prisma } from "../../config/prisma";
import { User } from "./user.model";

const userService = {
  findAll: async () => {
    const users = await prisma.user.findMany({
      include: {
        customer: true,
        employee: true,
      },
    });

    return users;
  },

  createUser: async (data: User) => {
    const { customer, employee, ...user } = data;

    const newUser = prisma.user.create({
      data: {
        ...user,
        customer: customer ? { create: customer } : undefined,
        employee: employee ? { create: employee } : undefined,
      },
    });

    return newUser;
  },

  updateUser: async (data: User) => {
    const { customer, employee, ...user } = data;

    const updatedUser = prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...user,
        customer: customer ? { update: customer } : undefined,
        employee: employee ? { update: employee } : undefined,
      },
    });

    return updatedUser;
  },

  deleteUser: async (data: User) => {
    const { id } = data;

    const deletedUser = prisma.user.delete({
      where: {
        id,
      },
    });

    return deletedUser;
  },

  findById: async (id: string) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
        employee: true,
      },
    });

    return user;
  },
};

export { userService };
