import * as crypto from "crypto";

export function md5(data: crypto.BinaryLike): string {
    return crypto.createHash("md5").update(data).digest("hex");
}

export function md5WithSalt(data: crypto.BinaryLike, salt: string): string {
    return md5(md5(data) + salt);
}

export function sha1(data: crypto.BinaryLike): string {
    return crypto.createHash("sha1").update(data).digest("hex");
}