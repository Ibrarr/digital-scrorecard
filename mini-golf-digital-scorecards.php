<?php

/**
 * Plugin Name: Mini-Golf Digital Scorecard
 * Description: Creates the templates necessary for the digital scorecards
 * Version: 1.0.0
 * Author: Ibrarr Khan
 * License: GPLv2 or later
 * Text Domain: digital-scorecard
 */

require_once __DIR__ . '/vendor/autoload.php';

use App\EnqueueScripts;
use App\Templates;

$templates = new Templates;
$enqueueScripts = new EnqueueScripts;
