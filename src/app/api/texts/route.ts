import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { DelftText } from '@/types/schema';

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { title, cefrLevel, lessonNumber, dutchText, englishTranslation } = await req.json();

    if (!title || !cefrLevel || !lessonNumber || !dutchText || !englishTranslation) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Data Parsing Logic: Convert the incoming flat string into an array of strings by paragraph.
    // This perfectly aligns with our Phase 1 array requirement.
    const parsedTextArray = dutchText
      .split(/\n\s*\n/) // Split strictly by double newlines (paragraphs)
      .map((p: string) => p.trim().replace(/\n/g, ' ')) // Clean up internal single newlines
      .filter((p: string) => p.length > 0); // Drop any accidental empty blocks

    const newText = new DelftText({
      title,
      cefrLevel,
      lessonNumber,
      text: parsedTextArray,
      englishTranslation,
    });

    const savedText = await newText.save();

    return NextResponse.json({ success: true, text: savedText });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const texts = await DelftText.find().sort({ cefrLevel: 1, lessonNumber: 1 }).lean();
    return NextResponse.json(texts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  await dbConnect();
  try {
    const { _id, title, cefrLevel, lessonNumber, dutchText, englishTranslation } = await req.json();

    if (!_id || !title || !cefrLevel || !lessonNumber || !dutchText || !englishTranslation) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const parsedTextArray = dutchText
      .split(/\n\s*\n/)
      .map((p: string) => p.trim().replace(/\n/g, ' '))
      .filter((p: string) => p.length > 0);

    const updatedText = await DelftText.findByIdAndUpdate(
      _id,
      { title, cefrLevel, lessonNumber, text: parsedTextArray, englishTranslation },
      { new: true }
    );

    if (!updatedText) return NextResponse.json({ error: 'Text not found' }, { status: 404 });
    return NextResponse.json({ success: true, text: updatedText });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  await dbConnect();
  try {
    const { _id } = await req.json();
    if (!_id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    
    await DelftText.findByIdAndDelete(_id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
