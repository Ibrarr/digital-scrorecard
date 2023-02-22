let mix = require('laravel-mix');

mix.js(['src/js/form.js', 'src/js/dropdown.js', 'src/js/slider.js', 'src/js/plusminus.js', 'src/js/accordian.js'], 'dist/js/app.js').setPublicPath('dist');

mix.sass('src/css/app.scss', 'dist/css').setPublicPath('dist');

mix.options({
    postCss: [
        require('autoprefixer')({
            browsers: ['last 3 versions'],
            cascade: false
        })
    ]
});

mix.disableNotifications();