<?php get_header(); ?>

<section id="scorecard-section">
    <div class="header-logo"><img src="<?php echo plugin_dir_url(dirname(__FILE__)) . 'src/images/One-Under-Logo.png' ?>"></div>
    <h1>Results</h1>

    <?php
    if ($_POST) {
        $uniqid = $_POST['uniqid'];
        $scores = stripslashes($_POST['gameScores']);

        global $wpdb;
        $table_name = $wpdb->prefix . "digital_scorecard";
        $result = $wpdb->get_results("SELECT id, uniqid FROM $table_name");
        if (array_search($uniqid, array_column($result, 'uniqid')) !== FALSE) {
        } else {
            $wpdb->insert(
                $table_name,
                array(
                    'time' => current_time('mysql'),
                    'uniqid' => $uniqid,
                    'scores' => $scores,
                )
            );
        }

        $obj = json_decode($scores);
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
                            <span>1st</span>
                        </div>
                        <div class="winner-info">
                            <span><?php echo $player->score; ?></span>
                            <p><?php echo $player->name; ?></p>
                        </div>
                    </div>
                <?php
                } elseif ($i == 2) {
                ?>
                    <div class="single-winner">
                        <div class="winner-position">
                            <span>2nd</span>
                        </div>
                        <div class="winner-info">
                            <span><?php echo $player->score; ?></span>
                            <p><?php echo $player->name; ?></p>
                        </div>
                    </div>
                <?php
                } elseif ($i == 3) {
                ?>
                    <div class="single-winner">
                        <div class="winner-position">
                            <span>3rd</span>
                        </div>
                        <div class="winner-info">
                            <span><?php echo $player->score; ?></span>
                            <p><?php echo $player->name; ?></p>
                        </div>
                    </div>
                <?php
                } elseif ($i == 4) {
                ?>
                    <div class="single-winner">
                        <div class="winner-position">
                            <span>4th</span>
                        </div>
                        <div class="winner-info">
                            <span><?php echo $player->score; ?></span>
                            <p><?php echo $player->name; ?></p>
                        </div>
                    </div>
                <?php
                } elseif ($i == 5) {
                ?>
                    <div class="single-winner">
                        <div class="winner-position">
                            <span>5th</span>
                        </div>
                        <div class="winner-info">
                            <span><?php echo $player->score; ?></span>
                            <p><?php echo $player->name; ?></p>
                        </div>
                    </div>
            <?php
                }
            }
            ?>
        </div>
        <button class="share-button results-buttons" data-url="<?php echo "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]?gameid=$uniqid"; ?>">Share results</button>
        <script>
            const shareButton = document.querySelector('.share-button');

            shareButton.addEventListener('click', event => {
                if (navigator.share) {
                    navigator.share({
                            title: 'One Under results',
                            text: 'Check out the game I just played at One Under mini golf!',
                            url: shareButton.getAttribute('data-url')
                        })
                        .then(() => console.log('Successful share'))
                        .catch((error) => console.log('Error sharing', error));
                }
            });
        </script>
        <a href="/digital-scorecard"><button class="results-buttons">Play again!</button></a>
    <?php
    } else {
        $gameID = $_GET['gameid'];

        global $wpdb;
        $table_name = $wpdb->prefix . "digital_scorecard";
        $result = $wpdb->get_row("SELECT * FROM $table_name WHERE uniqid = '$gameID'");

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
                            <span>1st</span>
                        </div>
                        <div class="winner-info">
                            <span><?php echo $player->score; ?></span>
                            <p><?php echo $player->name; ?></p>
                        </div>
                    </div>
                <?php
                } elseif ($i == 2) {
                ?>
                    <div class="single-winner">
                        <div class="winner-position">
                            <span>2nd</span>
                        </div>
                        <div class="winner-info">
                            <span><?php echo $player->score; ?></span>
                            <p><?php echo $player->name; ?></p>
                        </div>
                    </div>
                <?php
                } elseif ($i == 3) {
                ?>
                    <div class="single-winner">
                        <div class="winner-position">
                            <span>3rd</span>
                        </div>
                        <div class="winner-info">
                            <span><?php echo $player->score; ?></span>
                            <p><?php echo $player->name; ?></p>
                        </div>
                    </div>
                <?php
                } elseif ($i == 4) {
                ?>
                    <div class="single-winner">
                        <div class="winner-position">
                            <span>4th</span>
                        </div>
                        <div class="winner-info">
                            <span><?php echo $player->score; ?></span>
                            <p><?php echo $player->name; ?></p>
                        </div>
                    </div>
                <?php
                } elseif ($i == 5) {
                ?>
                    <div class="single-winner">
                        <div class="winner-position">
                            <span>5th</span>
                        </div>
                        <div class="winner-info">
                            <span><?php echo $player->score; ?></span>
                            <p><?php echo $player->name; ?></p>
                        </div>
                    </div>
            <?php
                }
            }
            ?>
        </div>
    <?php
    }
    ?>
</section>

<?php get_footer(); ?>