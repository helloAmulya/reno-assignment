import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("image") as unknown as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File is not an image." }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const extension = file.name.split(".").pop();
  const filename = `${uuidv4()}.${extension}`;
  const uploadDir = join(process.cwd(), "public", "schoolImages");
  const path = join(uploadDir, filename);

  try {
    await writeFile(path, buffer);
    console.log(`File saved to ${path}`);
    return NextResponse.json({ imagePath: `/schoolImages/${filename}` });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json(
      { error: "Error saving file." },
      { status: 500 }
    );
  }
}