export const removeAccents = (text: string): string => {
  const newText = text.replace(/ł/g, 'l').replace(/Ł/g, 'L');
  return newText.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const removeTags = (text: string): string => {
  return text.replace(/<p>/g, '').replace(/<\/p>/g, '');
};
