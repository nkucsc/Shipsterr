// Javascript program to run the server using node.js packages
// calls the fedex.js program to return the price
require('dotenv').config();
const express = require('express');
const fedex = require('./fedex.js');
const ups = require('./ups.js');
const usps = require('./usps.js');
const app = express();
const port = process.env.port || 8080;

// returns a html page with the prices returned from the APIs
const makeResponse = (fedexPrice, upsPrice, uspsPrice) => 
`<!--Calculator Fuction-->
<!doctype html>
<!--[if IE 9]> <html class="no-js ie9 fixed-layout" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js " lang="en"> <!--<![endif]-->
<head>

    <!-- Basic -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- Mobile Meta -->
    <meta name="viewport" content="width=device-width, minimum-scale=1.5, maximum-scale=1.0, user-scalable=no">
    
    <!-- Site Meta -->
    <title>SEOTime HTML5 Business Template</title>
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="author" content="">
    
    <!-- Site Icons -->
    <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
    <link rel="apple-touch-icon" href="images/apple-touch-icon.png">

	<!-- Google Fonts -->
 	<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,600,700" rel="stylesheet"> 

	<!-- Custom & Default Styles -->
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/animate.css">
	<link rel="stylesheet" href="style.css">

	<!--[if lt IE 9]>
		<script src="js/vendor/html5shiv.min.js"></script>
		<script src="js/vendor/respond.min.js"></script>
	<![endif]-->

</head>
<body>
	
	<div id="wrapper"> <!-- end topbar -->

		<header class="header site-header colorfulheader">
			<div class="container">
				<nav class="navbar navbar-default yamm">
				    <div class="container-fluid">
				        <div class="navbar-header">
				            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				                <span class="sr-only">Toggle navigation</span>
				                <span class="icon-bar"></span>
				                <span class="icon-bar"></span>
				                <span class="icon-bar"></span>
				            </button>
							<a class="navbar-brand" href="index.html"><img src="images/Shipsterr-Logo.png"></a>
				        </div>
				        <div id="navbar" class="navbar-collapse collapse">
				            <ul class="nav navbar-nav navbar-right">
				                <li><a href="index.html">Home</a></li>
				                <li><a href="page-about.html">About Us</a></li>
			                  <li><a href="Calculator.html">Shipping Calculator</a></li>
				                <li class=""></li>
				                <li><a href="page-contact.html">Contact</a></li>
                                <li class="lastlink hidden-xs hidden-sm"></li>
                            </ul>
				        </div><!--/.nav-collapse -->
				    </div><!--/.container-fluid -->
				</nav><!-- end nav -->
			</div><!-- end container -->
		</header><!-- end header -->

<section class="section normalhead">
			<div class="container">
				<div class="row">	
					<div class="col-md-10 col-md-offset-1 col-sm-12 text-center">
					  <h2 data_temp_dwid="1">Shipping Calculator </h2>
					  <p class="lead">Welcome to the our shipping calculator building service.</p>
					</div><!-- end col -->
				</div><!-- end row -->
			</div><!-- end container -->
		</section>
<!-- end section -->
<div class="cal-content showResultStyle">
<section class="section lead">
		
		
			<div class="container">
			  <div class="row service-list">
			    <script type="text/javascript" src="../server.js"></script> <!-- end col -->
<div class="table-users btn-primary header">
<div id="shipping_data_loader" class="hidden">
			<center><img src="./StorePep Shipping Calculator - Get real time quotes from UPS, FedEx, DHL, USPS_files/wpspin_light-2x.gif" id=""></center>
		  </div>
</div>
<!-- end col -->
					<!-- end col -->

				<div class="col-md-4 col-sm-12 col-xs-12 first">
				  <div class="service-wrapper">
<div class="service-details">
  <h4>Fedex</h4>
  ${fedexPrice}<br>
</div>
						</div><!-- end service-wrapper -->
					</div><!-- end col -->

			    <div class="col-md-4 col-sm-12 col-xs-12">
				  <div class="service-wrapper">
<div class="service-details">
  <h4>UPS </h4>
  ${upsPrice}<br>
</div>
						</div><!-- end service-wrapper -->
					</div><!-- end col -->

					<div class="col-md-4 col-sm-12 col-xs-12 last">
						<div class="service-wrapper">
<div class="service-details">
  <h4>USPS</h4>
  ${uspsPrice}</div>
					  </div><!-- end service-wrapper -->
			    </div><!-- end col -->

			    <!-- end col -->

				  <!-- end col -->

			    <!-- end col -->
				</div><!-- end row -->

			  <div class="section-button clearfix text-center"> <a href="Calculator.html" class="btn btn-transparent">Go Back</a></div><!-- end section-button -->
	</div><!-- end container -->
	
	<hr class="invis">
<!-- end row -->
			</div><!-- end container -->
		</section><!-- end section -->  
  
<section class="section ldp">
  
	  <div class="container">
				<div class="row text-center">
					<div class="col-md-2 col-sm-2 col-xs-6">
						<div class="client-box">
							<a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=201910530"><img src="upload/client_01.png" alt="" class="img-responsive"></a>
						</div>
					</div><!-- end col -->
					<div class="col-md-2 col-sm-2 col-xs-6">
						<div class="client-box">
							<a href="https://www.fedex.com/en-us/shipping.html?cmp=KNC-1001816-10-10-950-1110000-US-US-EN-BDZ0001Z01ZBRND&gclid=CjwKCAjwgqbpBRAREiwAF046JTd93nyHftzHv-JJxSbdmMJ92bqZIDzXIR1AL1G5tI-q2YM_YgaXXhoC97IQAvD_BwE&gclsrc=aw.ds"><img src="upload/client_02.png" alt="" class="img-responsive"></a>
						</div>
					</div><!-- end col -->
					<div class="col-md-2 col-sm-2 col-xs-6">
						<div class="client-box">
							<a href="https://easypackagetracker.org/82/?keyword=UPS"><img src="upload/client_03.png" alt="" class="img-responsive"></a>
						</div>
					</div><!-- end col -->	
					<div class="col-md-2 col-sm-2 col-xs-6">
						<div class="client-box">
							<a href="https://www.usps.com/?gclid=CjwKCAjwgqbpBRAREiwAF046JVIKNiuh5eoAI3kYMnWZnGyX9nkSpLbO9nP9MplYMl48wRczRWYVkxoCkJEQAvD_BwE&gclsrc=aw.ds"><img src="upload/client_04.png" alt="" class="img-responsive"></a>
						</div>
					</div><!-- end col -->
					<div class="col-md-2 col-sm-2 col-xs-6">
						<div class="client-box">
							<a href="https://www.ebay.com/"><img src="upload/client_05.png" alt="" class="img-responsive"></a>
						</div>
					</div>
					<div class="col-md-2 col-sm-2 col-xs-6">
						<div class="client-box">
							<a href="https://www.shopify.com/"><img src="upload/client_06.png" alt="" class="img-responsive"></a>
						</div>
					</div>
				</div>
	</div>
  </section>

  <footer class="footer primary-footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-sm-4">
                    	<div class="widget clearfix">
                    		<h4 class="widget-title">Subscribe</h4>
                    		<div class="newsletter-widget">
                    		  <p>You can sign out of our newsletters at any time and receive specials for amazing disccounts.</p>
                    		  <form class="form-inline" role="search">
		                            <div class="form-1">
	                              	  <input type="text" class="form-control" placeholder="Enter email here..">
										<button type="submit" class="btn btn-primary"><i class="fa fa-envelope-o"></i></button>
	                            </div>
							  </form>
                   		  </div>
                    	</div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                   	  <div class="widget clearfix">
                   		<h4 class="widget-title">Company</h4>
                   		  <ul>
                   			  <li><a href="#">About us</a></li>
                   			  <li><a href="#">Tracking</a></li>
                   			  
                   			  <li><a href="#">Contact</a></li>
                   		  </ul>
                    	</div>
                   	  &nbsp;</div>

                  <div class="col-md-2 col-sm-2">
                    	<div class="widget clearfix">
                   		  <h4 class="widget-title">Services</h4>
                    		<ul>
                    		  <li><a href="#">Support</a></li>
                    		  <li><a href="#">Rate Calculator</a></li>
                    		  
                    			
                    		</ul>
                    	</div>
                    </div>

                    <div class="col-md-2 col-sm-2">
                    	<div class="widget clearfix">
                   		  <h4 class="widget-title">Be Social</h4>
                    		<ul>
                    			<li><a href="#">Facebook</a></li>
                    			<li><a href="#">Twitter</a></li>
                    			<li><a href="#">Google+</a></li>
                    			
                   		  </ul>
                    	</div>
                  </div>
                </div>
           	</div>
  </footer>

	
</div>
	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/parallax.js"></script>
	<script src="js/animate.js"></script>
	<script src="js/owl.carousel.js"></script>
	<script src="js/custom.js"></script>

</body>
</html>`;

// function to call the fetch function of all 3 APIs
async function calcHandler(req, res) {
    const fedexPrice = await fedex.fedexRateAsync(req.body);
    const upsPrice = await ups.upsRateAsync(req.body);
    const uspsPrice = await usps.uspsRateAsync(req.body);
    const html = makeResponse(fedexPrice, upsPrice, uspsPrice);
    res.send(html);
}

app.use(express.static('website'));
app.use(express.urlencoded({ extended: true }));
app.post('/calc', calcHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

