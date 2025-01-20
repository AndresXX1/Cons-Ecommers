import { RegisterProps } from "../pages/Login/Register";

export function validateInputs(inputs: RegisterProps) {
  const errors: RegisterProps = {
    name: "",
    email: "",
    cuil: "",
    phone: "",
    birthday: "",
    password: "",
  };

  // Validar nombre
  if (!inputs.name.trim()) {
    errors.name = "Introduce un nombre.";
  } else if (inputs.name.length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres.";
  } else if (inputs.name.length > 28) {
    errors.name = "El nombre no debe exceder los 28 caracteres.";
  } else if (!/^\S.*\S$|^\S$/.test(inputs.name)) {
    errors.name = "El nombre no puede tener espacios al inicio o al final.";
  }

  // Validar email
  if (!inputs.email) {
    errors.email = "Introduce un correo electrónico.";
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inputs.email)) {
    errors.email = "Correo electrónico no válido.";
  }

  // Validar CUIL
  if (!inputs.cuil) {
    errors.cuil = "Introduce un CUIL.";
  } else if (!/^[0-9]{11}$/.test(inputs.cuil)) {
    errors.cuil = "El CUIL debe contener exactamente 11 números.";
  }

  // Validar teléfono
  if (!inputs.phone.trim()) {
    errors.phone = "Introduce un número de teléfono.";
  } else if (!/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(inputs.phone)) {
    errors.phone = "Introduce un número de teléfono válido.";
  }

  // Validar fecha de nacimiento
  if (!inputs.birthday.trim()) {
    errors.birthday = "Introduce una fecha de nacimiento.";
  } else {
    const birthdayDate = new Date(inputs.birthday);
    const today = new Date();
    const date18YearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    if (isNaN(birthdayDate.getTime())) {
      errors.birthday = "Introduce una fecha válida.";
    } else if (birthdayDate > date18YearsAgo) {
      errors.birthday = "Debes tener al menos 18 años para registrarte.";
    }
  }

  // Validar contraseña
  if (!inputs.password) {
    errors.password = "Introduce una contraseña.";
  } else if (inputs.password.length < 6 || inputs.password.length > 20) {
    errors.password = "La contraseña debe tener entre 6 y 20 caracteres.";
  }

  return errors;
}
