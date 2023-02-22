<?php get_header(); ?>

<section id="scorecard-section">
    <div class="header-logo"><img src="<?php echo plugin_dir_url(dirname(__FILE__)) . 'src/images/One-Under-Logo.png' ?>"></div>
    <h1>Results</h1>

    <?php
    if ($_POST) {
        $uniqid = $_POST['uniqid'];
        $scores = stripslashes($_POST['gameScores']);
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
                            <img src="data:image/png;base64,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">
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
                            <img src="data:image/png;base64,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">
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
                            <img src="data:image/png;base64,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">
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
    } else {
        echo 'just vieweing';
    }
    // $wpdb->insert(
    //     'tabletest',
    //     array(
    //         'column1' => $_POST["initialPlayer"],
    //         'column2' => 123,
    //     ),
    //     array(
    //         '%s',
    //         '%d',
    //     )
    // );
    ?>
</section>

<?php get_footer(); ?>