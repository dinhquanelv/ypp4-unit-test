let globalPrefix = '';

export const setGlobalPrefix = (prefix: string) => {
  globalPrefix = prefix.replace(/^\/?/, '/');
};

export const getGlobalPrefix = () => globalPrefix;
