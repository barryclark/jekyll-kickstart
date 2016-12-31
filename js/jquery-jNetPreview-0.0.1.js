/**
 * jQuery "Network Preview" Plugin
 * 
 * @name jquery-jNetPreview-0.0.1.js
 * @author Shinobu HUYUGIRI - http://xinolinx.net/
 * @version 0.0.1
 * @date Dec 31, 2016
 * @category jQuery Plugin Widget
 * @copyright (c) 2016 Shinobu HUYUGIRI (xinolinx.net)
 * @license GNU - GENERAL PUBLIC LICENSE - https://github.com/jquery/jquery/blob/master/GPL-LICENSE.txt
 * @info (none)
**/
$(document).ready(function(){

	var imgdir = "https://xinolinx.github.io/images/icon/";
	var pointer_offset = 20;

	function draw_pc_link (list_pclink, list_infos){
		if (list_pclink.length == 0) {
			/* Canvas is NOT exist (bye) */
			return;
		}
		if (list_pclink.length != list_infos.length) {
			/* Canvas is NOT exist (bye) */
			return;
		}
		for (var i = 0; i < list_pclink.length; i++) {
			var target = list_pclink.get(i);
			var info = list_infos.get(i);
			draw_pc_link_for_each(target, info);
		}
		function draw_pc_link_for_each(canvas, info)
		{
			var string = info.firstChild.data;
			var nodes = string.replace("\r", "").split("\n");
			var prevdepth = 0;
			var top = 0;
			var left = 0;

			var size_w = 60;
			var size_h = 60;

			var maxleft = 0;

			/* floating canvas */
			$(info).hide();
			$(canvas).css("position", "relative");
			var canvas_pos = $(canvas).position();

			var comment_tag = "<div>comment</div>";
			$(canvas).append(comment_tag);
			var comment = canvas.lastChild;
			$(comment).hide();

			for(var node of nodes) {
				if (node == "") {
					continue;
				}

				var attrs = node.split(",");
				var depth = 0;
				var depthinfo = attrs[0].match(/ /gm);
				if (depthinfo) {
					depth = depthinfo.length;
				}
				var type = attrs[0].trim();
				var name = attrs[1];
				var info = attrs[2];
				var option = attrs[3];

				if (depth > prevdepth) {
					/* enter children */
					left = depth * size_w;
					top = top + size_h;
				} else if(depth < prevdepth) {
					/* leave children */
					left = depth * size_w;
					top = top + size_h;
				}
				
				var setimg = "<img"
					+ " src=\"" + getimgurl(type) + "\""
					+ " alt=\"" + name + "\""  
					+ " name=\"" + name + "("+ info + ")" + "\""  
					+ " />";

				$(canvas).append(setimg);
				var settag = canvas.lastChild;
				var setcss = {
					position: "absolute",
					top: top + "px",
					left: left + "px"
				};
				$(settag).css(setcss);
				
				if (option) {
					setimg = "<img"
						+ " src=\"" + getimgurl_option(option) + "\""
						+ " alt=\"" + name + "\""  
						+ " name=\"" + name + "("+ info + ")" + "\""  
						+ " />";
					$(canvas).append(setimg);
					settag = canvas.lastChild;
					$(settag).css(setcss);
				}
				
				$(settag).mouseover(
				function (e) {
					var setcss = {
						color: "#AAC",
						position: "fixed",
						top: (pointer_offset + e.clientY) + "px",
						left: e.clientX + "px",
						border: "1px solid #EEE"
					};
					$(comment).css(setcss);
					$(comment).css("z-index", "99");
					$(comment).css("font-weight", "bold");
					$(comment).css("font-size", "10pt");
					$(comment).css("background-color", 
						"rgba(255,255,255,0.8)");
					$(comment).empty();
					$(comment).append(e.target.name);
					$(comment).show();
				});
				
				$(settag).mouseout(
				function (e) {
					$(comment).hide();
				});
				
				$(settag).mousemove(
				function (e) {
					var setcss = {
						top: (pointer_offset + e.clientY) + "px",
						left: e.clientX + "px",
					};
					$(comment).css(setcss);
				});	

				left += size_w;
				if (left > maxleft) {
					maxleft = left;
				}
				prevdepth = depth;
			}
			
			var tail = top + size_h;
			$(canvas).css("height", tail + "px");

			function getimgurl_option(type){
				var url = "./icon_default.png";
				switch (type) {
				case "wire":
					url = "./attr_wired.png";
					break;
				case "storage":
					url = "./attr_storage.png";
					break;
				case "printer":
					url = "./attr_printer.png";
					break;
				case "func":
					url = "./attr_function.png";
					break;
				}
				return imgdir + url;
			}

			function getimgurl(type){
				var url = "./icon_default.png";
				switch (type) {
				case "ni":
					url = "./icon_internet.png";
					break;
				case "nw":
					url = "./icon_wifi.png";
					break;
				case "ns":
					url = "./icon_switch.png";
					break;
				case "pn":
					url = "./icon_notepc.png";
					break;
				case "pd":
					url = "./icon_desktop.png";
					break;
				case "ps":
					url = "./icon_default.png";
					break;
				case "pt":
					url = "./icon_tablet.png";
					break;
				case "pa":
					url = "./icon_android.png";
					break;
				case "tv":
					url = "./icon_tv.png";
					break;
				case "gm":
					url = "./icon_game.png";
					break;
				case "op":
					url = "./icon_printer.png";
					break;
				case "os":
					url = "./icon_storage.png";
					break;
				}
				return imgdir + url;
			}

		}
	}

	/* start */
	var info = $("div#pclink-info");
	var target = $("div#pclink");
	draw_pc_link(target, info);
});
