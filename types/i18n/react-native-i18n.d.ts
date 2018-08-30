declare module "ex-react-native-i18n" {
  var fallbacks: boolean;
  var translations: {
    [keys: string]: any;
  };
  var defaultLocale: string;
  var locale: string;
  function initAsync(): any;
  function currentLocale(): string;
  function t(key: "favorite"): string;
  function t(key: "js"): string;
  function t(key: "py"): string;
  function t(key: "ruby"): string;
}

declare module "*.json" {
  const value: any;
  export default value;
}
