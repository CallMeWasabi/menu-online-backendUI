"use server";

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function findTypeName(typeName: string) {
    try {
        const query = await prisma.typeMenu.findFirst({
            where: {
                title: typeName
            }
        })
        return query;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function createTypeName(typeName: string, status: string, image: string) {
    try {
        const response = await prisma.typeMenu.create({
            data: {
                title: typeName,
                status: status,
                thumbnailImage: image,
            },
            include: {
                menus: true
            }
        })
        return response;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function loadTypeName() {
    try {
        const query = await prisma.typeMenu.findMany({ include: { menus: true }});
        return query;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function loadTypeNameOnline() {
    try {
        const query = await prisma.typeMenu.findMany({
            where: {
                status: "1",
            },
            include: {
                menus: true,
            }
        })
        return query;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function deleteType(typeMenuId: string) {
    try {
        const response = await prisma.typeMenu.delete({
            where: {
                id: typeMenuId,
            }
        })
        return response;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function updateStatusTypeName(newStatus: string, typeMenuId: string) {
    try {
        const response = await prisma.typeMenu.update({
            where: {
                id: typeMenuId,
            },
            data: {
                status: newStatus,
            }
        })
        return response;
    } catch (err) {
        console.log(err);
        return null;
    }
}