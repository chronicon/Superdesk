/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

define('providers/flickr', [
    'providers',
    'jquery','jquery/tmpl',
    'jqueryui/draggable',
     'providers/flickr/adaptor',
    'tmpl!livedesk>providers/flickr',
    'tmpl!livedesk>providers/flickr/image-item',
    'tmpl!livedesk>providers/load-more',
    'jquery'
], function( providers,  $ ) {
$.extend(providers.flickr, {
        initialized: false,
	apykey : 'd2a7c7c0a94ae40d01aee8238845bdba',
        url : 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=%(apykey)s&text=%(text)s&format=json&nojsoncallback=1&per_page=8&page=%(start)s',
	data: [],
	init: function(){
                //console.log('flickr main init');
		if(!this.initialized) {
			this.render();
		}
		this.initialized = true;
	},
	render: function() {
		var self = this;
		this.el.tmpl('livedesk>providers/flickr', {}, function(){
			self.el.on('keyup','#flickr-search-text', function(e){
				if(e.keyCode == 13 && $(this).val().length > 0) {
					//enter press on google search text
					//check what search it is
					self.doFlickerImage(true);
				}
			});
		});	  
	},
        doFlickerImage : function(start) {
            var self = this;
            var text = $('#flickr-search-text').val();
            if (text.length < 1) {
                return;
            }
            $('#flickr-image-more').html('');
            start = typeof start !== 'undefined' ? start : 1;
            if ( start == 1) {
                $('#flickr-image-results').html('');
            }
            $.getJSON(str.format(this.url,{page: start, text: text, apykey: this.apykey}), {}, function(data){
                    self.data = self.data.concat(data.photos.photo);
                    data.photos.photos = data.photos.photo;
                    
                    if ( data.photos.photos.length > 1 ) {
                        $.tmpl('livedesk>providers/flickr/image-item', data.photos, function(e,o) {
                            $('#flickr-image-results').append(o).find('.flickr').draggable(
                            {
                                revert: 'invalid',
                                containment:'document',
                                helper: 'clone',
                                appendTo: 'body',
                                zIndex: 2700,
                                clone: true,
                                start: function() {
                                    $(this).data('data', self.adaptor.universal($(this).find('.result-content').html()) );
                                }
                                
                            }
                            );
                        });			

                    //show the load more button
                        var cpage = parseInt(data.photos.page);
                        var totalpages = data.photos.pages;
                        var nextpage = parseInt(cpage + 1);
                        var loadMore = {
                            name : 'flickr-load-more'
                        }
                        $('#flickr-image-more').tmpl('livedesk>providers/load-more', loadMore, function(){
                            $(this).find('[name="flickr-load-more"]').on('click', function(){
                                self.doFlickerImage(nextpage)
                            });
                        });
                    } else {
                        $.tmpl('livedesk>providers/no-results', data.responseData, function(e,o) {
                            $('#flickr-image-results').append(o);
                        });
                    }
                    
                    
            });

        },
        
});
return providers;
});