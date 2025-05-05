// export const parseUrlPath = (url: string) => {
//     const parsed = url

export const getInitialsFromName = (
  name: string,
  options?: {
    maxLetters?: number;
  }
) => {
  const { maxLetters = 3 } = options || {};

  const names = name.split(' ');
  const initials = names.map(n => n.charAt(0).toUpperCase()).join('').slice(0, maxLetters);
  return initials;
};
