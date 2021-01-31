import Cookie from 'js-cookie';
import { ReactIntlUniversal } from 'react-intl-universal';

const intl = new ReactIntlUniversal();
const localeFiles = require.context('./locales', false, /\.js$/);
const fileNameList = localeFiles.keys().map((file) => file.split('/')[ 1 ].substring(0, file.split('/')[ 1 ].indexOf('.js')));
const currentLocale = fileNameList.indexOf(Cookie.get('language')) > -1 ? Cookie.get('language') : 'ko_KR';
const locales = {};

fileNameList.forEach((name) => {
    locales[ name ] = localeFiles(`./${name}.js`).default;
});

intl.init({
    currentLocale,
    locales
});

export default intl;