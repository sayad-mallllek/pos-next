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
