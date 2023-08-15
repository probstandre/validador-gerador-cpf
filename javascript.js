function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); 

    if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === parseInt(cpf.charAt(9))) {
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
      }

      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === parseInt(cpf.charAt(10))) {
        return true;
      }
    }

    return false;
  }

  function validar() {
    const cpfInput = document.getElementById('cpfInput');
    const resultado = document.getElementById('resultado');

    if (validarCPF(cpfInput.value)) {
      resultado.textContent = 'CPF VÁLIDO!';
    } else {
      resultado.textContent = 'CPF INVÁLIDO!';
    }
  }

  function gerarCPF() {
    const cpfGerado = document.getElementById('cpfGerado');
    cpfGerado.value = gerarNumeroCPF();
  }

  function gerarNumeroCPF() {
    const cpfArray = [];
    
    for (let i = 0; i < 9; i++) {
      cpfArray.push(Math.floor(Math.random() * 10));
    }
    
    const digit1 = calcularDigitoVerificador(cpfArray, 10);
    cpfArray.push(digit1);
    const digit2 = calcularDigitoVerificador(cpfArray, 11);
    cpfArray.push(digit2);

    return cpfArray.join('');
  }

  function calcularDigitoVerificador(cpfArray, peso) {
    let total = 0;
    for (let i = 0; i < cpfArray.length; i++) {
      total += cpfArray[i] * peso;
      peso--;
    }
    const resto = total % 11;
    return resto < 2 ? 0 : 11 - resto;
  }