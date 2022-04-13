# Smart-Grid-Start-V2.5

Обновленная Gulp "Smart-Grid-Start" сборка с использованием SmartGrid, шаблонизатора Nunjucks и Webpack

**Smart-Grid-Start-V2.5** - среда запуска с Gulp 4,c **препроцессорами** (*Less*, *Scss*...), **clean-css, css-media-querie, nunjucks-render, html-beautify, Browsersync, Autoprefixer, webpack-stream, Babel, core-js**... .

## Структура проекта

~~~ pre
Gulp-SmartFrid_Starter
— project_start         <= основная папка проекта
— — src                 <= папка с необработанным кодом
— — — assets            <= папка с исходными стилями, скриптами, шрифтами, изображениями... 
— — — — fonts           <= папка с шрифтами
— — — — images          <= папка изображений
— — — — libs            <= папка с библиотеками стилей, скриптов
— — — js                <= папка с исходными скриптами
— — — — modules         <= папка с модулями js для подключения через import | require
— — — — main.js         <= основной файл скриптов javascript
— — — less              <= папка препроцессора less
— — — — base            <= папка с базовыми стилями, миксинами
— — — — blocks          <= папка с файлами less разбитыми на блоки
— — — — smartgrid       <= папка со стилями smartgrid
— — — — styles.less     <= основной файл стилей препроцессора less
— — — njk               <= папка шаблонизатора nunjucks
— — — — blocks          <= папка для пере используемых кусков html кода(карточки, кнопки...) 
— — — — layots          <= папка шаблонов 
— — — — partials        <= папка для пере используемых секций кода html(header, footer...)
— — — — index.html      <= файлы html для последующей сборки 
— — smartgrid.js        <= файл настроек SmartGrid
— — gulpfile.js
— — package.js
~~~

## Используемые Gulp-таски

### HTML

- [gulp-nunjucks-render](https://www.npmjs.com/package/gulp-nunjucks-render) - рендер Nunjucks шаблонов в html;
- [gulp-html-beautify](https://www.npmjs.com/package/gulp-html-beautify) - gulp-плагин для оптимизации HTML-файлов;
- [gulp-remove-empty-lines](https://www.npmjs.com/package/gulp-remove-empty-lines) - удаление пустых строк из файлов html;

### CSS

- [gulp-less](https://www.npmjs.com/package/gulp-less) - плагин LESS для Gulp;
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) - префиксы для CSS стилей;
- [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) - минимизации CSS стилей;
- [gulp-group-css-media-queries](https://www.npmjs.com/package/gulp-group-css-media-queries) - постобработка CSS: группирование медиа-запросов;
- [smart-grid](https://www.npmjs.com/package/smart-grid) - альтернатива бутстраповской сетки основаная на примесях, а не классов, препроцессоров(less, sass, scss) что уменьшает количества кода;

### JavaScript

- [webpack-stream](https://www.npmjs.com/package/webpack-stream) - интеграции webpack с gulp для обработки javascript;
- [babel](https://babeljs.io/) - компилятор JavaScript;
- [core-js](https://www.npmjs.com/package/core-js) - модульная стандартная библиотека для JavaScript. Включает в себя полифиллы для ECMAScript до 2021;

### Вспомогательные

