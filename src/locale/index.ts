import I18n from 'ex-react-native-i18n'
import en from './languages/en.json'
import ja from './languages/ja.json'

I18n.fallbacks = true

I18n.translations = { en, ja }

export default I18n
