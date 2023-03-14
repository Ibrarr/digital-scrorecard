<?php

/**
 * Mini-Golf Digital Scorecard
 *
 * @package           DigitalScorecard
 * @author            Ibrarr Khan
 * @copyright         2023 Ibrarr Khan
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       Mini-Golf Digital Scorecard
 * Plugin URI:        https://github.com/Ibrarr/mini-golf-digital-scorecards
 * Description:       Creates post templates for your digital scorecard
 * Version:           1.0.0
 * Author:            Ibrarr Khan
 * Author URI:        http://ibrarrkhan.com/
 * Text Domain:       digital-scorecard
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

require_once __DIR__ . '/vendor/autoload.php';

use App\CreateDatabaseTable;
use App\EnqueueScripts;
use App\Templates;

$templates = new Templates;
$enqueueScripts = new EnqueueScripts;
$createDatabaseTable = new CreateDatabaseTable;
