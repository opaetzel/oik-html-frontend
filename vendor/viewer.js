"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Viewer = function () {
    function Viewer(canvasId, relativePath, numImages, headers, withExtension) {
        _classCallCheck(this, Viewer);

        this.canvasId = canvasId;
        this.canvas = document.querySelector("#" + canvasId);
        this.context = this.canvas.getContext("2d");
        this.relativePath = relativePath;
        this.numImages = numImages;
        this.images = {};
        this.imagesLoaded = 0;
        this.headers = headers;
        this.withExtension = withExtension;

        this.currentImage = 0;
        this.startImage = 0;
        this.mouseDrag = false;
        this.mouseStart = { x: 0, y: 0 };

        //this.startWatching();
        this.preload();
    }

    _createClass(Viewer, [{
        key: "preload",
        value: function preload() {
            var _this = this;

            console.log("in preload", this.numImages);
            for (var i = 0; i < this.numImages; i++) {
                var xhr = new XMLHttpRequest();
                if (this.withExtension) {
                    xhr.open("GET", this.relativePath + i + ".jpg");
                } else {
                    xhr.open("GET", this.relativePath + i);
                }
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.headers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        header = _step.value;

                        xhr.setRequestHeader(header.key, header.value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                xhr.imageNum = i;
                xhr.responseType = "blob";
                xhr.onload = function (e) {
                    var urlCreator = window.URL || window.webkitURL;
                    var imageUrl = urlCreator.createObjectURL(e.target.response);
                    var image = new Image();
                    image.onload = function () {
                        _this.images[e.target.imageNum] = image;
                        _this.imagesLoaded++;
                        if (_this.imagesLoaded === _this.numImages) {
                            _this.startWatching();
                        }
                    };
                    image.src = imageUrl;
                };
                xhr.send();
            }
        }
    }, {
        key: "startWatching",
        value: function startWatching() {
            this.renderImage();
            this.canvas.addEventListener("mousedown", this.mousedownListener.bind(this));
            document.addEventListener("mousemove", this.mousemoveListener.bind(this));
            document.addEventListener("mouseup", this.mouseupListener.bind(this));

            //        document.addEventListener("fullscreenchange", this.fsChange.bind(this));
            document.addEventListener("webkitfullscreenchange", this.fsChange.bind(this));
            document.addEventListener("mozfullscreenchange", this.fsChange.bind(this));
            document.addEventListener("msfullscreenchange", this.fsChange.bind(this));
        }
    }, {
        key: "fsChange",
        value: function fsChange() {
            console.log("fullscreen change");
            if (document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullScreenElement) {
                console.log("adding class");
                this.oldWidth = this.canvas.width;
                this.oldHeight = this.canvas.height;
                this.canvas.width = document.body.clientWidth;
                this.canvas.height = document.body.clientHeight;
                console.log(this.canvas.width, this.canvas.height);
                $('#' + this.canvasId).addClass('fullscreen');
            } else {
                console.log("removing class");
                $('#' + this.canvasId).removeClass('fullscreen');
                this.canvas.width = this.oldWidth;
                this.canvas.height = this.oldHeight;
            }
            this.renderImage();
        }
    }, {
        key: "mousedownListener",
        value: function mousedownListener(e) {
            this.mouseDrag = true;
            this.mouseStart = { x: e.screenX, y: e.screenY };
            this.startImage = this.currentImage;
        }
    }, {
        key: "mousemoveListener",
        value: function mousemoveListener(e) {
            if (!this.mouseDrag) {
                return;
            }
            var imageNum = Math.floor(((this.mouseStart.x - e.screenX) / 10 + this.startImage) % this.numImages);
            if (imageNum < 0) {
                imageNum = this.numImages + imageNum;
            }
            if (imageNum != this.currentImage) {
                this.currentImage = imageNum;
                this.renderImage();
            }
        }
    }, {
        key: "mouseupListener",
        value: function mouseupListener(e) {
            if (!this.mouseDrag) {
                return;
            }
            this.mouseDrag = false;
            var imageNum = Math.floor(((this.mouseStart.x - e.screenX) / 10 + this.startImage) % this.numImages);
            if (imageNum < 0) {
                imageNum = this.numImages + imageNum;
            }
            this.currentImage = imageNum;
            this.renderImage();
        }
    }, {
        key: "renderImage",
        value: function renderImage() {
            console.log("render image..");
            var xpos = 0,
                ypos = 0;
            var ctx = this.context;
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            var image = this.images[this.currentImage];
            console.log($('#' + this.canvasId).width(), $('#' + this.canvasId).height());
            //let scale = $('#'+this.canvasId).width()/image.width;
            var scale = this.canvas.width / image.width;
            if (scale * image.height > $('#' + this.canvasId).height()) {
                //scale = $('#'+this.canvasId).height()/image.height;
                scale = this.canvas.height / image.height;
                //xpos = ($('#'+this.canvasId).width() - image.width*scale)/2;
                xpos = (this.canvas.width - image.width * scale) / 2;
                console.log("xpos", xpos);
            } else {
                //ypos = ($('#'+this.canvasId).height() - image.height*scale)/2;
                ypos = (this.canvas.height - image.height * scale) / 2;
                console.log("ypos", ypos);
            }
            if (document.webkitFullscreenElement) {
                var scaleWidth = scale * ($(this.canvas).height() / this.canvas.height);
                xpos = (this.canvas.width - image.width * scaleWidth) / 2;
                console.log(xpos, ypos, image.width * scaleWidth, image.height * scale);
                console.log(image);
                ctx.drawImage(image, xpos, ypos, image.width * scaleWidth, image.height * scale);
            } else {
                console.log(xpos, ypos, image.width * scale, image.height * scale);
                console.log(image);
                ctx.drawImage(image, xpos, ypos, image.width * scale, image.height * scale);
            }
        }
    }, {
        key: "fullscreen",
        value: function fullscreen() {
            if (this.canvas.webkitRequestFullscreen) {
                this.canvas.webkitRequestFullscreen();
            }
            if (this.canvas.mozRequestFullScreen) {
                this.canvas.mozRequestFullScreen();
            }
            if (this.canvas.msRequestFullscreen) {
                this.canvas.msRequestFullscreen();
            }
        }
    }]);

    return Viewer;
}();