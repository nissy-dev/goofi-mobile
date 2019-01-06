declare module "ex-react-native-i18n" {
    var fallbacks: boolean;
    var translations: {
        [keys: string]: any;
    };
    var defaultLocale: string;
    var locale: string;
    function currentLocale(): string;
    function initAsync(): any;
    function t(key: "favorite"): string;
    function t(key: "js"): string;
    function t(key: "py"): string;
    function t(key: "ruby"): string;
    function t(key: "rust"): string;
    function t(key: "selectLanguage"): string;
    function t(key: "networkError"): string;
    function t(key: "graphqlError"): string;
    function t(key: "keywordForm"): string;
    function t(key: "issueListPageTitle"): string;
}

declare module "*.json" {
    const value: any;
    export default value;
}