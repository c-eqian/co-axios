let BASE_KEY = 1;
export const generateUid = () => {
  BASE_KEY++;
  return new Date().getTime() + BASE_KEY;
};
