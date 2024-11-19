
import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma';
import getSession from "@/app/actions/getSession";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request:Request){

    const session = await getSession();
    if(!session||!session.user){
        console.log("No session");
        return NextResponse.json({authenticated:!!session});
    }
    const body = await new Response(request.body).json()

    const {name,tagline,description,greeting,prompt,avatar,isPublic} = body;
    if(!name || !tagline || !description || !greeting || !prompt || !avatar){
        return NextResponse.json({error:"Missing required fields"});
    }

    try {

        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        // Create the AI in the database
        const newAI = await prisma.aI.create({
            data: {
                name,
                description,
                isPublic,
                prompt,
                tagline,
                greeting,
                avatar,
                creator: {
                    connect: { id: user.id }, // Link the AI to the authenticated user
                },
            },
        });

        return NextResponse.json(newAI, { status: 201 });
    } catch (error) {
        console.error("Error creating AI:", error);
        return NextResponse.json({ error: "Failed to create AI" }, { status: 500 });
    }
}