document.addEventListener('DOMContentLoaded', () => {
  initLoginForm();
  initFlapStats();
});

function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const errorBox = document.getElementById('formError');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordValid = password.length >= 4;

    if (!emailValid || !passwordValid) {
      errorBox.classList.add('visible');
      return;
    }

    errorBox.classList.remove('visible');

    // MVP stub: no backend yet (Phase 2 adds real auth).
    sessionStorage.setItem('transitops_user', email);
    window.location.href = 'dashboard.html';
  });
}

function initFlapStats() {
  const boards = document.querySelectorAll('.flap-digits');
  if (!boards.length) return;

  boards.forEach((board) => {
    const value = board.getAttribute('data-value') || '0';
    const suffix = board.getAttribute('data-suffix') || '';
    const digits = value.split('');

    digits.forEach((digit, i) => {
      const flap = document.createElement('div');
      flap.className = 'flap';
      flap.textContent = digit;
      board.appendChild(flap);

      flap.animate(
        [
          { transform: 'rotateX(90deg)', opacity: 0 },
          { transform: 'rotateX(0deg)', opacity: 1 }
        ],
        { duration: 350, delay: i * 90, easing: 'ease-out', fill: 'backwards' }
      );
    });

    if (suffix) {
      const suffixEl = document.createElement('div');
      suffixEl.className = 'flap';
      suffixEl.style.background = 'transparent';
      suffixEl.style.border = 'none';
      suffixEl.style.color = 'var(--text-dim)';
      suffixEl.style.fontSize = '1.1rem';
      suffixEl.textContent = suffix;
      board.appendChild(suffixEl);
    }
  });
}