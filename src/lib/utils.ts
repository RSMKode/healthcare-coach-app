export const normalizeString = (
    text: string,
    options?: {
      ignoreCase?: boolean;
      ignoreAccents?: boolean;
    },
  ): string => {
    const { ignoreCase = true, ignoreAccents = false } = options || {};
  
    let normalizedText = text;
    if (ignoreCase) normalizedText = normalizedText.toLowerCase();
    if (ignoreAccents)
      normalizedText = normalizedText
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
  
    return normalizedText;
  };
  
  export const normalizeNumber = (
    value: number,
    options?: {
      fixedDecimals?: number | false;
    },
  ) => {
    const { fixedDecimals = 2 } = options || {};
  
    let number = Number(value);
  
    if (isNaN(number)) return 0;
    if (Number.isInteger(number)) return number;
    if (fixedDecimals !== false && fixedDecimals >= 0) {
      number = Number(number.toFixed(fixedDecimals));
    }
  
    return number;
  };
  
  export const normalizeDate = (date: Date) => {
    // Para ignorar la zona horaria y que no devuelva un dia menos
    
    const normalizedDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    // normalizedDate.setUTCHours(0, 0, 0, 0);
  
    return normalizedDate;
  };