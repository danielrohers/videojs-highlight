/*! videojs-highlight - v0.0.0 - 2015-3-27
 * Copyright (c) 2015 Daniel Röhers Moura
 * Licensed under the Apache-2.0 license. */
(function(window, videojs) {

    'use strict';

    var defaults = {
        enable: false
    };

    var time = {
        start : null,
        end : null
    };

    var initTime = function () {
        time.start = null;
        time.end = null;
    };

    var dom = function(name, properties, assignmentProperties) {
        var element = document.createElement(name);
        if (properties) {
            for (var key in properties) {
                element.setAttribute(key, properties[key]);
            }
        }
        if (assignmentProperties) {
            for (var key in assignmentProperties) {
                element[key] = assignmentProperties[key];
            }
        }
        return element;
    };

    var createButton = function () {
        var control = dom('div', {
            class: 'vjs-highlight-control vjs-control',
            role: 'button'
        });

        var content = dom('div', {
            class: 'vjs-control-content'
        });

        var text = dom('span', {
            class: 'vjs-control-text'
        });
        text.innerHTML = 'Highlight'

        content.appendChild(text);
        control.appendChild(content);
        return control;
    };

    var insertButton = function () {
        var button = createButton();
        var time = document.querySelector('.vjs-remaining-time');
        time.parentNode.insertBefore(button, time.nextSibling);
    };

    var eventClick = function () {
        var button = document.querySelector('.vjs-highlight-control');
        var video = document.querySelector('video');
        button.addEventListener('click', function () {
            populateTime(video.currentTime);
        });
    };

    var populateTime = function (currentTime) {
        if (!time.start) {
            time.start = currentTime;
            _insertBar();
        } else {
            _removeBar();
            time.end = currentTime;
            alert(JSON.stringify(time));
            initTime();
        }
    };

    var _insertBar = function () {
        var progress = document.querySelector('.vjs-play-progress');
        var barOriginal = progress.cloneNode();
        barOriginal.classList.add('vjs-play-progress-original');
        progress.classList.add('vjs-play-progress-highlight');
        progress.parentNode.insertBefore(barOriginal, progress.nextSibling);
    };

    var _removeBar = function () {
        var progress = document.querySelector('.vjs-play-progress');
        var barOriginal = document.querySelector('.vjs-play-progress-original');
        var barHighlight = progress.cloneNode();
        barHighlight.style.left = barOriginal.style.width;
        barHighlight.style.width = (_widthToNumber(barHighlight) - _widthToNumber(barOriginal)) + '%';
        progress.classList.remove('vjs-play-progress-highlight');
        progress.parentNode.insertBefore(barHighlight, progress.nextSibling);
        barOriginal.remove();
    };

    var _widthToNumber = function (element) {
        return Number(element.style.width.replace('%', ''));
    };

    /**
    * Initialize the plugin.
    * @param options (optional) {object} configuration for the plugin
    */
    var highlight = function(options) {
        var settings = videojs.util.mergeOptions(defaults, options),
            player = this;

        // TODO: write some amazing plugin code
        if (settings.enable) {
            initTime();
            insertButton();
            eventClick();
        }
    };

    // register the plugin
    videojs.plugin('highlight', highlight);

})(window, window.videojs);
