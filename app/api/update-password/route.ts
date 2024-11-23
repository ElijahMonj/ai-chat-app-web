import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { id, newPassword, confirmPassword } = await request.json();

        // Validate input
        if (!id || !newPassword || !confirmPassword) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            return NextResponse.json(
                { message: "Passwords do not match" },
                { status: 400 }
            );
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            { message: "Error updating password", error: errorMessage },
            { status: 500 }
        );
    }
}
