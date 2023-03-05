<?php get_header(); ?>

<section id="scorecard-section">
    <div class="header-logo"><img src="<?php echo plugin_dir_url(dirname(__FILE__)) . 'src/images/One-Under-Logo.png' ?>"></div>

    <section class="take-picture">
        <div class="take-picture__mask">
            <canvas id="canvas" class="take-picture__canvas"></canvas>

            <video playsinline class="take-picture__video" autoplay></video>
        </div>
        <button class="take-picture__start-camera button visible">
            Start camera
        </button>
        <button class="take-picture__pause-camera button">
            Capture!
        </button>
        <button class="take-picture__restart-camera button">
            Nah take it again!
        </button>
        <button class="take-picture__save-camera button">
            I like it, save it!
        </button>
        <p class="share-text">Don’t forget to tag us at @oneunderglasgow on Instagram/Facebook!</p>
        <a href="/digital-scorecard/">
            <button class="take-picture__play-again button">
                Play Again!
            </button>
        </a>
    </section>

</section>

<?php get_footer(); ?>