import { extractDigits } from "./phoneUtils.js";

export function initForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  /* =============================
     SELECTORES BASE
  ============================== */

  const nameInput = form.querySelector('[name="name"]');
  const emailInput = form.querySelector('[name="email"]');
  const phoneWrapper = form.querySelector(".form-phone");
  const phoneInput = phoneWrapper?.querySelector(".phone-input");
  const selectInput = form.querySelector('select[name="specialty"]');
  const checkbox = form.querySelector('input[type="checkbox"]');
  const submitBtn = form.querySelector(".submit-btn");
  const otraEspecialidadInput = form.querySelector(
    '[name="otras_especialidades"]',
  );

  // Guardar el texto original del botón para restaurarlo después
  const originalSubmitText = submitBtn ? submitBtn.textContent : "Enviar";
  const status = form.querySelector(".status");

  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-primary")
    .trim();

  const greenDarkColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-green-dark")
    .trim();

  /* =============================
  SUBMIT CON MANEJO DE ESTADO
  ============================== */
  const wrapper = form.closest(".form-wrapper");
  const formContainer = wrapper?.querySelector(".form-container");
  const successBox = wrapper?.querySelector(".form-success");
  const errorBox = wrapper?.querySelector(".form-error");
  const errorRetryBtn = errorBox?.querySelector("button.retry-btn");

  function setState(state) {
    formContainer?.classList.add("hidden");
    successBox?.classList.add("hidden");
    errorBox?.classList.add("hidden");

    if (state === "form") {
      formContainer?.classList.remove("hidden");
    }

    if (state === "success") {
      successBox?.classList.remove("hidden");
    }

    if (state === "error") {
      errorBox?.classList.remove("hidden");
    }
  }

  // Utilidad para restaurar estado visual de los inputs
  function resetInputsVisual() {
    if (nameInput) setInitial(nameInput);
    if (emailInput) setInitial(emailInput);
    if (phoneInput) setInitial(phoneInput);
    if (selectInput) setInitial(selectInput);
    if (checkbox) checkbox.checked = false;
    if (otraEspecialidadInput) setInitial(otraEspecialidadInput);
  }

  // Asegura que el formulario se muestre correctamente al dar click en el botón de reintentar
  errorRetryBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    setTimeout(() => {
      setState("form");
      form.reset();
      resetInputsVisual();
      validateAll();
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Agendar una DEMO";
      }
    }, 50); // pequeño delay para asegurar el cambio de estado
  });

  /* =============================
     UTILIDADES VISUALES
  ============================== */

  // Mensaje de ayuda para el input de teléfono
  let phoneHelper = phoneWrapper?.querySelector(".phone-helper");
  if (!phoneHelper && phoneWrapper) {
    phoneHelper = document.createElement("div");
    phoneHelper.className =
      "phone-helper text-[12px] mt-1 text-left text-[#171D1C]";
    phoneWrapper.appendChild(phoneHelper);
  }

  function setInitial(input) {
    input.style.removeProperty("outline");
    input.style.removeProperty("background");
    input.style.removeProperty("border");
    const container = input.closest(".relative");
    const label = container?.querySelector("label");
    if (label) label.style.background = "#3D4948";
    if (input.tagName === "SELECT") {
      input.classList.remove("success");
      input.classList.remove("error");
    }
    // Mensaje inicial para teléfono
    if (input === phoneInput && phoneHelper) {
      // phoneHelper.innerHTML = 'Incluye lada internacional. Ej.: +52 55 1234 5678';
      phoneHelper.innerHTML = "";
      phoneHelper.className =
        "phone-helper text-[12px] mt-1 text-left text-[#171D1C]";
    }
  }

  function setValid(input) {
    let label;
    if (input === phoneInput) {
      label = phoneWrapper?.querySelector(".phone-label");
    } else {
      const container = input.closest(".relative");
      label = container?.querySelector("label");
    }
    input.style.setProperty(
      "outline",
      `1px solid ${primaryColor}`,
      "important",
    );
    input.style.setProperty("background", "#fff", "important");
    input.style.setProperty("border", `1px solid ${primaryColor}`, "important");
    if (label) label.style.background = primaryColor;
    if (input.tagName === "SELECT") {
      input.classList.add("success");
      input.classList.remove("error");
      input.style.setProperty("color", "#171D1C", "important");
    }
    // Mensaje success para teléfono
    if (input === phoneInput && phoneHelper) {
      phoneHelper.innerHTML = "Número válido";
      phoneHelper.className =
        "phone-helper text-[12px] mt-1 text-left text-[#171D1C]";
    }
  }

  function setInvalid(input) {
    let label;
    if (input === phoneInput) {
      // Selecciona el label por clase dentro de .form-phone
      label = phoneWrapper?.querySelector(".phone-label");
    } else {
      const container = input.closest(".relative");
      label = container?.querySelector("label");
    }
    input.style.setProperty("outline", "1px solid #BA1A1A", "important");
    input.style.setProperty("background", "#FFEDEA", "important");
    input.style.setProperty("border", "1px solid #BA1A1A", "important");
    if (label) label.style.background = "#BA1A1A";
    if (input.tagName === "SELECT") {
      input.classList.add("error");
      input.classList.remove("success");
    }
    // Mensaje error para teléfono
    if (input === phoneInput && phoneHelper) {
      phoneHelper.innerHTML =
        "<strong>El número ingresado no tiene la cantidad correcta de dígitos.</strong><br>10 dígitos.";
      phoneHelper.className =
        "phone-helper text-[12px] mt-1 text-left text-[#171D1C]";
    }
  }

  /* =============================
     VALIDACIONES
  ============================== */

  function validateName() {
    if (!nameInput) return true;
    if (nameInput.value.trim() === "") {
      setInitial(nameInput);
      return false;
    }
    if (nameInput.value.trim().length >= 3) {
      setValid(nameInput);
      return true;
    }
    setInvalid(nameInput);
    return false;
  }

  function validateEmail() {
    if (!emailInput) return true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = emailInput.value.trim();
    if (value === "") {
      setInitial(emailInput);
      return false;
    }
    if (regex.test(value)) {
      setValid(emailInput);
      return true;
    }
    setInvalid(emailInput);
    return false;
  }
  // Validación visual en focusout y autocomplete para email
  if (emailInput) {
    // Focus out
    emailInput.addEventListener("blur", () => {
      if (emailInput.value.trim() !== "") {
        validateEmail();
      }
    });
    // Autocomplete: disparar validación al cambiar valor
    emailInput.addEventListener("change", () => {
      if (emailInput.value.trim() !== "") {
        validateEmail();
      }
    });
    // Para autofill de navegador
    emailInput.addEventListener("input", () => {
      if (emailInput.value.trim() !== "") {
        validateEmail();
      }
    });
  }

  function validatePhone() {
    if (!phoneInput) return true;
    const value = phoneInput.value.trim();
    // Si solo tiene lada (+52, +1, etc) y nada más, es error visual
    const ladaRegex = /^\+\d{1,3}$/;
    if (value === "") {
      setInitial(phoneInput);
      return false;
    }
    if (ladaRegex.test(value)) {
      setInvalid(phoneInput);
      return false;
    }
    const digits = extractDigits(value);
    if (digits.length == 10) {
      // if (digits.length >= 10) {
      setValid(phoneInput);
      return true;
    }
    setInvalid(phoneInput);
    return false;
  }

  function validateSelect() {
    if (!selectInput) return true;
    if (selectInput.value === "") {
      setInitial(selectInput);
      return false;
    }
    selectInput.classList.remove("text-[#A0A0A0]");
    setValid(selectInput);
    return true;
  }

  function validateOtraEspecialidad() {
    if (!otraEspecialidadInput || !otraEspecialidadInput.required) {
      return true; // No validar si no existe o no es requerido
    }
    if (otraEspecialidadInput.value.trim() === "") {
      setInitial(otraEspecialidadInput);
      return false;
    }
    if (otraEspecialidadInput.value.trim().length >= 4) {
      setValid(otraEspecialidadInput);
      return true;
    }
    setInvalid(otraEspecialidadInput);
    return false;
  }

  // Validación visual en onchange para select
  if (selectInput) {
    selectInput.addEventListener("change", () => {
      if (selectInput.value && selectInput.value !== "") {
        setValid(selectInput);
      } else {
        setInitial(selectInput);
      }
      validateAll();
    });
  }

  function validateCheckbox() {
    if (!checkbox) return true;
    return checkbox.checked;
  }

  function validateAll() {
    const valid =
      validateName() &&
      validateEmail() &&
      validatePhone() &&
      validateSelect() &&
      validateOtraEspecialidad() &&
      validateCheckbox();

    if (submitBtn) {
      submitBtn.disabled = !valid;

      if (valid) {
        submitBtn.classList.add("hover:bg-[#00827F]"); // color-accent
      } else {
        submitBtn.classList.remove("hover:bg-[#00827F]");
      }
    }

    return valid;
  }

  /* =============================
     DROPDOWN TELÉFONO (LOCAL)
  ============================== */

  if (phoneWrapper) {
    const phoneInput = phoneWrapper.querySelector(".phone-input");
    const dropdown = phoneWrapper.querySelector(".country-dropdown");

    // if (phoneInput && dropdown) {

    //   const openDropdown = () => dropdown.classList.remove('hidden');
    //   const closeDropdown = () => dropdown.classList.add('hidden');

    //   phoneInput.addEventListener('focus', openDropdown);
    //   phoneInput.addEventListener('click', (e) => {
    //     e.stopPropagation();
    //     openDropdown();
    //   });

    //   dropdown.querySelectorAll('.country-option').forEach(option => {
    //     option.addEventListener('click', (e) => {
    //       e.stopPropagation();

    //       const code = option.dataset.code;
    //       const current = phoneInput.value.replace(/^\+\d+\s*/, '');

    //       phoneInput.value = code + ' ' + current;
    //       phoneInput.focus();
    //       closeDropdown();
    //       validateAll();
    //     });
    //   });

    //   document.addEventListener('click', (e) => {
    //     if (!phoneWrapper.contains(e.target)) {
    //       closeDropdown();
    //     }
    //   });
    // }
  }

  /* =============================
     FORMATO INPUT TELÉFONO
  ============================== */

  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      let value = phoneInput.value;

      // Permitir solo números, espacios y un solo +
      value = value.replace(/[^\d+ ]/g, "");
      value = value.replace(/\++/g, "+");

      phoneInput.value = value;
      validateAll();
    });
  }

  /* =============================
     EVENTOS GENERALES
  ============================== */

  // Validación visual individual para cada campo
  nameInput?.addEventListener("input", validateName);
  emailInput?.addEventListener("input", validateEmail);
  phoneInput?.addEventListener("input", validatePhone);
  selectInput?.addEventListener("change", validateSelect);
  otraEspecialidadInput?.addEventListener("input", validateOtraEspecialidad);

  checkbox?.addEventListener("change", validateCheckbox);

  // Detectar autofill/autocomplete y disparar validación global
  // Esto cubre casos donde el navegador llena los campos y no dispara eventos individuales
  form.addEventListener("input", validateAll);
  form.addEventListener("change", validateAll);
  form.addEventListener("focusin", validateAll);

  /* =============================
     SUBMIT
  ============================== */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    // Cambiar texto y mostrar loader
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loader mr-2"></span>Enviando...';
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // UTM fields from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmFields = [
      "utm_term",
      "utm_medium",
      "utm_source",
      "utm_content",
      "utm_campaign",
    ];
    utmFields.forEach((field) => {
      data[field] = urlParams.get(field) || "";
    });

    // Static fields for HubSpot (add/update as needed)
    data["unidades_de_negocios"] = "MEDRENT";
    data["hs_all_assigned_business_unit_ids"] = "0";
    data["definicion_de_necesidad"] = "Compra Equipo Médico";

    // Tiempo mínimo de espera para mostrar el loader
    const minWait = (ms) => new Promise((res) => setTimeout(res, ms));
    let responseOk = false;
    let errorOccurred = false;
    let responseHubspot = "error";

    console.log("Submitting form with data:", data);

    try {
      const fetchPromise = fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          // Manejo de status específicos
          if (response.status === 400) {
            setState("error");
            console.log("Response 400:", response);
          } else if (response.status === 409) {
            console.log("Response 409:", response);
            form.reset();
            setState("success");
          } else if (response.ok) {
            console.log("Response 200:", response);
            form.reset();
            setState("success");
          } else {
            console.log("Response error:", response);
            setState("error");
          }

          sendFormEvent({ formId: formId, status: response.status });
          return response;
        })
        .catch((error) => {
          errorOccurred = true;
          console.error("Fetch error:", error);
        });
      await Promise.all([fetchPromise, minWait(1200)]); // 1.2 segundos mínimo
    } catch (error) {
      console.error(error);
      setState("error");
    } finally {
      // Restaurar texto original del botón
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalSubmitText;
      }
    }
  });
  // form.addEventListener('submit', async (e) => {
  //   e.preventDefault();

  //   if (!validateAll()) return;

  //   const formData = new FormData(form);
  //   const data = {};

  //   formData.forEach((value, key) => {
  //     data[key] = value;
  //   });

  //   // Validación mínima teléfono
  //   const phoneDigits = extractDigits(data.phone || '');
  //   if (phoneDigits.length < 10) {
  //     if (status) status.textContent = "❌ Número de teléfono inválido.";
  //     return;
  //   }

  //   try {
  //     const response = await fetch("/api/contact", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {
  //       if (status) status.textContent = "✅ Tu solicitud se envió correctamente.";
  //       form.reset();
  //       validateAll();
  //     } else {
  //       if (status) status.textContent = "❌ Hubo un problema al enviar.";
  //     }

  //   } catch (error) {
  //     if (status) status.textContent = "❌ Error de red.";
  //     console.error(error);
  //   }
  // });

  /* =============================
     INICIALIZACIÓN
  ============================== */
  //     console.log("Form initialized:", formId);
  // console.log("Phone wrapper:", phoneWrapper);
  // console.log("Dropdown:", dropdown);

  // No ejecutar validaciones al cargar la página. Solo tras interacción del usuario.
}

