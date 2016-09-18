/*
 * jQuery File Upload File Type Icon Plugin
 * option
 * - loadFontSize: fa-5x
 */

/* jshint nomen:false */
/* global define, require, window, Blob */

;(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            './jquery.fileupload-process'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(
            require('jquery')
        );
    } else {
        // Browser globals:
        factory(
            window.jQuery
        );
    }
}(function ($) {
    'use strict';

    // Prepend to the default processQueue:
    $.blueimp.fileupload.prototype.options.processQueue.unshift(
        {
            action: 'loadIcon',
            prefix: true,
            fontSize: '@',
        },
        {
            action: 'setIcon'
        }
    );

    // The File Upload Resize plugin extends the fileupload widget
    // with image resize functionality:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {
        options: {
            loadIconFontSize: 'fa-5x'
        },

        _iconElement: document.createElement('i'),

        processActions: {
            loadIcon: function (data, options) {
                if (options.disabled) {
                    return data;
                }

                var file = data.files[data.index],
                    extension = file.name.split('.').pop().toLowerCase(),
                    icons = this._getIcons(),
                    extensions = this._getExtensions(icons),
                    icon;

                icon = this._iconElement.cloneNode(false);
                icon.className = 'fa ' + options.fontSize + ' fa-fw ' + (extensions[extension] || icons.file);
                data.icon = icon;

                return data;
            },

            // Sets the icon element as a property of the file object:
            setIcon: function (data, options) {
                if (data.icon && !options.disabled) {
                    data.files[data.index][options.name || 'preview'] = data.icon;
                }
                return data;
            }
        },

        // https://github.com/spatie/font-awesome-filetypes
        _getIcons: function () {
            return {
                image: 'fa-file-image-o',
                pdf: 'fa-file-pdf-o',
                word: 'fa-file-word-o',
                powerpoint: 'fa-file-powerpoint-o',
                excel: 'fa-file-excel-o',
                audio: 'fa-file-audio-o',
                video: 'fa-file-video-o',
                zip: 'fa-file-zip-o',
                code: 'fa-file-code-o',
                file: 'fa-file-o'
            };
        },

        _getExtensions: function (icons) {
            return {
                gif: icons.image,
                jpeg: icons.image,
                jpg: icons.image,
                png: icons.image,

                pdf: icons.pdf,

                doc: icons.word,
                docx: icons.word,

                ppt: icons.powerpoint,
                pptx: icons.powerpoint,

                xls: icons.excel,
                xlsx: icons.excel,

                aac: icons.audio,
                mp3: icons.audio,
                ogg: icons.audio,

                avi: icons.video,
                flv: icons.video,
                mkv: icons.video,
                mp4: icons.video,

                gz: icons.zip,
                zip: icons.zip,

                css: icons.code,
                html: icons.code,
                js: icons.code,

                file: icons.file
            };
        }
    });

}));
