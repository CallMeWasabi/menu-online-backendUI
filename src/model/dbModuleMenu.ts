"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function findMenuByName(
    menuTitle: string,
    objectIdTypeName: string
) {
    try {
        const query = await prisma.menu.findFirst({
            where: {
                title: menuTitle,
                typeMenuId: objectIdTypeName
            },
        });
        return query;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function createMenu(
    menuTitle: string,
    objectIdTypeName: string,
    menuStatus: string,
    menuImage: string,
    menuPrice: number
) {
    try {
        const query = await prisma.menu.create({
            data: {
                title: menuTitle,
                status: menuStatus,
                price: menuPrice,
                thumbnailImage: menuImage,
                type: {
                    connect: { id: objectIdTypeName },
                },
            },
        });

        await prisma.typeMenu.update({
            where: { id: objectIdTypeName},
            data: {
                menus: { connect: { id: query.id } }
            }
        })

        return query;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function findMenuMany(objectIdTypeName: string) {
    try {
        const query = await prisma.menu.findMany({
            where: {
                typeMenuId: objectIdTypeName
            }
        })
        return query;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function deleteMenu(objectIdMenu: string) {
    try {
        const response = await prisma.menu.delete({
            where: {
                id: objectIdMenu,
            }
        })
        return response;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function updateMenu(newStatus: string, newPrice: number, objectIdMenu: string) {
    try {
        const response = await prisma.menu.update({
            where: {
                id: objectIdMenu,
            },
            data: {
                status: newStatus,
                price: newPrice,
            }
        })
        return response;
    } catch (err) {
        console.log(err);
        return null;
    }
}