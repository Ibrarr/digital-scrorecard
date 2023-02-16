<?php get_header(); ?>

<section id="scorecard-section">
    <div class="header-logo"><img src="<?php echo plugin_dir_url(dirname(__FILE__)) . 'src/images/One-Under-Logo.png' ?>"></div>

    <div id="scorecard-form">
        <form id="scoreForm" action="<?php the_permalink(); ?>" method="post">
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
            <div class="tab">
                <h1>Rules</h1>
                <h2>Of The Game</h2>
                <div class="form-field">
                    <div class="accordion-container">
                        <div class="accordion">
                            <div class="label">1. Group size bigger than 4?</div>
                            <div class="content">
                                <p>Testing</p>
                            </div>
                        </div>
                        <hr>
                        <div class="accordion">
                            <div class="label">2. Group size bigger than 4?</div>
                            <div class="content">
                                <p>Testing</p>
                            </div>
                        </div>
                        <hr>
                        <div class="accordion">
                            <div class="label">3. Group size bigger than 4?</div>
                            <div class="content">
                                <p>Testing</p>
                            </div>
                        </div>
                        <hr>
                        <div class="accordion">
                            <div class="label">4. Group size bigger than 4?</div>
                            <div class="content">
                                <p>Testing</p>
                            </div>
                        </div>
                        <hr>
                        <div class="accordion">
                            <div class="label">5. Group size bigger than 4?</div>
                            <div class="content">
                                <p>Testing</p>
                            </div>
                        </div>
                        <hr>
                        <div class="accordion">
                            <div class="label">6. Group size bigger than 4?</div>
                            <div class="content">
                                <p>Testing</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-field">
                    <label><input name="rules" required="" id="checkbox" type="checkbox">I Accept The Rules Of The Game</label>
                </div>
            </div>
            <div class="tab">
                <h1>Hole 1</h1>
            </div>
            <div class="tab">
                <h1>Hole 2</h1>
            </div>
            <div class="tab">
                <h1>Hole 3</h1>
            </div>
            <div class="form-buttons">
                <button type="button" id="prevBtn">Previous</button>
                <button type="button" id="nextBtn" class="next1">Next Hole</button>
            </div>
        </form>
    </div>

</section>

<?php get_footer(); ?>