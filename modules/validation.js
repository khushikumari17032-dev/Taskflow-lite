export function validateTaskInput(text) {
  const error = document.getElementById("error-msg");

  if (!text.trim()) {
    error.textContent = "Task cannot be empty";
    return false;
  }

  if (text.length > 50) {
    error.textContent = "Max 50 characters allowed";
    return false;
  }

  error.textContent = "";
  return true;
}