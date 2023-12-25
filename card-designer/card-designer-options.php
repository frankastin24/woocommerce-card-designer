<div class="wrap">

    <h2>Card Designer Options</h2>
    <h3>Fonts</h3>
    <div class="table-container">
        <table class="fonts-table form-table" role="presentation">
            <tbody>

            </tbody>
        </table>
    </div>
    <button id="add_new_font" class="button button-primary button-large">Add New Font</button>
    <div id="add_new_font_dialog" class="dialog" style="display:none;">
        <span class="close">X</span>

        <h3>Add New Font</h3>
        <select id="new_font_type">
            <option value="google_fonts">Add Google Font</option>
            <option value="upload_fonts">Upload Font</option>
        </select>
        <div id="add_google_font">
            <div class="form-group">
                <label>Font Family</label>
                <input type="text" id="google_font_family" />
            </div>
            <div class="form-group">
                <label>Font Weights (seperate with commas)</label>
                <input type="text" id="google_font_weights" />
            </div>
            <button id="add_new_google_font" class="button button-primary button-large">Add Font</button>
        </div>
        <div id="upload_font" style="display:none;">
            <div class="form-group">
                <label>Font Family :</label>
                <input type="text" id="upload_font_family" />
            </div>
            <div class="form-group">
                <label>Font Weights (seperate with commas) :</label>
                <input type="text" id="upload_font_weight" />
            </div>
            <div class="form-group">
                <label>Upload Font File :</label>
                <input type="file" id="upload_font_file" />
            </div>
            <button id="add_new_upload_font" class="button button-primary button-large">Add Font</button>
        </div>

    </div>

    <h3>Colors</h3>

    <div class="table-container">
        <table class="colors-table form-table" role="presentation">
            <tbody>

            </tbody>
        </table>
    </div>

    <button id="add_new_color" class="button button-primary button-large">Add New Color</button>
    <div id="add_new_color_dialog" class="dialog" style="display:none;">
        <span class="close">X</span>

        <h3>Add New Color</h3>
        <div class="form-group">
            <label>Color Name</label>
            <input id="color_name" type="text" />
        </div>
        <div class="form-group">
            <label>Color Value</label>
            <input id="color" type="text" />
        </div>

        <button id="add_color" class="button button-primary button-large">Add Color</button>
    </div>

    <h3>Global Card Sizes</h3>

    <div class="table-container">
        <table class="card-sizes-table form-table" role="presentation">
            <tbody>

            </tbody>
        </table>
    </div>

    <button id="add_new_card_size" class="button button-primary button-large">Add New Card Size</button>

    <div id="add_new_card_size_dialog" class="dialog" style="display:none;">
        <span class="close">X</span>

        <h3>Add New Card Size</h3>
        <div class="form-group">
            <label>Card Size</label>
            <input id="card_size" placeholder="100 x 100cm" type="text" />
        </div>
        <div class="form-group">
            <label>Price</label>
            <input id="card_price" type="number" />
        </div>

        <button id="add_card_size" class="button button-primary button-large">Add Card Size</button>

    </div>

</div>
</div>

<style>
    #wpfooter {
        position: relative !important;
    }

    .table-container {
        overflow-y: scroll;
        max-height: 280px;
    }

    .form-table th {
        background: #FFF;
        padding-left: 10px;
    }

    tr {
        border-bottom: 1px solid #ccc;
        background: #f0f0f1;
    }

    #add_new_font,
    #add_new_color {
        margin-top: 10px;
    }

    .dialog {
        position: absolute;
        top: 100px;
        background: #FFF;
        padding: 20px 20px;
        border: 1px solid #CCC;
    }

    .close {
        position: absolute;
        font-weight: 800;
        right: 4px;
        top: 4px;
        color: #5f5e5e;
        cursor: pointer;
    }

    .dialog h3 {
        margin-top: 0px;
    }

    .dialog select {
        width: 100%;
        padding: 5px 10px;
        max-width: 100%;
        margin-bottom: 10px;
    }

    .dialog .form-group {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
    }

    .dialog label {
        margin-right: 10px;
    }
