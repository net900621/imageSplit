/*common*/
/**
 * @author yaoyao
 * @param {opt}
 * @example
 * var ex = require("wap/app/lark/splitImg");
 * var opt = {
 *     "file" : "loadFile",//上传文件控件
 *     "split" : 3,//切分成3*3的图
 *     "cbk" : function(code , arr){//code为错误码，为1时表示处理错误，arr为空。为0时表示处理正确
 *         alert(arr)
 *     }//回调函数
 * }
 * ex(opt);
 */
return function(opt){

	opt.file = opt.file || 'loadFile';
	opt.split = opt.split || 3;
	opt.cbk = opt.cbk || function(arr){
		window._arr = arr;
	}

	var canvas = document.createElement('canvas'),
		fileInput = document.getElementById(opt.file);

	canvas.style.display = "none";
	document.body.appendChild(canvas);

	var context = canvas.getContext('2d');

	fileInput.onchange = function(){

	    var file = this.files[0];
	    var fReader = new FileReader();

	    if (!file) {return false};

	    fReader.onload = function (e){
	    	
	    	var _img = new Image();
	    	// if(!this.result.match(/^data:image/g)){
	    	// 	alert("对不起，上传文件非图片，请重新上传！")
	    	// 	return false;
	    	// }

	    	_img.onload = function(){

	    		var _this = this,
	                _width = _this.width,
	                _height = _this.height,
	                _canvas = canvas;

	            _width = _width - _width % opt.split;
	            _height = _height - _height % opt.split;
	            _width > _height ? _width = _height : _height = _width;
	            _canvas.setAttribute('width' , _width / opt.split);
	            _canvas.setAttribute('height' , _width / opt.split);

	            var scale = _width / opt.split,
	            	arr = [],_num;

	            for (var i = 0; i < opt.split * opt.split; i++) {
	            	_num = i % opt.split;
	            	context.clearRect(0,0,_canvas.getAttribute('width') , _canvas.getAttribute('height'));
	            	context.drawImage(_this,-(_num)*scale , -((i - _num) / opt.split)*scale);
	            	arr.push(canvas.toDataURL('image/jpeg'));
	            };

	            opt.cbk(0,arr);
	    	}

	    	_img.onerror = function(){
				opt.cbk(1,[]);
			};

	    	_img.src = this.result;
	    };

	    fReader.onerror = function(){
			opt.cbk(1,[]);
		};
	    fReader.readAsDataURL(file);
	};

	fileInput.onerror = function(){
		opt.cbk(1,[]);
	}
}
