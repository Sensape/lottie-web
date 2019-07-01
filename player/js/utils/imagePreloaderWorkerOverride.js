var ImagePreloader = (function(){

    var proxyImage = (function(){
        /*
        var canvas = createTag('canvas');
        canvas.width = 1;
        canvas.height = 1;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(0, 0, 1, 1);
        return canvas; */
    }())

    function imageLoaded(){
        console.log("Lottie loading asset");
        this.loadedAssets += 1;
        if(this.loadedAssets === this.totalImages){
            console.log(this.images);
            if(this.imagesLoadedCb) {
                this.imagesLoadedCb(null);
            }
        }
    }

    function getAssetsPath(assetData, assetsPath, original_path) {
        var path = '';
        if (assetData.e) {
            path = assetData.p;
        } else if(assetsPath) {
            var imagePath = assetData.p;
            if (imagePath.indexOf('images/') !== -1) {
                imagePath = imagePath.split('/')[1];
            }
            path = assetsPath + imagePath;
        } else {
            path = original_path;
            path += assetData.u ? assetData.u : '';
            path += assetData.p;
        }
        return path;
    }

    function createImageData(assetData) {
        var that = this;
        var path = getAssetsPath(assetData, this.assetsPath, this.path);
          if(!this._isDataURL(path)) {
            fetch(path, { mode: 'cors' })
            .then(function(response) { return response.blob()})
            .then(function(blob) { return createImageBitmap(blob)})
            .then(function(bitmap)  {
                img.src = path;
                var ob = {
                    img: bitmap,
                    assetData: assetData
                }
                that.images.push(ob);
                that._imageLoaded.call(that);
            })
            .catch(console.warn);
        } else {
            console.log("Lottie Found data URL");
            dataURItoBlob(path)
            .then(function(blob) {
                console.log("Lottie converted dataurl to blob", blob);
                return createImageBitmap(blob)
            })            
            .then(function(bitmap) {
                console.log("Lottie storing image", bitmap);
                var ob = {
                    img: bitmap,
                    assetData: assetData
                }
                that.images.push(ob);
                that._imageLoaded.call(that);
            })
            .catch(console.warn);
        }

            /*
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.addEventListener('load', this._imageLoaded.bind(this), false);
        img.addEventListener('error', function() {
            console.log("Error loading image");
            ob.img = proxyImage;
            this._imageLoaded();
        }.bind(this), false);
        img.src = path;
        var ob = {
            img: img,
            assetData: assetData
        }*/
        //return ob;
    }

    function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
      
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
      
        // create a view into the buffer
        var ia = new Uint8Array(ab);
      
        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
      
        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], {type: mimeString});
        return Promise.resolve(blob);      
    }

    function loadAssets(assets, cb){
        console.log("Lottie loading images", assets, cb);
        this.imagesLoadedCb = cb;
        var i, len = assets.length;
        for (i = 0; i < len; i += 1) {
            if(!assets[i].layers){
                this.totalImages += 1;
                this._createImageData(assets[i])
            }
        }
    }


    function isDataURL(s) {
        var regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
        return !!s.match(regex);
    }

    function setPath(path){
        this.path = path || '';
    }

    function setAssetsPath(path){
        this.assetsPath = path || '';
    }

    function getImage(assetData) {
        var i = 0, len = this.images.length;
        while (i < len) {
            if (this.images[i].assetData === assetData) {
                return this.images[i].img;
            }
            i += 1;
        }
    }

    function destroy() {
        this.imagesLoadedCb = null;
        this.images.length = 0;
    }

    function loaded() {
        return this.totalImages === this.loadedAssets;
    }

    return function ImagePreloader(){
        this.loadAssets = loadAssets;
        this.setAssetsPath = setAssetsPath;
        this.setPath = setPath;
        this.loaded = loaded;
        this.destroy = destroy;
        this.getImage = getImage;
        this._createImageData = createImageData;
        this._imageLoaded = imageLoaded;
        this._isDataURL = isDataURL;
        this._dataURItoBlob = dataURItoBlob;
        this.assetsPath = '';
        this.path = '';
        this.totalImages = 0;
        this.loadedAssets = 0;
        this.imagesLoadedCb = null;
        this.images = [];
    };
}());