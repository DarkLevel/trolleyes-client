/* global moduleCommon */

'use strict';

moduleCommon.controller('homeController', ['$anchorScroll',
    function ($anchorScroll) {
        $anchorScroll();
    }
]);