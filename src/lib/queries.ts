import dbConnect from './mongodb';
import { DelftText } from '@/types/schema';

export type DelftTextDoc = {
  _id: any;
  title: string;
  cefrLevel: string;
  lessonNumber: number;
  isCompleted: boolean;
};

export async function getAllDelftTexts(): Promise<DelftTextDoc[]> {
  await dbConnect();
  
  const texts = await DelftText.find()
    .select('title _id cefrLevel lessonNumber isCompleted')
    .sort({ lessonNumber: 1 })
    .lean();
    
  return texts as unknown as DelftTextDoc[];
}