function sendFormEvent({ formId, status }) {
  const pathname = window.location.pathname;
  const pageTitle = document.title;
  let eventName;
  formId == "events-form" && document.querySelector("#event-popup-title")
    ? (eventName = document.querySelector("#event-popup-title").textContent)
    : (eventName = "");

  // Valores de formulario
  const full_name = document.querySelector('input[name="name"]')?.value || "";
  const email = document.querySelector('input[name="email"]')?.value || "";
  const phone = document.querySelector('input[name="phone"]')?.value || "";
  const institution =
    document.querySelector('input[name="lugar_de_trabajo"]')?.value || "";
  const medical_specialty =
    document.querySelector('select[name="specialty"]')?.value || "";
  const state = document.querySelector('select[name="estado_mx"]')?.value || "";
  const discovery_channel =
    document.querySelector('input[name="por_qu_medio_nos_conociste"]')?.value ||
    "";
  const product_interest =
    document.querySelector('input[name="multi_equipo__medrent_"]')?.value || "";
  const message =
    document.querySelector('textarea[name="message"]')?.value || "";

  // Checkboxes de equipo
  const equipoInteres = Array.from(
    document.querySelectorAll('input[name="equipoInteres[]"]:checked'),
  );
  const valoresStr =
    equipoInteres.length > 0
      ? equipoInteres.map((cb) => cb.value).join(",")
      : "";

  // Obtener datos de tracking desde la función
  const tracking = getTrackingData();

  // Construir objeto de evento
  const dataEventForm = {
    event: "generate_lead",
    event_data: {
      category: "Form Interaction",
      action: "Lead Generation",
      label: "Submit - " + pathname,
      page: pageTitle,
    },
    form_submission: {
      form_id: formId,
      form_data: {
        full_name: full_name,
        email: email,
        phone: phone,
        institution: institution,
        medical_specialty: medical_specialty,
        state: state,
        discovery_channel: discovery_channel,
        product_interest: valoresStr || product_interest,
        message: message,
        eventName: eventName,
        statusResponseHubspot: status || "error",
      },
    },
    tracking: tracking,
  };

  // Enviar al dataLayer
  window.dataLayer.push(dataEventForm);
}
