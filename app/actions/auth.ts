import { SignupFormStateType } from "@/components/forms/signup";
import { SignupFormSchema } from "@/components/forms/signup/validations";

export async function signup(state: SignupFormStateType, formData: FormData) {
  console.log("Signup action called", state, formData);
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      form: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...

  return {
    form: Object.fromEntries(formData.entries()),
  };
}
