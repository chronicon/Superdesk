define
([
    'jquery',
    'jquery/superdesk',
    'gizmo/superdesk',
    config.guiJs('media-archive', 'types/_default/grid-view'),
],
function($, superdesk, giz, ItemView)
{
    /*!
     * @see gizmo/views/list/ItemView
     */
    VideoView = ItemView.extend({});
    return VideoView;
});

