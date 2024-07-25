import connectDB from "@/app/db/conectDb"
import AdminModel from "@/app/db/models/Admin"
import CryptoJS from "crypto-js"
import { connect } from "mongoose"
import { NextResponse } from "next/server"

/**
 * Generates a random 8-digit password.
 * If the generated password is less than 8 digits, it recursively generates a new one.
 *
 * @returns {number} An 8-digit random password.
 */
const generatePassword = () => {
    let pass = Math.floor(Math.random() * 99999999);
    if (pass < 10000000) {
        return generatePassword();
    } else {
        return pass;
    }
}

/**
 * Encrypts a given password using AES encryption.
 *
 * @param {string} pass - The password to be encrypted.
 * @returns {string} The encrypted password (ciphertext).
 */
const encrypt = (pass) => {
    var ciphertext = CryptoJS.AES.encrypt(pass, process.env.SECURITY_KEY).toString();
    console.log(ciphertext);
    return ciphertext;
}

/**
 * Handles the POST request to create a new admin.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A promise that resolves to a NextResponse indicating success.
 */
export async function POST(request) {
    // Parse the request body as JSON
    const body = await request.json();

    // Generate a new password
    const password = generatePassword();
    console.log(password);

    // Connect to the database
    await connectDB();

    // Create a new admin record
    let admin = await AdminModel.create({
        name: body.name,
        email: body.email,
        password: encrypt(`${password}`),
        Permission: body.permission
    });

    // Save the admin record to the database
    await admin.save();

    // Send a welcome email to the new admin (commented out)
    // welcomeAdminMail(req.body.email, req.body.name, password, admin._id.toString());

    // Return a success response
    return new NextResponse("success");
}