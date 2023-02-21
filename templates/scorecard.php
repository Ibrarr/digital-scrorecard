<?php get_header(); ?>

<section id="scorecard-section">
    <div class="header-logo"><img src="<?php echo plugin_dir_url(dirname(__FILE__)) . 'src/images/One-Under-Logo.png' ?>"></div>

    <div id="scorecard-form">
        <form id="scoreForm" action="/digital-scorecard/results/" method="post">
            <input type="hidden" name="uniqid" id="uniqid" value="<?php echo uniqid('result'); ?>">
            <input type="hidden" name="gameScores" id="gameScores" value="">
            <div id="tab-section">
                <div class="tab">
                    <h1>Hello</h1>
                    <h2>Adventurer!</h2>
                    <div class="form-field">
                        <label for="initialPlayer">WHAT'S YOUR NAME?</label>
                        <br>
                        <input type="text" name="initialPlayer" id="initialPlayer" placeholder="Your Name" value="" oninput="this.className = ''">
                    </div>
                    <div class="form-field">
                        <label for="course">COURSE</label>
                        <br>
                        <div class="custom-select">
                            <select name="course" id="course" value="">
                                <option value="" disabled selected>Select Course</option>
                                <option value="9">Madhouse</option>
                                <option value="9">Glasvegas</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-field">
                        <label for="numPlayers">NUMBER OF PLAYERS?</label>
                        <br>
                        <div class="slidecontainer">
                            <input type="range" name="numPlayers" id="numPlayers" class="slider" min="1" max="5" value="4">
                            <span id="totalNumPlayers"></span>
                        </div>
                    </div>
                </div>
                <div class="tab two">
                    <h1>Who's</h1>
                    <h2>Playing</h2>
                    <div class="form-field">
                        <div id="genoratedInputs">
                            <input type="text" name="Player1" id="Player1" placeholder="Player 1" value="">
                        </div>
                    </div>
                </div>
                <div class="tab three">
                    <h1>Rules</h1>
                    <h2>Of The Game</h2>
                    <div class="form-field">
                        <div class="accordion">
                            <div class="heading">GROUP SIZE</div>
                            <div class="contents">Group size bigger than 5? Noone likes a human traffic jam, split up into different groups.</div>
                            <div class="heading">TEE OFF</div>
                            <div class="contents">Take it in turns to tee off before taking your second shot (it’s more fun this way, trust us) and move to the next hole as soon as you've finished playing.</div>
                            <div class="heading">STROKE LIMIT</div>
                            <div class="contents">6 stroke limit on each hole - no point making things worse for yourself. </div>
                            <div class="heading">OBSTACLES</div>
                            <div class="contents">If the ball lands too close to an obstruction, you can move it six inches (for the mathematically challenged, that’s the size of an average smartphone). If you hit the golf ball out of the course you’re playing, retrieve it, place it where it went out and take a one-shot penalty.</div>
                            <div class="heading">SAFETY</div>
                            <div class="contents">No swinging (your club) - it’s not that kind of establishment. Please watch your step; the uneven terrain that makes the courses enjoyable can add to the risk of injury from falling. Play at your own risk. </div>
                        </div>
                    </div>
                    <div class="form-field">
                        <label><input name="checkboxRules" id="checkboxRules" type="checkbox" required value>I Accept The Rules Of The Game</label>
                    </div>
                </div>
            </div>
            <div class="tab last">
                <h1>Thats it!</h1>
                <h2>Submitting your results now</h2>
            </div>
            <div class="form-buttons">
                <button type="button" id="prevBtn">Previous</button>
                <button type="button" id="nextBtn" class="next1">Let's Golf!</button>
            </div>
        </form>
    </div>

</section>

<?php get_footer(); ?>