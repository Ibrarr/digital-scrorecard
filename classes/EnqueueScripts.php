<?php

namespace App;

class EnqueueScripts
{
    public function __construct()
    {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
    }

    public function enqueue_scripts()
    {
        if (is_page_template('templates/scorecard.php') || is_page_template('templates/results.php')) {
            wp_register_style('scorecard-style', plugin_dir_url(dirname(__FILE__)) . 'dist/css/app.css', [], 1, 'all');
            wp_enqueue_style('scorecard-style');

            wp_register_script('scorecard-script', plugin_dir_url(dirname(__FILE__)) . 'dist/js/app.js', ['jquery'], 1, true);
            wp_enqueue_script('scorecard-script');
        }
    }
}
