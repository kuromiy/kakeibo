import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z.string()
    .min(1, "金額を入力してください")
    .refine(
      (val) => /^\d+$/.test(val) && parseInt(val) > 0,
      "1円以上の数値を入力してください"
    )
    .refine(
      (val) => parseInt(val) <= 10000000,
      "金額が上限を超えています（1,000万円以下）"
    ),
  
  categoryId: z.string().min(1, "カテゴリを選択してください"),
  
  date: z.date({
    message: "有効な日付を選択してください"
  }),
  
  memo: z.string()
    .max(200, "メモは200文字以内で入力してください")
    .optional()
    .or(z.literal(""))
});

// フォームデータの型を生成
export type TransactionFormData = z.infer<typeof transactionSchema>;

// 個別フィールドのバリデーション用スキーマ
export const amountSchema = transactionSchema.shape.amount;
export const categorySchema = transactionSchema.shape.categoryId;
export const dateSchema = transactionSchema.shape.date;
export const memoSchema = transactionSchema.shape.memo;