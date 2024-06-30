import { NextRequest, NextResponse } from "next/server"

// export const config = {
//     api: {
//       bodyParser: true,
//     },
//   };

export async function POST(req, res) {
        const {amount} = req.body;
        console.log(req)
        console.log(amount)
        return NextResponse.redirect(new URL('/', req.url))
}

// export async function POST(request) {
//     const body = await request
//     console.log(body)
//     return NextResponse.redirect(new URL('/', request.url))
// }