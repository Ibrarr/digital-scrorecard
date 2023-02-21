jQuery(function($) {
    $(document).ready(function() {
        $(document).on('click', '.minus', function(){
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) - 1;
            count = count < 0 ? 0 : count;
            $input.val(count);
            $input.change();
            return false;
        });
        $(document).on('click', '.plus', function(){
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) + 1;
            count = count > 5 ? 5 : count;
            $input.val(count);
            $input.change();
            return false;
        });
    });
});