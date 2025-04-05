import { useState, useCallback } from 'react';

type ValidationRule<T> = {
  field: keyof T;
  validate: (value: any) => boolean | string;
};

type FormConfig<T> = {
  initialValues: T;
  validationRules?: ValidationRule<T>[];
  onSubmit: (values: T) => Promise<void> | void;
};

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules = [],
  onSubmit,
}: FormConfig<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback((field: keyof T, value: any) => {
    const rule = validationRules.find(r => r.field === field);
    if (!rule) return '';

    const result = rule.validate(value);
    return typeof result === 'string' ? result : result ? '' : '验证失败';
  }, [validationRules]);

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    validationRules.forEach(rule => {
      const error = validateField(rule.field, values[rule.field]);
      if (error) {
        newErrors[rule.field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules, validateField]);

  const handleChange = useCallback((
    field: keyof T,
    value: any,
    shouldValidate = true
  ) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));

    if (shouldValidate) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: error,
      }));
    }
  }, [validateField]);

  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, values[field]);
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  }, [values, validateField]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    handleChange(field, value, false);
  }, [handleChange]);

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    validateField,
    validateForm,
  };
}

// 使用示例：
// interface LoginForm {
//   email: string;
//   password: string;
// }
//
// const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm<LoginForm>({
//   initialValues: {
//     email: '',
//     password: '',
//   },
//   validationRules: [
//     {
//       field: 'email',
//       validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || '请输入有效的邮箱地址',
//     },
//     {
//       field: 'password',
//       validate: (value) => value.length >= 6 || '密码长度至少为6位',
//     },
//   ],
//   onSubmit: async (values) => {
//     // 处理表单提交
//     console.log('Form submitted:', values);
//   },
// }); 