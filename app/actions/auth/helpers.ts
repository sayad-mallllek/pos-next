type FormHandlerResult<TResult extends Record<string, unknown> | void> =
  TResult | void;

export function withFormState<
  TForm,
  TResult extends Record<string, unknown> | void
>(
  readForm: (formData: FormData) => TForm,
  handler: (
    form: TForm,
    formData: FormData
  ) => Promise<FormHandlerResult<TResult>>
) {
  return async function formAction(
    _state: { form: TForm } | undefined,
    formData: FormData
  ): Promise<{ form: TForm } & (TResult extends void ? {} : TResult)> {
    const form = readForm(formData);
    const result = await handler(form, formData);

    if (!result) {
      return { form } as { form: TForm } & (TResult extends void
        ? {}
        : TResult);
    }

    return {
      form,
      ...result,
    } as { form: TForm } & (TResult extends void ? {} : TResult);
  };
}

export async function tryCatch<T>(callback: () => Promise<T>): Promise<
  | { response: T; error: null }
  | {
      response: null;
      error: { message?: string };
    }
> {
  // ): Promise<{ response: T | null; error: {message?: string} | null }> {
  try {
    const response = await callback();
    return { response, error: null };
  } catch (error) {
    return {
      response: null,
      error: {
        message: error instanceof Error ? error.message : String(error),
      },
    };
  }
}
