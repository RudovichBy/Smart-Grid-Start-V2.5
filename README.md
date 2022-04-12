# Smart-Grid-Start-V2.5
Обнавленная Gulp "Smart-Grid-Start" сборка с использованием SmartGrid, шаблонизатора Nunjucks и Webpack

**Smart-Grid-Start-V2.5** - среда запуска с Gulp 4,c **препроцессорами** (*Less*, *Scss*...), **clean-css, css-media-querie, nunjucks-render, html-beautify, Browsersync, Autoprefixer, webpack-stream, Babel, core-js**... .

## Структура проекта

~~~ pre
Gulp-SmartFrid_Starter
— project_start         <= оснавная папка проета
— — src                 <= папка с необроботоным кодом
— — — assets            <= папка с исходными стилями, скриптами, шрифтми, изоброжениями... 
— — — — fonts           <= папка с шрифтами
— — — — images          <= папка изображений
— — — — libs            <= папка с библиотеками стилей, скриптов
— — — js                <= папка с исходными скриптами
— — — — modules         <= папка с модулями js для подключения через import | require
— — — — main.js         <= асновной файл скриптов javascript
— — — less              <= папка препроцессора less
— — — — base            <= папка с базовыми стилями, миксинами
— — — — blocks          <= пака с файломи less разбитыми на блоки
— — — — smartgrid       <= папка со стилями smartgrid
— — — — styles.less     <= асновной файл стид=лей препроцессора less
— — — njk               <= папка шаблонизатора nunjucks
— — — — blocks          <= папка для переиспользуемых кусков html кода(карточки, кнопки...) 
— — — — layots          <= папка шаблонов 
— — — — partials        <= папка для переиспользуемых секций кода html(header, footer...)
— — — — index.html      <= файлы html для последующей сборки 
— — smartgrid.js        <= файл настроек SmartGrid
— — gulpfile.js
— — package.js
~~~

## Используемые Gulp-таски
