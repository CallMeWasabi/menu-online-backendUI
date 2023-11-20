"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createTable(tableId: string, uuid: string, status: string) {
    try {
        await prisma.table.create({
            data: {
                uuid: uuid,
                value: tableId,
                status: status,
            },
        });
        return 1;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function findTable(tableId: string) {
    try {
        const tableFromDb = await prisma.table.findFirst({
            where: {
                value: tableId,
            },
        });
        return tableFromDb;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function updateTable(objectId: string, tableId: string, status: string) {
    try {
        await prisma.table.update({
            where: {
                id: objectId,
            },
            data: {
                value: tableId,
                status: status,
            }
        })
        return 1;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function updateUidTable(objectId: string) {
    try {
        const uuid = crypto.randomUUID();
        await prisma.table.update({
            where: {
                id: objectId,
            },
            data: {
                uuid: uuid,
            },
        });
        return uuid;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function loadInfoTable() {
    try {
        const query = await prisma.table.findMany({});
        return query;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function loadOnlineTable() {
    try {
        const query = await prisma.table.findMany({
            where: {
                status: "1"
            }
        })
        return query;
    }  catch (err) {
        console.log(err);
        return null;
    }
}