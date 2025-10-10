const form = document.getElementById('ccForm');
const pwdToggle = document.getElementById('pwdToggle');
const resetBtn = document.getElementById('resetBtn');
const pwd = document.getElementById('password');


pwdToggle.addEventListener('click', () => {
  if (pwd.type === 'password') {
    pwd.type = 'text';
    pwdToggle.textContent = '🙈';
  } else {
    pwd.type = 'password';
    pwdToggle.textContent = '👁';
  }
});


resetBtn.addEventListener('click', () => {
  form.reset();
  pwd.type = 'password';
  pwdToggle.textContent = '👁';
});

const caterers = [
  { first: 'Sneh', last: 'Bhatt', password: '#Sb68', id: '1001', phone: normalizePhone('123-456-7890x123'), email: 'sneh.b@gmail.com' },
  { first: 'Ben', last: 'Carson', password: '#B2c', id: '1002', phone: normalizePhone('234 567 8901x456'), email: 'ben.c@gmail.org' },
  { first: 'Clara', last: 'Duke', password: '!C3d', id: '1003', phone: normalizePhone('345-678-9012x789'), email: 'clara.d@gmail.com' },
  { first: 'David', last: 'Evan', password: '%D4e', id: '1004', phone: normalizePhone('456 789 0123x101'), email: 'david.e@gmail.com' },
  { first: 'Eve', last: 'Foster', password: '$E5f', id: '1005', phone: normalizePhone('567-890-1234x111'), email: 'eve.f@gmail.com' },
  { first: 'Frank', last: 'Gale', password: '&F6g', id: '1006', phone: normalizePhone('678-901-2345x121'), email: 'frank.g@gmail.com' },
  { first: 'Grace', last: 'Hill', password: '*G7h', id: '1007', phone: normalizePhone('789-012-3456x131'), email: 'grace.h@gmail.com' },
  { first: 'Hector', last: 'Ives', password: '^H8i', id: '1008', phone: normalizePhone('890-123-4567x141'), email: 'hector.I@gmail.com' },
  { first: 'Isha', last: 'Jain', password: '!I9j', id: '1009', phone: normalizePhone('901-234-5678x151'), email: 'isha.j@gmail.com' },
  { first: 'Joel', last: 'King', password: '~J0k', id: '1010', phone: normalizePhone('012-345-6789x161'), email: 'joel.k@gmail.com' }
];

function normalizePhone(raw) {
  if (!raw) return '';
  const extMatch = raw.match(/(?:ext\.?|x)\s*([0-9]+)/i);
  const ext = extMatch ? extMatch[1] : '';
  const digits = raw.replace(/[^0-9]/g, '');
  return ext ? (digits.replace(ext, '').trim() + 'x' + ext) : digits;
}

function alertAndFocus(message, fieldId) {
  alert(message);
  const fld = document.getElementById(fieldId);
  if (fld) {
    fld.focus();
    try { fld.select(); } catch (e) {}
  }
}

function validate(formEl) {
  const first = formEl.firstName.value.trim();
  const last = formEl.lastName.value.trim();
  const phoneRaw = formEl.phone.value.trim();
  const id = formEl.catererId.value.trim();
  const password = formEl.password.value;
  const emailRequested = formEl.emailConfirm.checked;
  const email = formEl.email.value.trim();

  const nameRe = /^[A-Za-z][A-Za-z\s'\-]*$/;
  if (!first) return alertAndFocus("First name is required.", 'firstName'), false;
  if (!nameRe.test(first)) return alertAndFocus("Invalid first name format.", 'firstName'), false;

  if (!last) return alertAndFocus("Last name is required.", 'lastName'), false;
  if (!nameRe.test(last)) return alertAndFocus("Invalid last name format.", 'lastName'), false;

  if (!password) return alertAndFocus("Password is required.", 'password'), false;
  if (password.length > 5) return alertAndFocus("Password must be at most 5 characters long.", 'password'), false;
  if (!/^[^A-Za-z0-9]/.test(password)) return alertAndFocus("Password must start with a special character.", 'password'), false;
  if (!/[A-Z]/.test(password)) return alertAndFocus("Password must contain an uppercase letter.", 'password'), false;
  if (!/[0-9]/.test(password)) return alertAndFocus("Password must contain a number.", 'password'), false;
  if (!/[^A-Za-z0-9]/.test(password)) return alertAndFocus("Password must include a special character.", 'password'), false;

  if (!/^\d{4}$/.test(id)) return alertAndFocus("Caterer ID must be exactly 4 digits.", 'catererId'), false;

  const digitsOnly = phoneRaw.replace(/[^0-9]/g, '');
  const extOk = /(?:\b(?:x|ext)\.?\s*\d+)$/i.test(phoneRaw);
  if (!digitsOnly || digitsOnly.length < 10)
    return alertAndFocus("Phone number must include 10 digits (e.g., 123-456-7890 x123).", 'phone'), false;
  if (!extOk)
    return alertAndFocus("Phone number must include an extension using 'x' or 'ext'.", 'phone'), false;

  if (emailRequested) {
    if (!email)
      return alertAndFocus("Email is required when requesting confirmation.", 'email'), false;
    const emailRe = /^[^\s@]+@[^\s@]+\.[A-Za-z]{1,3}$/;
    if (!emailRe.test(email))
      return alertAndFocus("Invalid email format (must end with 1–3 letter domain).", 'email'), false;
  }

  return true;
}

function verify(formEl) {
  const first = formEl.firstName.value.trim();
  const last = formEl.lastName.value.trim();
  const id = formEl.catererId.value.trim();
  const password = formEl.password.value;
  const phoneRaw = formEl.phone.value.trim();
  const emailRequested = formEl.emailConfirm.checked;
  const email = formEl.email.value.trim();
  const normPhone = normalizePhone(phoneRaw);

  const found = caterers.find(c =>
    c.first.toLowerCase() === first.toLowerCase() &&
    c.last.toLowerCase() === last.toLowerCase() &&
    c.id === id &&
    c.password === password &&
    c.phone === normPhone &&
    (!emailRequested || c.email.toLowerCase() === email.toLowerCase())
  );

  if (!found) {
    alert(`Account for ${first} ${last} cannot be found.`);
    document.getElementById('firstName').focus();
    return false;
  }

  const transaction = formEl.transaction.value;
  alert(`Welcome ${found.first} ${found.last}! You selected: ${transaction}`);
  return true;
}

function handleSubmit(event) {
  event.preventDefault();
  if (!validate(form)) return false;
  verify(form);
  return false;
}
