import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { DelftText } from '@/types/schema';

export async function GET(req: Request, { params }: { params: Promise<{ textId: string }> }) {
  await dbConnect();
  try {
    const { textId } = await params;
    const text = await DelftText.findById(textId).lean() as any;
    if (!text) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Fetch adjacent lessons within the same CEFR level
    const [prevLesson, nextLesson] = await Promise.all([
      DelftText.findOne({ cefrLevel: text.cefrLevel, lessonNumber: text.lessonNumber - 1 })
        .select('_id title lessonNumber').lean(),
      DelftText.findOne({ cefrLevel: text.cefrLevel, lessonNumber: text.lessonNumber + 1 })
        .select('_id title lessonNumber').lean(),
    ]);

    return NextResponse.json({ ...text, prevLesson: prevLesson || null, nextLesson: nextLesson || null });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ textId: string }> }) {
  await dbConnect();
  try {
    const { textId } = await params;
    const body = await req.json();
    const { isCompleted } = body;
    if (typeof isCompleted !== 'boolean') {
      return NextResponse.json({ error: 'isCompleted must be a boolean' }, { status: 400 });
    }
    const updated = await DelftText.findByIdAndUpdate(
      textId,
      { isCompleted },
      { new: true }
    ).lean();
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ textId: string }> }) {
  await dbConnect();
  try {
    const { textId } = await params;
    const { isCompleted } = await req.json();
    
    if (typeof isCompleted !== 'boolean') {
      return NextResponse.json({ error: 'isCompleted must be a boolean' }, { status: 400 });
    }
    
    const updated = await DelftText.findByIdAndUpdate(
      textId,
      { isCompleted },
      { new: true }
    ).lean();
    
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
