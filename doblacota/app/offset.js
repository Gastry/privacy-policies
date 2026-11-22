const form = document.querySelector("[data-offset-form]");
const heightField = form.elements.height;
const angleField = form.elements.angle;
const radiusField = form.elements.radius;
const unitsField = form.elements.units;
const lengthFields = [heightField, radiusField];
const numberFields = [heightField, angleField, radiusField];
const results = document.querySelector("[data-results]");
const error = document.querySelector("[data-error]");
const locale = document.documentElement.lang;
const inputFormat = new Intl.NumberFormat(locale, {
  useGrouping: false,
  maximumSignificantDigits: 15,
});
const resultFormat = new Intl.NumberFormat(locale, { maximumFractionDigits: 4 });
let currentUnit = unitsField.value;

function decimal(text) {
  const value = text.trim();
  if (!/^(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(value)) return NaN;
  return Number(value.replace(",", "."));
}

function unitSize(unit) {
  return unit === "in" ? 2.54 : 1;
}

function offset(height, angle, radius) {
  const theta = angle * Math.PI / 180;
  const halfSine = Math.sin(theta / 2);
  const minimum = radius * 4 * halfSine ** 2;
  if (height - minimum < -32 * Number.EPSILON * Math.max(height, minimum)) {
    return { minimum };
  }
  const tangent = Math.max(0, height - minimum) / Math.sin(theta);
  // Series avoids cancellation of theta - sin(theta) for shallow bends.
  const delta = theta < 0.1
    ? theta ** 3 * (1 / 6 - theta ** 2 * (1 / 120 - theta ** 2 / 5040))
    : theta - Math.sin(theta);
  return {
    spacing: radius * theta + tangent,
    shrink: tangent * 2 * halfSine ** 2 + 2 * radius * delta,
  };
}

function showError(message, fields) {
  for (const field of fields) field.setAttribute("aria-invalid", "true");
  results.hidden = true;
  error.hidden = false;
  error.textContent = message;
}

function measure(value) {
  const formatted = resultFormat.format(value);
  return formatted === "0" && value > 0 ? "< 0.0001".replace(".", locale === "es" ? "," : ".") : formatted;
}

function update() {
  for (const field of numberFields) field.removeAttribute("aria-invalid");
  const height = decimal(heightField.value);
  const angle = decimal(angleField.value);
  const radius = decimal(radiusField.value);
  const cm = unitSize(currentUnit);
  if (!(height > 0 && height * cm <= 1e7)) {
    showError(form.dataset.heightError, [heightField]);
    return;
  }
  if (!(angle >= 0.1 && angle <= 89.9)) {
    showError(form.dataset.angleError, [angleField]);
    return;
  }
  if (!(radius >= 0 && radius * cm <= 1e7)) {
    showError(form.dataset.radiusError, [radiusField]);
    return;
  }

  const calculation = offset(height, angle, radius);
  if ("minimum" in calculation) {
    const limit = Math.ceil(calculation.minimum * 1e4) / 1e4;
    showError(form.dataset.geometryError.replace("{min}", `${measure(limit)} ${currentUnit}`), lengthFields);
    return;
  }
  error.hidden = true;
  error.textContent = "";
  results.querySelector("[data-spacing]").textContent = `${measure(calculation.spacing)} ${currentUnit}`;
  results.querySelector("[data-shrink]").textContent = `${measure(calculation.shrink)} ${currentUnit}`;
  results.hidden = false;
}

unitsField.addEventListener("change", () => {
  const multiplier = unitSize(currentUnit) / unitSize(unitsField.value);
  for (const field of lengthFields) {
    const value = decimal(field.value);
    if (Number.isFinite(value)) field.value = inputFormat.format(value * multiplier);
  }
  currentUnit = unitsField.value;
  for (const label of form.querySelectorAll("[data-unit]")) label.textContent = currentUnit;
  update();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  update();
  if (!error.hidden) form.querySelector('[aria-invalid="true"]').focus();
});

form.hidden = false;
update();
