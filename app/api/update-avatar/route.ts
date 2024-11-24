
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {

    try {
        const user = await getCurrentUser();  // Get the current user
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        const formData = await request.formData();  // Get the form data
        const avatar = formData.get('avatar');  // The file input field name is 'avatar'

        if (!avatar || !(avatar instanceof Blob)) {
            return NextResponse.json({ success: false, message: "No avatar uploaded" }, { status: 400 });
        }

        // Convert the avatar Blob to a Buffer
        const avatarBuffer = Buffer.from(await avatar.arrayBuffer());

        // Upload to Cloudinary using the Buffer
        const result: { secure_url: string } = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'avatars',  // Optional folder for avatars
                    use_filename: true,
                    unique_filename: true,
                    resource_type: 'auto',  // Automatically determine file type
                },
                (error, uploadResult) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (uploadResult) {
                            resolve(uploadResult);
                        } else {
                            reject(new Error('Upload result is undefined'));
                        }
                    }
                }
            ).end(avatarBuffer); // Pass the buffer instead of stream
        });

        // Update the user's avatar URL in the database
        await prisma.user.update({
            where: { id: user.id },
            data: { image: result.secure_url },
        });

        // Return the uploaded image URL
        return NextResponse.json({
            success: true,
        });

    } catch (error) {
        console.error('Error uploading avatar:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
    }
}