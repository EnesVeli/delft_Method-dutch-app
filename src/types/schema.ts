import mongoose from 'mongoose';

const DelftTextSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: [{ type: String, required: true }],
  englishTranslation: { type: String, required: true },
  cefrLevel: { type: String, enum: ['A1', 'A2', 'B1'], required: true, default: 'A1' },
  lessonNumber: { type: Number, required: true, default: 1 },
  isCompleted: { type: Boolean, default: false },
});

const VocabularyWordSchema = new mongoose.Schema({
  dutchWord: { type: String, required: true },
  englishMeaning: { type: String, required: true },
  spacedRepetitionInterval: { type: Number, default: 1 },
  sourceTextId: { type: mongoose.Schema.Types.ObjectId, ref: 'DelftText', default: null },
  sourceCefrLevel: { type: String, default: null },
  sourceLessonNumber: { type: Number, default: null },
});

const UserProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  lastReadTextId: { type: mongoose.Schema.Types.ObjectId, ref: 'DelftText', default: null },
  savedVocabularyWordIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VocabularyWord' }],
});

export const VocabularyWord = mongoose.models.VocabularyWord || mongoose.model('VocabularyWord', VocabularyWordSchema);
export const UserProgress = mongoose.models.UserProgress || mongoose.model('UserProgress', UserProgressSchema);
export const DelftText = mongoose.models.DelftText || mongoose.model('DelftText', DelftTextSchema, 'texts');
