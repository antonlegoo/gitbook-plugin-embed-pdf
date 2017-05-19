var copy            = require( "copy" );

module.exports = {
    // Extend website resources and html
    website: {
        // assets: "./book",
        // js: [
        //     "test.js"
        // ],
        // css: [
        //     "test.css"
        // ]
    },

    // Extend templating blocks
    blocks: {
        
        pdf: {
            process: function(block) {
                
                var book = this;

                // Return nothing and warn if there's no source
                if( !block.kwargs.src )
                {
                    book.log.warn.ln( `Embed-pdf: no src attribute in pdf tag in file ${this.ctx.ctx.file.path}.` );
                    return ``;
                } 

                // Construct the return html
                var html = `<embed class="embed-pdf" src="${block.kwargs.src}"`;
                    // Add the width if passed
                    html+= (block.kwargs.width) ? ` width="${block.kwargs.width}"` : "";
                    // Add the height if passed
                    html+= (block.kwargs.height) ? ` height="${block.kwargs.height}"` : "";
                    html+= ` type='application/pdf'>`;
                // Return the html
                return html;
            }
        }
    },

    // Hook process during build
    hooks: {
        "init": function() {

            var book = this;

            // Get the output assets dir
            var output_dir = `${book.output.root()}/assets`;

            // Copy all PDF's in assets to the build dir's assets
            copy('assets/**/*.pdf', output_dir, function(err, files) {
                // Handle error
                if (err) throw err;
                // Log
                book.log.info.ln( `Embed-pdf: copied over ${files.length} pdf files.` );
            });
        },
    }
};
