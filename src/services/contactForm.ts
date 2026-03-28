export type ContactFormPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
};

const CONTACT_EMAIL = "starosta.ing@gmail.com";
const FORMSUBMIT_TOKEN = "0523cca1d66f8f5aefffd5f3270b1550";
const ENDPOINT = `https://formsubmit.co/ajax/${FORMSUBMIT_TOKEN}`;

export async function submitContactForm(payload: ContactFormPayload) {
  const formData = new FormData();
  formData.append("First name", payload.firstName);
  formData.append("Last name", payload.lastName);
  formData.append("Phone", payload.phone);
  formData.append("Email", payload.email);
  formData.append("Message / Notes", payload.message);
  formData.append("Website source", "starostaindustrial.com");
  formData.append("_subject", "New contact request from starostaindustrial.com");
  formData.append("_template", "table");
  formData.append("_captcha", "false");

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || data?.success === "false") {
    const message = data?.message || "Contact form submission failed.";
    throw new Error(message);
  }

  return data;
}
