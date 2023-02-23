<?php

namespace App;

class CreateDatabaseTable
{
    public function __construct()
    {
        register_activation_hook(plugin_dir_path(dirname(__FILE__)) . 'mini-golf-digital-scorecards.php', array($this, 'create_tables'));
    }

    public function create_tables()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . "digital_scorecard";
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
            uniqid text NOT NULL,
            scores text NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql);
    }
}
