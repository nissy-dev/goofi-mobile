import I18n from 'ex-react-native-i18n'

I18n.fallbacks = true

I18n.translations = {
  en: require('./languages/en.json'),
  ja: require('./languages/ja.json')
}

export default I18n
