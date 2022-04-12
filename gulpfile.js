const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const smartgrid = require('smart-grid');
const webpack = require("webpack-stream");
const changed = require('gulp-changed');
const rename = require("gulp-rename");
const nunjucksRender = require('gulp-nunjucks-render');
const webp = require('gulp-webp');
const gulpif = require('gulp-if');
const htmlbeautify = require('gulp-html-beautify');
const removeEmptyLines = require('gulp-remove-empty-lines');
//===========================================================
const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;
const {
	src,
	dest,
	parallel,
	series,
	watch
} = require('gulp');

let preproc = {
	less: 'less'
};
let fileswatch = 'html,htm,txt,json,md,woff2';

const folderProd = './project_start/';

let path = {
	dist: {
		folder: folderProd + 'dist/',
		css: folderProd + 'dist/assets/css/',
		assets: folderProd + 'dist/assets/',
	},
	src: {
		js: folderProd + 'src/js/',
		less: folderProd + 'src/less/',
		images: folderProd + 'src/assets/images/**/*.{jpg,jpeg,png,webp,svg}',
		assets: folderProd + 'src/assets/',
		njk: folderProd + 'src/njk/',
	}
};

function styles() {
	return src(path.src.less + 'styles.*')
		// return src(path.src.less + '+(styles|basic).*')
		.pipe(gulpif(isDev, sourcemaps.init()))
		.pipe(eval(preproc.less)())
		.pipe(gcmq())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 years', 'last 10 versions'],
			grid: true
		}))
		.pipe(gulpif(isProd, cleanCSS({
			level: 2
		})))
		.pipe(gulpif(isDev, sourcemaps.write('')))
		.pipe(dest(path.dist.css))
		.pipe(browserSync.stream());
}

function scripts() {
	return src(path.src.js + 'main.js')
		.pipe(webpack({
			output: {
				filename: 'script.js'
			},
			mode: isDev ? 'development' : 'production',
			watch: false,
			devtool: isDev ? 'eval-source-map' : false,
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env', {
									debug: true,
									corejs: 3,
									useBuiltIns: 'usage'
								}]
							]
						}
					}
				}]
			}
		}))
		.pipe(gulpif(isDev, changed(path.dist.folder, {
			hasChanged: changed.compareContents
		})))
		.pipe(dest(path.dist.assets + '/js'))
		.pipe(browserSync.stream());
}


function nunjucks() {
	return src(path.src.njk + '**/*.html')
		.pipe(nunjucksRender({
			path: path.src.njk
		}))
		.pipe(gulpif(isDev, changed(path.dist.folder, {
			hasChanged: changed.compareContents
		})))
		.pipe(htmlbeautify())
		.pipe(removeEmptyLines())
		.pipe(dest(path.dist.folder))
		.pipe(browserSync.stream());
}

function copyAssets() {
	return src(path.src.assets + '**/**/*.*')
		.pipe(gulpif(isDev, changed(path.dist.assets, {
			hasChanged: changed.compareContents
		})))
		.pipe(dest(path.dist.assets))
		.pipe(browserSync.stream());
}

function imagesWebp() {
	return src(path.src.images)
		.pipe(webp())
		.pipe(dest(path.src.assets + 'images'));
}

function startwatch() {
	browserSync.init({
		server: {
			baseDir: path.dist.folder,
		},
		notify: false,
	});
	watch(path.src.less + '**/*.less', styles);
	watch(path.src.njk + '**/*.*', nunjucks);
	watch(path.src.assets + '**/*.*', copyAssets);
	watch(path.src.js + '**/*.js', scripts);
	watch([path.dist.folder + '**/*.{' + fileswatch + '}']).on('change', browserSync.reload);
	watch('./smartgrid.js', grid);
}

function grid(done) {
	delete require.cache[require.resolve('./smartgrid.js')];
	let settings = require('./smartgrid.js');
	smartgrid(path.src.less + 'smartgrid', settings);
	done();
}

function clear() {
	return del(path.dist.folder);
}

async function cleandist() {
	del(path.dist.folder, {
		force: true
	})
}

function clearimg() {
	return del(path.dist.img);
}

exports.grid = grid;
exports.webp = imagesWebp;
exports.cleandist = cleandist;
exports.clearimgdist = clearimg;
exports.build = series(clear, nunjucks, copyAssets, styles, scripts, parallel(startwatch));
exports.default = series(nunjucks, copyAssets, styles, scripts, parallel(startwatch));