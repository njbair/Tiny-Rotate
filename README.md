# Tiny-Rotate

A small script for rotating through a collection of things (e.g. trendy greyed-out brand logos). Think way-smaller [OWL Carousel](https://github.com/OwlFonk/OwlCarousel) without the jQuery dependency. Should work in all modern browsers. 

## HTML structure

```html
<div class="rotate-container">
	<div class="fade-left"><!--Empty--></div>
	<div class="fade-right"><!--Empty--></div>
	<ul class="rotate">
		<li><img src="img/tree.png"></li>
		<li><img src="img/bird.png"></li>
		<li><img src="img/car.png"></li>
	</ul>
</div>
```

## CSS

This plugin uses CSS3 transitions for animating the left property. Recommended styling is:

```css
.rotate-container{
	max-width: 100%;
	overflow:hidden;
	position:relative;
	left:-99999px;
    margin-top:20px;
    margin-bottom:20px;
}

.rotate-container .fade-left, .rotate-container .fade-right{
	width:50px;
	height:100%;
	position:absolute;
	z-index:1;
	cursor:pointer;
}

.rotate-container .fade-left{
	background: linear-gradient(to left, rgba(0,0,0,0), #fff);
	left:0;
}

.rotate-container .fade-right{
	background: linear-gradient(to right, rgba(0,0,0,0), #fff);
	right:0;
}

.rotate{
	display:block;
	list-style: none;
	position:relative;
	left:0;
	padding:0px;

	transition: left .3s ease;
	-webkit-transition: left .3s ease;
	-moz-transition: left .3s ease;
	-o-transition: ;
}
.rotate li{
	display:inline;
	padding:0px 20px;
	float:left;
}
	.rotate li:first-child{
		padding-left:0px;
	}
.rotate li img{
	max-height:70px;
}
```

## Getting started

* `git clone` into project or download as .zip and copy files into project.
* Link script and stylesheet in the head.

```html
<link type="text/css" rel="stylesheet" href="rotate.css" />
<script type="text/javascript" src="rotate.js"></script>
```

* Call init method when the DOM is ready.

```javascript
rotate.init();
```
