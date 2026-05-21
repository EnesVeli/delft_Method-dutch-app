import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { VocabularyWord } from '@/types/schema';

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { dutchWord, englishMeaning, sourceTextId, sourceCefrLevel, sourceLessonNumber } = await req.json();
    if (!dutchWord || !englishMeaning) {
      return NextResponse.json({ error: 'Missing word or meaning' }, { status: 400 });
    }

    const word = new VocabularyWord({
      dutchWord,
      englishMeaning,
      spacedRepetitionInterval: 1,
      sourceTextId: sourceTextId || null,
      sourceCefrLevel: sourceCefrLevel || null,
      sourceLessonNumber: sourceLessonNumber || null,
    });
    await word.save();

    return NextResponse.json({ success: true, word });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const words = await VocabularyWord.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(words);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  await dbConnect();
  try {
    const { _id, dutchWord, englishMeaning } = await req.json();
    if (!_id || !dutchWord || !englishMeaning) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const updated = await VocabularyWord.findByIdAndUpdate(
      _id,
      { dutchWord, englishMeaning },
      { new: true }
    );
    if (!updated) return NextResponse.json({ error: 'Word not found' }, { status: 404 });
    return NextResponse.json({ success: true, word: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  await dbConnect();
  try {
    const { _id } = await req.json();
    if (!_id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    await VocabularyWord.findByIdAndDelete(_id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
