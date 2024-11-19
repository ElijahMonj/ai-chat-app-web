import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ authenticated: false, message: "Not authenticated" }, { status: 401 });
    }

    try {
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

        // Return the uploaded image URL
        return NextResponse.json({
            success: true,
            url: result.secure_url,  // The URL of the uploaded avatar
        });

    } catch (error) {
        console.error('Error uploading avatar:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
    }
}
