export const maskCnpj = (value) => {
  const cleanedValue = value.replace(/\D/g, '');
  const isCnpj = cleanedValue.length > 11;

  return isCnpj
    ? cleanedValue
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .substring(0, 18)
    : cleanedValue
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/\.(\d{3})(\d)/, '.$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2')
        .substring(0, 14);
};

export const maskCpf = (value) => {
  const cleanedValue = value.replace(/\D/g, '');

  return cleanedValue
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/\.(\d{3})(\d)/, '.$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .substring(0, 14);
};

export const maskCpfCnpj = (value) => {
  const cleanedValue = value.replace(/\D/g, '');
  const isCnpj = cleanedValue.length > 11;

  return isCnpj
    ? cleanedValue
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .substring(0, 18)
    : cleanedValue
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/\.(\d{3})(\d)/, '.$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2')
        .substring(0, 14);
};

export const maskPhone = (value) => {
  const cleanedValue = value.replace(/\D/g, '');
  const hasElevenDigits = cleanedValue.length === 11;

  return hasElevenDigits
    ? cleanedValue.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
    : cleanedValue.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
};

export const maskCep = (value) => {
  const cleanedValue = value.replace(/\D/g, '');

  return cleanedValue.replace(/^(\d{5})(\d{3})$/, '$1-$2').substring(0, 9);
};

export const maskMoney = (value) => {
  const cleanedValue = value.replace(/\D/g, '');
  
  const numberValue = parseInt(cleanedValue) || 0;

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(numberValue / 100); // Divide por 100 para considerar os últimos dois dígitos como centavos
  
  return formattedValue;
};

