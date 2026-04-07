// ===============================
// 🚀 WAIT FOR PAGE TO LOAD
// ===============================
document.addEventListener('DOMContentLoaded', () => {

  // ===============================
  // 🔽 TOGGLE (SHOW / HIDE CIPHERS)
  // ===============================
  const toggleButtons = document.querySelectorAll('.toggle');

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;

      // Show / hide content
      content.classList.toggle('hidden');

      // Change arrow symbol
      if (content.classList.contains('hidden')) {
        btn.textContent = btn.textContent.replace('▲', '▼');
      } else {
        btn.textContent = btn.textContent.replace('▼', '▲');
      }
    });
  });

  // ===============================
  // 🔐 ROT13 EVENT
  // ===============================
  document.getElementById("input_rot13").addEventListener("input", e => {
    document.getElementById("output_rot13").value = rot13(e.target.value);
  });

  // ===============================
  // 🏛 CAESAR EVENT
  // ===============================
  function updateCaesar() {
    const text = document.getElementById("input_caesar").value;
    const shift = parseInt(document.getElementById("caesar_shift").value) || 0;

    document.getElementById("output_caesar").value = caesar(text, shift);
  }

  document.getElementById("input_caesar").addEventListener("input", updateCaesar);
  document.getElementById("caesar_shift").addEventListener("input", updateCaesar);

  // ===============================
  // 🔤 BASE64 EVENT
  // ===============================
  document.getElementById("input_base64").addEventListener("input", e => {
    document.getElementById("output_base64").value = encodeBase64(e.target.value);
  });

  // ===============================
  // 🔑 VIGENÈRE EVENT
  // ===============================
  function updateVigenere() {
    const text = document.getElementById("input_vigenere").value;
    const key = document.getElementById("vigenere_key").value || "a";

    document.getElementById("output_vigenere").value = vigenere(text, key);
  }

  document.getElementById("input_vigenere").addEventListener("input", updateVigenere);
  document.getElementById("vigenere_key").addEventListener("input", updateVigenere);

  // ===============================
  // ⚡ XOR EVENT
  // ===============================
  function updateXOR() {
    const text = document.getElementById("input_xor").value;
    const key = parseInt(document.getElementById("xor_key").value) || 0;

    document.getElementById("output_xor").value = xorCipher(text, key);
  }

  document.getElementById("input_xor").addEventListener("input", updateXOR);
  document.getElementById("xor_key").addEventListener("input", updateXOR);

});


// ===============================
// 🔐 ROT13 FUNCTION
// ===============================
function rot13(text) {
  return text.replace(/[a-z]/gi, char => {
    const base = char <= 'Z' ? 65 : 97;

    return String.fromCharCode(
      ((char.charCodeAt(0) - base + 13) % 26) + base
    );
  });
}


// ===============================
// 🏛 CAESAR CIPHER
// ===============================
function caesar(text, shift) {
  return text.replace(/[a-z]/gi, char => {
    const base = char <= 'Z' ? 65 : 97;

    return String.fromCharCode(
      ((char.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base
    );
  });
}


// ===============================
// 🔤 BASE64 ENCODE / DECODE
// ===============================
function encodeBase64(text) {
  return btoa(text);
}

function decodeBase64(text) {
  try {
    return atob(text);
  } catch {
    return "Invalid Base64 input";
  }
}


// ===============================
// 🔑 VIGENÈRE CIPHER
// ===============================
function vigenere(text, key) {
  key = key.toLowerCase();
  let result = '';
  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
    let char = text[i];

    if (/[a-z]/i.test(char)) {
      const base = char <= 'Z' ? 65 : 97;
      const shift = key.charCodeAt(keyIndex % key.length) - 97;

      result += String.fromCharCode(
        ((char.charCodeAt(0) - base + shift) % 26) + base
      );

      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
}


// ===============================
// ⚡ XOR CIPHER
// ===============================
function xorCipher(text, key) {
  let result = '';

  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(
      text.charCodeAt(i) ^ key
    );
  }

  return result;
}