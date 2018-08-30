declare module "ex-react-native-i18n" {
  var fallbacks: boolean;
  var translations: {
    [keys: string]: any;
  };
  var defaultLocale: string;
  var locale: string;
  function initAsync(): any;
  function currentLocale(): string;
  function t(key: "greeting"): string;
}

declare module "*.json" {
  const value: any;
  export default value;
}
