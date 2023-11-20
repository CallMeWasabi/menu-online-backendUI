"use server";

import qrcode from "qrcode";
import fs from "fs";


export async function generateFileQr(text: string) {
    qrcode.toFile("src/app/create/cache/qrcode.png", text, (err) => {
        if (err) throw err;
    });
    const imageUrl = await base64Convert(
        "D://resource/menu-online-system/controls-webapp/src/app/create/cache/qrcode.png"
    );
    return imageUrl;
}

export async function base64Convert(pathImage: string) {
    const data = fs.readFileSync(pathImage);
    const base64data = data.toString("base64");

    const mimeType = "image/png";
    const base64url = `data:${mimeType};base64,${base64data}`;
    return base64url;
}
