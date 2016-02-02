var $ = jQuery;
var deleteIds = [];

$(document).ready(function () {

    var changeNotSaved = false;
    var codesAddedSinceLastSave = 0;

    $('#llms_voucher_add_codes').click(function (e) {
        e.preventDefault();

        var qty = $('#llms_voucher_add_quantity').val();
        var uses = $('#llms_voucher_add_uses').val();
        var html = '';

        changeNotSaved = true;

        if ($.isNumeric(qty) && $.isNumeric(uses)) {
            if (parseInt(qty) > 0) {

                codesAddedSinceLastSave += parseInt(qty);

                if(qty > 50) {
                    alert("You can only generate 50 rows at a time");
                    return;
                }
                if(codesAddedSinceLastSave > 50) {
                    alert("Please save before adding any more codes, limit is 50 at a time");
                    codesAddedSinceLastSave -= parseInt(qty);
                    return;
                }

                for (var i = 1; i <= parseInt(qty); i++) {
                    html += '<tr>' +
                        '<td></td>' +
                        '<td>' +
                        '<input type="text" maxlength="20" placeholder="Code" value="' + randomizeCode() + '" name="llms_voucher_code[]">' +
                        '<input type="hidden" name="llms_voucher_code_id[]" value="0">' +
                        '</td>' +
                        '<td><span>0 / </span><input type="text" placeholder="Uses" value="' + uses + '" class="llms-voucher-uses" name="llms_voucher_uses[]"></td>' +
                        '<td><a href="#" class="llms-voucher-delete">' + deleteIcon + '</a></td>' +
                        '</tr>';
                }
            }
        }

        $('#llms_voucher_tbody').append(html);

        bindDeleteVoucherCode();
    });

    bindDeleteVoucherCode();

    $('#llms_voucher_tbody input').change(function() {
        changeNotSaved = true;
    });

    window.onbeforeunload = function() {
        return changeNotSaved ? "If you leave this page you will lose your unsaved changes." : null;
    };

    $('input[type=submit]').click(function (e) {
        //if course or membership is not selected, don't allow user to save
        if(!($('#_llms_voucher_courses').val() || $('#_llms_voucher_membership').val())) {
            alert('Please select course or membership before saving.');
            return false;
        }

        changeNotSaved = false;
    });

    function bindDeleteVoucherCode() {
        $('.llms-voucher-delete').unbind('click');
        $('.llms-voucher-delete').click(function (e) {
            e.preventDefault();

            var t = $(this);
            var old = t.data('id');

            changeNotSaved = true;

            if (old) {
                deleteIds.push(old);

                $('#delete_ids').val(deleteIds.join(','));
            } else {
                codesAddedSinceLastSave--;
            }

            // remove html block
            t.closest('tr').remove();
        });
    }
});
function randomizeCode() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 12; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