</style>

<script>
    $ = jQuery;
    const nonce = '<?= wp_create_nonce('add-font-nonce'); ?>';
    let fonts = <?= json_encode(get_option('FA_Card_Designer_Fonts', [])); ?>;
    let colors = <?= json_encode(get_option('FA_Card_Designer_Colors', [])); ?>;
    let cardSizes = <?= json_encode(get_option('FA_Card_Designer_Card_Sizes', [])); ?>;

    const populateFontTable = () => {

        let html = fonts.length > 0 ? '<tr><th>Font Type</th><th>Font Family</th><th>Font Weights</th><th>Delete</th></tr>' : '<tr><td>No fonts added</td></tr>';
        fonts.forEach(font => {
            html += `<tr><td>${font[0]}</td><td>${font[1]}</td><td>${font[2]}</td><td><button class="delete_font">Delete</button></tr>`;
        });
        jQuery('.fonts-table tbody').html(html);
    }
    const populateColorTable = () => {

        let html = colors.length > 0 ? '<tr><th>Color Name</th><th>Color Value</th><th> Delete</th></tr>' : '<tr><td>No colors added</td></tr>';
        colors.forEach(color => {
            html += `<tr><td>${color[0]}</td><td>${color[1]}</td><td><button class="delete_color">Delete</button></tr>`;
        });
        jQuery('.colors-table tbody').html(html);
    }
    const populateCardSizesTable = () => {

        let html = cardSizes.length > 0 ? '<tr><th>Card Size</th><th>Price</th><th> Delete</th></tr>' : '<tr><td>No colors added</td></tr>';
        cardSizes.forEach(cardSize => {
            html += `<tr><td>${cardSize[0]}</td><td>${cardSize[1]}</td><td><button class="delete_card_size">Delete</button></tr>`;
        });
        jQuery('.card-sizes-table tbody').html(html);
    }

    populateFontTable();
    populateColorTable();
    populateCardSizesTable();

    jQuery('#add_new_font').on('click', () => {
        jQuery('#add_new_font_dialog').show();
    })
    jQuery('#add_new_card_size').on('click', () => {
        jQuery('#add_new_card_size_dialog').show();
    })

    jQuery('#add_new_color').on('click', () => {
        jQuery('#add_new_color_dialog').show();
    })

    jQuery('.close').on('click', (event) => {
        $(event.target).parent('div').hide();
    })

    jQuery('#new_font_type').on('change', () => {
        if (jQuery('#new_font_type').val() == 'google_fonts') {
            jQuery('#upload_font').hide();
            jQuery('#add_google_font').show();
        } else {
            jQuery('#upload_font').show();
            jQuery('#add_google_font').hide();
        }

    })
    jQuery('#add_new_google_font').on('click', () => {
        add_new_font('google')
    })
    jQuery('#add_new_upload_font').on('click', () => {
        add_new_font('upload')
    })
    jQuery('body').on('click', '.delete_font', function(e) {
        const form_data = new FormData();
        form_data.append('action', 'delete_font');
        form_data.append('nonce', nonce);
        form_data.append('index', jQuery(this).parent().parent().index() - 1);
        jQuery.ajax({
            type: 'POST',
            url: ajaxurl,
            data: form_data,
            processData: false,
            contentType: false,
            dataType: 'json',

            success: function(data) {
                fonts = data;
                populateFontTable();
            },

            error: function(MLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }

        });
    });
    jQuery('body').on('click', '.delete_color', function(e) {
        const form_data = new FormData();
        form_data.append('action', 'delete_color');
        form_data.append('nonce', nonce);
        form_data.append('index', jQuery(this).parent().parent().index() - 1);
        jQuery.ajax({
            type: 'POST',
            url: ajaxurl,
            data: form_data,
            processData: false,
            contentType: false,
            dataType: 'json',

            success: function(data) {
                colors = data;
                populateColorTable();
            },

            error: function(MLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }

        });
    });
    jQuery('body').on('click', '.delete_card_size', function(e) {
        const form_data = new FormData();
        form_data.append('action', 'delete_card_size');
        form_data.append('nonce', nonce);
        form_data.append('index', jQuery(this).parent().parent().index() - 1);
        jQuery.ajax({
            type: 'POST',
            url: ajaxurl,
            data: form_data,
            processData: false,
            contentType: false,
            dataType: 'json',

            success: function(data) {
                cardSizes = data;
                populateCardSizesTable();
            },

            error: function(MLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }

        });
    });

    function add_new_font(type) {
        const form_data = new FormData();
        form_data.append('action', 'add_new_font');
        form_data.append('nonce', nonce);

        if (type == 'google') {
            if (jQuery('#google_font_family').val().trim() == '') return alert('Please enter a font family name');
            form_data.append('type', 'google');
            form_data.append('fontfamily', jQuery('#google_font_family').val());
            form_data.append('fontweights', jQuery('#google_font_weights').val());
        } else {
            if (jQuery('#upload_font_family').val().trim() == '') return alert('Please enter a font family name');
            if (jQuery('#upload_font_file').val() == '') return alert('Please select a font file to upload');
            form_data.append('fontfamily', jQuery('#upload_font_family').val());
            form_data.append('fontweights', jQuery('#upload_font_weight').val());
            const validFileExtensions = ["eot", "woff2", "woff", "ttf", "svg"];
            const file = jQuery("#upload_font_file")[0].files[0];
            const splitFileName = file.name.split('.');
            const extension = splitFileName.at(-1)
            if (!validFileExtensions.includes(extension)) return alert('File is not a font.');
            form_data.append("font_file", file);
        }
        jQuery.ajax({
            type: 'POST',
            url: ajaxurl,
            data: form_data,
            processData: false,
            contentType: false,
            dataType: 'json',

            success: function(data) {
                fonts = data;
                populateFontTable();
                jQuery('#add_new_font_dialog').hide();
                jQuery('#upload_font_weight').val('')
                jQuery('#upload_font_family').val('')
                jQuery('#google_font_family').val('')
                jQuery('#google_font_weights').val('')
            },

            error: function(MLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }

        });

    }

    jQuery('#add_color').on('click', () => {
        add_new_color()
    })

    function add_new_color() {
        const form_data = new FormData();
        form_data.append('action', 'add_new_color');
        form_data.append('nonce', nonce);


        if (jQuery('#color_name').val().trim() == '') return alert('Please color name');
        if (jQuery('#color').val().trim() == '') return alert('Please enter a color');

        form_data.append('color-name', jQuery('#color_name').val());
        form_data.append('color', jQuery('#color').val());

        jQuery.ajax({
            type: 'POST',
            url: ajaxurl,
            data: form_data,
            processData: false,
            contentType: false,
            dataType: 'json',

            success: function(data) {
                colors = data;
                populateColorTable();
                jQuery('#add_new_color_dialog').hide();
                jQuery('#color_name').val('')
                jQuery('#color').val('')
            },

            error: function(MLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }

        });



    }

    jQuery('#add_card_size').on('click', () => {
        add_new_card_size()
    })


    function add_new_card_size() {
        const form_data = new FormData();
        form_data.append('action', 'add_new_card_size');
        form_data.append('nonce', nonce);


        if (jQuery('#card_size').val().trim() == '') return alert('Please enter a card size');
        if (jQuery('#card_price').val().trim() == '') return alert('Please enter a price');

        form_data.append('card_size', jQuery('#card_size').val());
        form_data.append('price', jQuery('#card_price').val());

        jQuery.ajax({
            type: 'POST',
            url: ajaxurl,
            data: form_data,
            processData: false,
            contentType: false,
            dataType: 'json',

            success: function(data) {
                cardSizes = data;
                populateCardSizesTable();
                jQuery('#add_new_card_size_dialog').hide();
                jQuery('#card_size').val('')
                jQuery('#card_price').val('')
            },

            error: function(MLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }

        });

    }
</script>