import { NextRequest, NextResponse } from "next/server";

// export const GET = async () : Promise<Response> => {
//     return Response.json({
//         isLogin: true
//     })
// }

export const POST = async (req : NextRequest) => {
    let validForm = true;
    const body = await req.json();
    // console.log(body);


    if (validForm) {
        return new Response(JSON.stringify({valid: true}), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 200
        })
    } else {
        return new Response(JSON.stringify({valid: false, errorMsg: 'Invalid input.'}), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 400
        })
    }
}