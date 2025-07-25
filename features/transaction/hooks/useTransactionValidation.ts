import { useState, useCallback } from 'react';
import { z } from 'zod';
import { 
  transactionSchema, 
  amountSchema, 
  categorySchema, 
  dateSchema, 
  memoSchema 
} from '../schemas/transactionSchema';

export interface ValidationErrors {
  amount?: string;
  category?: string; 
  date?: string;
  memo?: string;
}

export const useTransactionValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  // 個別フィールドのバリデーション
  const validateField = useCallback((field: string, value: any): string | undefined => {
    try {
      switch (field) {
        case 'amount':
          amountSchema.parse(value);
          break;
        case 'category':
          categorySchema.parse(value);
          break;
        case 'date':
          dateSchema.parse(value);
          break;
        case 'memo':
          memoSchema.parse(value);
          break;
        default:
          return undefined;
      }
      return undefined; // エラーなし
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.issues[0]?.message;
      }
      return 'バリデーションエラーが発生しました';
    }
  }, []);

  // 個別フィールドエラーの更新
  const updateFieldError = useCallback((field: keyof ValidationErrors, error?: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  }, []);

  // リアルタイムバリデーション（onChange用）
  const validateFieldAndUpdate = useCallback((field: keyof ValidationErrors, value: any) => {
    const error = validateField(field, value);
    updateFieldError(field, error);
    return !error;
  }, [validateField, updateFieldError]);

  // 全体バリデーション
  const validateAll = useCallback((formData: {
    amount: string;
    categoryId: string;
    date: Date;
    memo: string;
  }): { isValid: boolean; errors: ValidationErrors } => {
    try {
      transactionSchema.parse(formData);
      
      // バリデーション成功時はエラーをクリア
      const noErrors = {};
      setErrors(noErrors);
      
      return { isValid: true, errors: noErrors };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: ValidationErrors = {};
        
        error.issues.forEach((err: any) => {
          const field = err.path[0] as string;
          if (field === 'categoryId') {
            fieldErrors.category = err.message;
          } else if (field in fieldErrors || field === 'amount' || field === 'date' || field === 'memo') {
            (fieldErrors as any)[field] = err.message;
          }
        });
        
        setErrors(fieldErrors);
        return { isValid: false, errors: fieldErrors };
      }
      
      const generalError = { amount: 'バリデーションエラーが発生しました' };
      setErrors(generalError);
      return { isValid: false, errors: generalError };
    }
  }, []);

  // フォーム全体が有効かどうか
  const isValid = useCallback((formData: {
    amount: string;
    categoryId: string;
    date: Date;
    memo: string;
  }): boolean => {
    try {
      transactionSchema.parse(formData);
      return true;
    } catch {
      return false;
    }
  }, []);

  // エラーをクリア
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // 特定フィールドのエラーをクリア
  const clearFieldError = useCallback((field: keyof ValidationErrors) => {
    setErrors(prev => ({
      ...prev,
      [field]: undefined
    }));
  }, []);

  return {
    errors,
    validateField,
    validateFieldAndUpdate,
    validateAll,
    isValid,
    updateFieldError,
    clearErrors,
    clearFieldError
  };
};