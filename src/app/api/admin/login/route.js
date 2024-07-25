import connectDB from "@/app/db/conectDb"
import connectAdminDB from "@/app/db/connectAdminDb"
import AdminModel from "@/app/db/models/Admin"
import { NextResponse } from "next/server"
import CryptoJS from "crypto-js"

/**
 * Decrypts a password using AES encryption.
 * @param {string} pass - The password to decrypt.
 * @returns {string} - The decrypted password.
 */
const decrypt = (pass)=>{
    const bytes  = CryptoJS.AES.decrypt(pass, process.env.SECURITY_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}

/**
 * Handles POST requests to retrieve an admin by ID.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object with status 200 if admin is found, otherwise 404.
 */
export async function POST(request) {
    const body = await request.json();
    const id = body.id;
    connectDB();
    const admin = await AdminModel.findById(id);
    if (admin) {
        return new NextResponse({ status: 200 });
    } else {
        return new NextResponse({ status: 404 });
    }
}

export async function PATCH(request){
    const body =await request.json()
    const id = body.id
    const pass = body.pass
    connectDB()
    const admin = await AdminModel.findById(id)
    if(decrypt(pass) == admin.pass){
        return new NextResponse({
            status: 200,
            details: {
                name: admin.name,
                email: admin.email,
                avatar: admin?.avatar
            },
            parmission: admin.Permission
        })
    }else{
        return new NextResponse({status: 404})
    }
}