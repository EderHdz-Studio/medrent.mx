import { extractDigits } from "./phoneUtils.js";

export function initForm(formId) {
  // ...código completo de formValidator.js...
  const form = document.getElementById(formId);
  if (!form) return;
  /* =============================
     SELECTORES BASE
  ============================== */
  const nameInput = form.querySelector('[name="name"]');
  const emailInput = form.querySelector('[name="email"]');
  const phoneWrapper = form.querySelector('.form-phone');
  const phoneInput = phoneWrapper?.querySelector('.phone-input');
  const selectInput = form.querySelector('select[name="specialty"]');
  const checkbox = form.querySelector('input[type="checkbox"]');
  const submitBtn = form.querySelector('.submit-btn');
  const status = form.querySelector('.status');
  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-primary').trim();
  const greenDarkColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-green-dark').trim();
  // ...resto del código de formValidator.js...
}