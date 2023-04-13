<?php get_header(); ?>

    <section id="scorecard-section">
        <div class="header-logo"><img
                src="<?php echo plugin_dir_url(dirname(__FILE__)) . 'src/images/One-Under-Logo.png' ?>"></div>
        <h1>Results</h1>

        <?php
        if ($_POST) {
            $uniqid = $_POST['uniqid'];
            $scores = stripslashes($_POST['gameScores']);

            global $wpdb;
            $table_name = $wpdb->prefix . "digital_scorecard";
            $prepared_query = $wpdb->prepare("SELECT id, uniqid FROM %s", $table_name);
            $result = $wpdb->get_results($prepared_query);

            if (array_search($uniqid, array_column($result, 'uniqid')) !== false) {
                // do nothing
            } else {
                $prepared_query = $wpdb->prepare(
                    "INSERT INTO $table_name (time, uniqid, scores) VALUES (%s, %s, %s)",
                    current_time('mysql'),
                    $uniqid,
                    $scores
                );
                $wpdb->query($prepared_query);
            }

            $obj = json_decode($scores);
            usort($obj->data, function ($a, $b) {
                return $a->score < $b->score ? -1 : 1;
            });

            $getTopScore = $obj->data[0]->score;
            $topScoreNames = array();
            foreach ($obj->data as $item) {
                if ($item->score == $getTopScore) {
                    $topScoreNames[] = $item->name;
                }
            }

            $playerOneScore = $obj->data[0]->score;
            $playerTwoScore = $obj->data[1]->score;
            $playerThreeScore = $obj->data[2]->score;
            $playerFourScore = $obj->data[3]->score;
            $playerFiveScore = $obj->data[4]->score;

            function ordinal($number)
            {
                $ends = array('th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th');
                if ((($number % 100) >= 11) && (($number % 100) <= 13))
                    return $number . 'th';
                else
                    return $number . $ends[$number % 10];
            }

            ?>
            <p class="winner-message">Congrats <span>
                <?php foreach ($topScoreNames as $topScoreName) {
                    echo $topScoreName . ", ";
                } ?>
            </span> you’re the
                <?php if (count($topScoreNames) > 1) {
                    echo 'winners! ';
                } else {
                    echo 'winner! ';
                } ?>
                Keep the fun going and stick around to enjoy our bar, pool table, dance mats, and indoor car racing.</p>
            <div class="results-container">
                <?php
                $i = 0;
                $rank = 1;
                foreach ($obj->data as $player) {
                    if ($i > 0 && $player->score != $obj->data[$i - 1]->score) {
                        $rank++;
                    }
                    $player->rank = $rank;
                    $i++;
                    if ($i == 1) {
                        ?>
                        <div class="single-winner">
                            <div class="winner-position">
                                <p><?php echo ordinal($player->rank); ?></p>
                            </div>
                            <div class="winner-info">
                            <span>
                                <p><?php echo $player->score; ?></p>
                            </span>
                                <p><?php echo $player->name; ?></p>
                            </div>
                        </div>
                        <?php
                    } elseif ($i == 2) {
                        ?>
                        <div class="single-winner">
                            <div class="winner-position">
                                <p><?php echo ordinal($player->rank); ?></p>
                            </div>
                            <div class="winner-info">
                            <span>
                                <p><?php echo $player->score; ?></p>
                            </span>
                                <p><?php echo $player->name; ?></p>
                            </div>
                        </div>
                        <?php
                    } elseif ($i == 3) {
                        ?>
                        <div class="single-winner">
                            <div class="winner-position">
                                <p><?php echo ordinal($player->rank); ?></p>
                            </div>
                            <div class="winner-info">
                            <span>
                                <p><?php echo $player->score; ?></p>
                            </span>
                                <p><?php echo $player->name; ?></p>
                            </div>
                        </div>
                        <?php
                    } elseif ($i == 4) {
                        ?>
                        <div class="single-winner">
                            <div class="winner-position">
                                <p><?php echo ordinal($player->rank); ?></p>
                            </div>
                            <div class="winner-info">
                            <span>
                                <p><?php echo $player->score; ?></p>
                            </span>
                                <p><?php echo $player->name; ?></p>
                            </div>
                        </div>
                        <?php
                    } elseif ($i == 5) {
                        ?>
                        <div class="single-winner">
                            <div class="winner-position">
                                <p><?php echo ordinal($player->rank); ?></p>
                            </div>
                            <div class="winner-info">
                            <span>
                                <p><?php echo $player->score; ?></p>
                            </span>
                                <p><?php echo $player->name; ?></p>
                            </div>
                        </div>
                        <?php
                    }
                }
                ?>
            </div>
            <fieldset class="rating">
                <input type="radio" id="star5" name="rating" value="5"/><label class="full" for="star5"></label>
                <input type="radio" id="star4" name="rating" value="4"/><label class="full" for="star4"></label>
                <input type="radio" id="star3" name="rating" value="3"/><label class="full" for="star3"></label>
                <input type="radio" id="star2" name="rating" value="2"/><label class="full" for="star2"></label>
                <input type="radio" id="star1" name="rating" value="1"/><label class="full" for="star1"></label>
            </fieldset>
            <p class="google-review">Thank you for the rave review - it goes a long way! Help other adventurers find us
                by leaving us a review on Google too
                <a href="https://g.page/r/CQCwUDyE-M-bEB0/review" target="_blank">
                    <button class="results-buttons">Leave review!</button>
                </a>
            </p>
            <button class="share-button results-buttons"
                    data-url="<?php echo "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]?gameid=$uniqid"; ?>">Share
                results 🔗
            </button>
            <div class="results-buttons-container">
                <a href="/digital-scorecard">
                    <button class="results-buttons">Play again?</button>
                </a>
                <a href="/digital-scorecard/selfie">
                    <button class="results-buttons">Take a selfie?</button>
                </a>
            </div>
            <?php
        } else {
            $gameID = sanitize_text_field($_GET['gameid']);

            if (preg_match('/^result[a-zA-Z0-9]+$/', $gameID)) {
                global $wpdb;
                $table_name = $wpdb->prefix . "digital_scorecard";

                $result = $wpdb->get_row(
                    $wpdb->prepare(
                        "SELECT * FROM $table_name WHERE uniqid = %s",
                        $gameID
                    )
                );

                $obj = json_decode($result->scores);
                usort($obj->data, function ($a, $b) {
                    return $a->score < $b->score ? -1 : 1;
                });
                ?>
                <div class="results-container">
                    <?php
                    $i = 0;
                    foreach ($obj->data as $player) {
                        $i++;
                        if ($i == 1) {
                            ?>
                            <div class="single-winner">
                                <div class="winner-position">
                                    <p>1st</p>
                                </div>
                                <div class="winner-info">
                                <span>
                                    <p><?php echo $player->score; ?></p>
                                </span>
                                    <p><?php echo $player->name; ?></p>
                                </div>
                            </div>
                            <?php
                        } elseif ($i == 2) {
                            ?>
                            <div class="single-winner">
                                <div class="winner-position">
                                    <p>2nd</p>
                                </div>
                                <div class="winner-info">
                                <span>
                                    <p><?php echo $player->score; ?></p>
                                </span>
                                    <p><?php echo $player->name; ?></p>
                                </div>
                            </div>
                            <?php
                        } elseif ($i == 3) {
                            ?>
                            <div class="single-winner">
                                <div class="winner-position">
                                    <p>3rd</p>
                                </div>
                                <div class="winner-info">
                                <span>
                                    <p><?php echo $player->score; ?></p>
                                </span>
                                    <p><?php echo $player->name; ?></p>
                                </div>
                            </div>
                            <?php
                        } elseif ($i == 4) {
                            ?>
                            <div class="single-winner">
                                <div class="winner-position">
                                    <p>4th</p>
                                </div>
                                <div class="winner-info">
                                <span>
                                    <p><?php echo $player->score; ?></p>
                                </span>
                                    <p><?php echo $player->name; ?></p>
                                </div>
                            </div>
                            <?php
                        } elseif ($i == 5) {
                            ?>
                            <div class="single-winner">
                                <div class="winner-position">
                                    <p>5th</p>
                                </div>
                                <div class="winner-info">
                                <span>
                                    <p><?php echo $player->score; ?></p>
                                </span>
                                    <p><?php echo $player->name; ?></p>
                                </div>
                            </div>
                            <?php
                        }
                    }
                    ?>
                </div>
                <?php
            } else {
                ?>
                <a href="/digital-scorecard">
                    <button class="results-buttons">Play now!</button>
                </a>
                <?php
            }
        }
        ?>
    </section>

<?php get_footer(); ?>