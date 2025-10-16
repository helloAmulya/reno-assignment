import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

const schoolSchema = z.object({
    name: z.string().min(1, "School Name is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    contact: z.string().min(1, "Contact is required"),
    email_id: z.string().email("Invalid email address"),
    image: z.string().min(1, "Image is required"),
});

export async function GET() {
    const schools = await prisma.school.findMany();
    return NextResponse.json(schools);
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const validatedData = schoolSchema.parse(data);

        const newSchool = await prisma.school.create({
            data: {
                ...validatedData
            },
        });


        return NextResponse.json({ newSchool }, { status: 201 });
    } catch (e: unknown) {
        if (e instanceof z.ZodError) {
            return NextResponse.json({ error: e.errors }, { status: 400 });
        }
        
        console.error(e);

        return NextResponse.json({ error: "Error creating school" }, { status: 500 });
    }
}

