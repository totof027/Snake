window.onload = function(){

	var canvasWidth = 600;
	var canvasHeight = 400;
	var blockSize = 20;
	var ctx;
	var delay = 100;
	var snakee;

	init();

	function init(){
		var canvas = document.createElement('canvas');
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		canvas.style.border = 'solid 2px';
		document.body.appendChild(canvas);

		ctx = canvas.getContext('2d');
		snakee = new Snake([[6,4],[5,4],[4,4]],"right");
		refresh()
	}

	function refresh(){

		ctx.clearRect(0,0, canvasWidth, canvasHeight)
		snakee.advance();
		snakee.draw();
		setTimeout(refresh,delay);
	}

	function drawBlock(ctx, position){
		var x = position[0] + blockSize;
		var y = position[1] + blockSize;
		ctx.fillRect(x, y , blockSize, blockSize );
	}

	function Snake(body, direction){
		this.body = body;
		this.direction = direction;
		this.draw = function(){
			ctx.save();
			ctx.fillStyle = '#ff0000';
			for(var i = 0; i < this.body.length; i++){
				drawBlock(ctx, this.body[i]);
			}
			ctx.restore();
		};

		this.advance = function(){

			var nextPosition = this.body[0].slice();
			 // nextPosition[0] += 1;
			switch(this.direction){
				case "left":
					nextPosition[0] -= 1;
					break;
				case "right":
					nextPosition[0] += 1;
					break;
				case "down":
					nextPosition[1] += 1;
					break;
				case "up":
					nextPosition[1] -= 1;
					break;
				default:
					throw("invalid directioooon");
		}
		
			this.body.unshift(nextPosition);
			this.body.pop();
		};	

		this.setDirection = function(newDirection) {
			var allowedDirections;
			switch(this.direction){
					case "left":
					case "right":
						allowedDirections = ["up","down"];
					break;

				case "down":
				case "up":
						allowedDirections = ["left","right"];
				break;
				default:
					throw('Invalid directiono');
			}

			if(allowedDirections.indexOf(newDirection) > -1){
				this.direction = newDirection;
			}
		};
	}

	document.onkeydown = function handlekeydown(e){

		var key = e.keyCode;
		var newDirection;

		switch(key){
			case 37:
				newDirection = "left";
				break;
			case 38:
				newDirection = "up";
				break;
			case 39:
				newDirection = "right";
				break;
			case 40:
				newDirection = "down";
				break;
				default:
					return;
		}
		snakee.setDirection(newDirection);

	}
	


}