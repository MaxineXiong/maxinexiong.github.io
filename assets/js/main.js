/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

	// Stops animations/transitions until the page has ...

		// ... loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});

		// ... stopped resizing.
			var resizeTimeout;

			$window.on('resize', function() {

				// Mark as resizing.
					$body.addClass('is-resizing');

				// Unmark after delay.
					clearTimeout(resizeTimeout);

					resizeTimeout = setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

			});

	// Fixes.

		// Object fit images.
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Hide original image.
						$img.css('opacity', '0');

					// Set background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});

	// Sidebar.
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');

		// Inactive by default on <= large.
			breakpoints.on('<=large', function() {
				$sidebar.addClass('inactive');
			});

			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});

		// Hack: Workaround for Chrome/Android scrollbar position bug.
			if (browser.os == 'android'
			&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);

		// Toggle.
			$('<a href="#sidebar" class="toggle">Toggle</a>')
				.appendTo($sidebar)
				.on('click', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Toggle.
						$sidebar.toggleClass('inactive');

				});

		// Events.

			// Link clicks.
				$sidebar.on('click', 'a', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Vars.
						var $a = $(this),
							href = $a.attr('href'),
							target = $a.attr('target');

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Check URL.
						if (!href || href == '#' || href == '')
							return;

					// Hide sidebar.
						$sidebar.addClass('inactive');

					// Redirect to href.
						setTimeout(function() {

							if (target == '_blank')
								window.open(href);
							else
								window.location.href = href;

						}, 500);

				});

			// Prevent certain events inside the panel from bubbling.
				$sidebar.on('click touchend touchstart touchmove', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Prevent propagation.
						event.stopPropagation();

				});

			// Hide panel on body click/tap.
				$body.on('click touchend', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Deactivate.
						$sidebar.addClass('inactive');

				});

		// Scroll lock.
		// Note: If you do anything to change the height of the sidebar's content, be sure to
		// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

			$window.on('load.sidebar-lock', function() {

				var sh, wh, st;

				// Reset scroll position to 0 if it's 1.
					if ($window.scrollTop() == 1)
						$window.scrollTop(0);

				$window
					.on('scroll.sidebar-lock', function() {

						var x, y;

						// <=large? Bail.
							if (breakpoints.active('<=large')) {

								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');

								return;

							}

						// Calculate positions.
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);

						// Lock/unlock.
							if ($sidebar_inner.data('locked') == 1) {

								if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
								else
									$sidebar_inner
										.css('top', -1 * x);

							}
							else {

								if (y > 0)
									$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);

							}

					})
					.on('resize.sidebar-lock', function() {

						// Calculate heights.
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;

						// Trigger scroll.
							$window.trigger('scroll.sidebar-lock');

					})
					.trigger('resize.sidebar-lock');

				});

	// Menu.
		var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');

		// Openers.
			$menu_openers.each(function() {

				var $this = $(this);

				$this.on('click', function(event) {

					// Prevent default.
						event.preventDefault();

					// Toggle.
						$menu_openers.not($this).removeClass('active');
						$this.toggleClass('active');

					// Trigger resize (sidebar lock).
						$window.triggerHandler('resize.sidebar-lock');

				});

			});

})(jQuery);



// Search bar

const searchInput = document.getElementById("query");
const searchResultsContainer = document.getElementById("searchResults");

const projects = [
	{ name: "My Personal Portfolio Website", url: "./projects/html-css.html#personal-web", labels: ['html5', 'css3', 'javascript', 'js', "Maxine's Tech Gallery", 'projects portfolio', 'project portfolio', 'personal website'] },
	{ name: "OpenAI API Applications", url: "./projects/ai-projects.html#openai-webapps", labels: ['python', 'web applications', 'GPT models', 'chatgpt', 'streamlit cloud', 'TTS model', 'whisper model',
                                                                                                   'o1-mini', 'o1 mini', 'o1 preview', 'o1-preview', 'gpt-4o', 'gpt-4o-mini', 'gpt-4o mini', 'gpt-4-turbo', 'gpt-4 turbo', 'gpt-4o models', 'o1 models',
																								   'speech-to-text', 'text-to-speech', 'speech to text', 'text to speech', 'voice communication', 'text communication', 'audio output', 'chat completions API', 'Assistants API',
																								   'voice input', 'text input', 'AI coding assistance', 'AI coding assistant', 'codemaxgpt', 'talk to gpt', 'chatbot', 'coderbot',
																								   'Code Generation', 'Code Debugging', 'Code Refactoring', 'Code Documentation', 'generate code', 'debug code', 'refactor code', 'document code'] },
	{ name: "ChatGPT Tkinter Desktop App", url: "./projects/ai-projects.html#gpt-desktop", labels: ['ai', 'tkinter GUI', 'pyttsx3', 'python', 'desktop application', 'customtkinter', 'OpenAI API', 'omni',
                                                                                                    'o1-mini', 'o1 mini', 'o1 preview', 'o1-preview', 'gpt-4o', 'gpt-4o-mini', 'gpt-4o mini', 'gpt-4-turbo', 'gpt-4 turbo', 'gpt-4o models', 'o1 models',
                                                                                                    'text-to-speech', 'text to speech', 'voice output', 'text communication', 'chat completions API', 'text input', 'talk to gpt', 'chatbot'] },
	{ name: "ImageAI Computer Vision Flask Apps", url: "./projects/ai-projects.html#imageai-flask", labels: ['pandas', 'pd', 'computer vision', 'cv', 'html5', 'css3', 'python', 'application', 'data analysis', 'data analytics', 'analyze', 'analyse'] },
	{ name: "Invoice Generator", url: "./projects/vba.html#invoicing", labels: ['vba', 'excel', 'invoicing', 'UserForms', 'user forms', 'ActiveX controls', 'business analysis', 'business analytics', 'BA'] },
	{ name: "Sales Regional Reporting Tool", url: "./projects/vba.html#reporting", labels: ['vba', 'excel', 'listobjects', 'pivottables', 'pivot tables', 'business analysis', 'business analytics', 'BA'] },
	{ name: "Automate Table of Contents", url: "./projects/vba.html#TOC", labels: ['vba', 'excel', 'toc', 'business analysis', 'business analytics', 'BA'] },
	{ name: "SQLZOO Solutions", url: "./projects/sql.html#sqlzoo", labels: ['sql problems', 'exercises', 'challenges', 'mysql', 'database'] },
	{ name: "Google Maps Style Route Planner with A* Search Algorithm", url: "./projects/algorithm.html#a-star-algo", labels: ['route planning', 'path finding', 'python', 'matplotlib', 'data visualization', 'data visualisation', 'data viz'] },
	{ name: "TSA Claims Data Analysis", url: "./projects/sas.html#sas-tsa", labels: ['SAS 9.4', 'SAS Base Programming', 'SAS Studio', 'data analysis', 'analyze', 'analyse', 'data preparation', 'case study', 'business analysis', 'business analytics', 'BA'] },
	{ name: "World Tourism Data Preparation", url: "./projects/sas.html#sas-tourism", labels: ['SAS 9.4', 'SAS Base Programming', 'SAS Studio', 'data analysis', 'analyze', 'analyse', 'data preparation', 'case study', 'business analysis', 'business analytics', 'BA'] },
	{ name: "Weight Loss Analysis", url: "./projects/sas.html#sas-ws", labels: ['SAS 9.4', 'SAS Base Programming', 'SAS Studio', 'data analysis', 'analyze', 'analyse', 'data preparation', 'case study', 'business analysis', 'business analytics', 'BA'] },
	{ name: "Go to my Tableau Public", url: "https://public.tableau.com/app/profile/maxine1212", labels: ['Tableau', 'data visualization', 'data visualisation', 'data viz'] },
	{ name: "Go to my Alteryx Community", url: "https://community.alteryx.com/t5/forums/recentpostspage/post-type/message/user-id/103689/page/1", labels: ['Alteryx', 'data preparation', 'data transformation', 'data cleansing', 'data analysis', 'data analytics', 'analyze', 'analyse', 'business analysis', 'business analytics', 'BA'] },
	{ name: "Degrees of Separation with Breadth-first Search in PySpark", url: "./projects/spark.html#spark-marvel", labels: ['apache spark', 'pyspark rdd', 'bfs algorithm', 'marvel characters', 'degree of separations', 'python'] },
	{ name: "Item-based Collaborative Filtering in PySpark", url: "./projects/spark.html#spark-movie", labels: ['apache spark', 'pyspark rdd', 'pyspark dataframes', 'movie recommenders', 'movie recommendations', 'python'] },
	{ name: "AI Plays Flappy Bird", url: "./projects/ai-projects.html#neat-flappy-bird", labels: ['neat-python', 'NEAT algorithm', 'NeuroEvolution of Augmenting Topologies (NEAT)',
																																																'genetic algorithm (GA)', 'evolve', 'evolutionary', 'evolution and evaluation', 'generations',
																																																'evolving artificial neural networks', 'genome', 'feedforward neural networks', 'feed forward neural networks',
																																																'feed-forward neural networks', 'fitness', 'pygame', 'gameplay', 'green pipes', 'yellow birds', 'python'] },
	{ name: "LeetCode SQL Solutions", url: "./projects/sql.html#leetcode-sql", labels: ['sql problems', 'exercises', 'challenges', 'mysql', 'database', 'leetcode'] },
	{ name: "Data Migration into CRM Apps", url: "./projects/rpa.html#rpa-data-entry", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes', 'UiPath Classic Design', 'UiPath Modern Design', 'UiPath REFramework', 'UiPath Robotic Enterprise Framework', 'Web Application', 'Desktop Application',
																																															'parallel', 'data entry', 'data migration', 'dispatcher and performer bots with uipath orchestrator queues', 'UiPath Automation Cloud', 'transaction items', 'queue items', 'dispatcher-performer bot'] },
	{ name: "Input Forms Challenge (Classic)", url: "./projects/rpa.html#rpa-input-forms-classic", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes', 'RPA Challenge', 'UiPath Classic Design', 'Input Forms', 'Data Entry', 'Populate Forms', 'Fill-in Forms', 'Fill in Forms', 'Dynamic Fields'] },
	{ name: "Input Forms Challenge (Modern)", url: "./projects/rpa.html#rpa-input-forms-modern", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes', 'RPA Challenge', 'UiPath Modern Design', 'Input Forms', 'Data Entry', 'Populate Forms', 'Fill-in Forms', 'Fill in Forms', 'Dynamic Fields'] },
	{ name: "Web Scraping for Real Estate Data", url: "./projects/rpa.html#rpa-web-scrap", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes', 'UiPath Classic Design', 'UiPath Modern Design',
																																																	'Property', 'Properties', 'Location', 'Data Scraping', 'DataTable', 'Data Table', 'zillow.com', 'Excel Output', 'Table Extraction'] },
	{ name: "Scraping PDF Invoices", url: "./projects/rpa.html#rpa-pdf-scrap", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes', 'UiPath Classic Design', 'UiPath Modern Design',
																																											'Screen Scraping', 'Native Text', 'PDF Scraping', 'Scraping PDF', 'scrap PDF', 'Excel Output', 'PDF Invoices',
																																											'invoice scraping', 'scrap invoices', 'scraping invoices', 'invoice issued to customers', 'invoices issued to customers',
																																										  'invoice raised to customers', 'invoices raised to customers', 'invoices to customers', 'invoice to customers',
																																										  'billing customers', 'bill customers', 'categorize invoices', 'invoice categorization', 'categorise invoices', 'invoice categorisation'] },
	{ name: "Scraping Scanned Documents using OCR", url: "./projects/rpa.html#rpa-ocr-scrap", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes', 'UiPath Classic Design', 'UiPath Modern Design',
																																																		 'optical character recognition', 'screen scraping with ocr', 'scanned docs', 'scanned documents', 'scanned PDF receipts', 'scanned receipts', 'scanned images', 'scanned pdf', 'scrap images',
																																																		 'scraping images', 'OCR-based screen scraping', 'OCR-based scraping', 'screen scraping ocr', 'OCR scraping', 'Read PDF with OCR'] },
  { name: "Outlook Email Automation", url: "./projects/rpa.html#rpa-email-outlook", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes',
																																														 'Desktop Outlook Application', 'Outlook Emails', 'Email Sender', 'Email Management', 'Email Operations', 'Email Notifications',
																																														 'Mailing Activities', 'Send Emails', 'Sending Emails', 'Saving Emails', 'Save Emails', 'Email Automation Reports', 'Email mgmt'] },
	{ name: "Gmail Automation", url: "./projects/rpa.html#rpa-email-google", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes',
																																								    'Gmail', 'Google Emails', 'Email Sender', 'Email Management', 'Email Operations', 'Email Notifications',
																																								    'Mailing Activities', 'Read Emails', 'Reading Emails', 'Send Emails', 'Sending Emails', 'Saving Emails', 'Save Emails', 'Delete Emails', 'Deleting Emails',
																																										'Forward Emails', 'Forwarding Emails', 'Save Email Attachments', 'Saving Attachments', 'Save Attachments', 'Saving Email Attachments', 'Move Emails', 'Moving Emails',
																																										'Email Automation Reports', 'Email mgmt'] },
	{ name: "Coronavirus Stat-Alert Bot", url: "./projects/rpa.html#rpa-covid-alert", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes', 'UiPath Modern Design', 'RPA Challenge',
																																								    				 'Desktop Outlook Application', 'Outlook Emails', 'Email Sender', 'data scraping', 'table extraction', 'data table', 'datatable',
																																													   'COVID-19 stats', 'COVID-19 data', 'coronavirus alert', 'COVID-19 alert'] },
	{ name: "IP Address to Location Converter Bot", url: "./projects/rpa.html#rpa-ip-converter", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes', 'UiPath Modern Design', 'RPA Challenge',
																																																				'IP converter', 'IP Lookup', 'Data Scraping', 'Excel Output', 'Writing into Excel', 'Write into Excel',
																																																				'Excel population', 'populating excel', 'populate excel', 'excel sheet population'] },
	{ name: "Image Background Remover Bot", url: "./projects/rpa.html#rpa-bg-remover", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes', 'UiPath Modern Design', 'RPA Challenge',
																																															'remove background', 'remove image background', 'image background removal', 'file handling', 'move files'] },
	{ name: "Calendar Picker Bot", url: "./projects/rpa.html#rpa-bg-remover", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes', 'UiPath Modern Design', 'RPA Challenge',
																																										 'pick dates', 'dates picker', 'check-in date', 'check-out date', 'booking.com', 'twerk selectors', 'fine-tune selectors'] },
  { name: "Roulette Bot", url: "./projects/rpa.html#rpa-roulette", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes', 'UiPath Modern Design', 'RPA Challenge',
																																					  'Roulette gameplay', 'Martingale Roulette Strategy', 'Bet Even', 'Online Roulette Game', 'European Roulette Game', 'get OCR text', 'OCR Scraping', 'Optical Character Recognition', 'OCR-based screen scraping', 'OCR-based scraping', 'screen scraping ocr'] },
	{ name: "Invoice Extraction with OCR", url: "./projects/rpa.html#rpa-invoice-ocr", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes', 'UiPath Modern Design', 'RPA Challenge',
																																															'optical character recognition', 'screen scraping with ocr', 'extract invoice', 'extracting invoice with ocr', 'invoice photos', 'invoice images', 'scrap images', 'extract images',
																																															'extract invoice data with OCR', 'scrap invoice data with OCR', 'scraping images', 'OCR-based screen scraping', 'OCR-based scraping', 'screen scraping ocr'] },
	{ name: "REFramework Exercise: ACME Dispatcher-Performer Invoice Check Bot", url: "./projects/rpa.html#acme-invoice-check", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes', 'UiPath Modern Design', 'UiPath REFramework', 'UiPath Robotic Enterprise Framework',
																																																																			 'invoice data checking', 'invoice checking', 'invoice checker', 'invoice verification', 'screen scraping', 'dispatcher and performer bots with uipath orchestrator queues', 'UiPath Automation Cloud', 'transaction items', 'queue items', 'dispatcher-performer bot'] },
  { name: "REFramework Exercise: ACME Vendor Check Bot", url: "./projects/rpa.html#acme-vendor-check", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes', 'UiPath Modern Design', 'UiPath REFramework', 'UiPath Robotic Enterprise Framework',
																																																								'vendor data checking', 'vendor checking', 'vendor checker', 'vendor verification', 'data scraping', 'table extraction', 'web scraping', 'datatables', 'Excel operations', 'datarow transaction items', 'datarow items'] },
	{ name: "REFramework Exercise: ACME Work Items", url: "./projects/rpa.html#acme-work-items", labels: ['UiPath RPA', 'Robotic Process Automation', 'UiPath Robot', 'UiPath Studio', 'RPA Workflow', 'Automation Processes', 'UiPath Modern Design', 'UiPath REFramework', 'UiPath Robotic Enterprise Framework',
																																																				'data scraping', 'web scraping', 'table extraction', 'Excel Operations', 'datatables', 'URL string transaction items', 'string items'] },
	{ name: "Book Search Engine", url: "./projects/python.html#book-search-engine", labels: ['Python', 'Tkinter GUI', 'CustomTkinter', 'GUI', 'Graphic User Interface', 'SQLite3', 'SQLite Database', 'SQL Database Operations', 'SQL Queries', 'SQL commands',
																																													 'Pandas Dataframe', 'GUI Desktop Application', 'GUI Application', 'SQL Database Management', 'books', 'book collections'] },
	{ name: "Geocoding Web Service", url: "./projects/python.html#geocoding-web", labels: ['Python', 'Flask Web Application', 'Folium Maps', 'Folium Mapping', 'Pandas Dataframe', 'HTML5', 'CSS3', 'Flask Geocoding Web Service', 'Geocoder', 'File Uploading',
																																												 'File Downloading', 'File Processing', 'SuperGeocoder', 'latitude', 'longitude', 'coordinates', 'preview output table', 'integrated mapping'] },
  { name: "Music Events Web Scraper", url: "./projects/python.html#music-events-web-scraper", labels: ['Python', 'BeautifulSoup4', 'Web Scraping', 'CSV Export', 'CSV Output', 'Email Sending with attachments', 'Email Sender', 'smtplib',
																								       'Pandas Dataframe', 'Psycopg2', 'PostgreSQL Database Operations', 'PostgreSQL Database Management', 'SQL commands', 'SQL queries',
																								 	   'Data Migration', 'requests', 'Eventbrite Music Events', 'marketing email with CSV output'] },
   { name: "WebCam Monitoring App with Email Alerts", url: "./projects/python.html#webcam-monitoring", labels: ['Python', 'OpenCV', 'cv2', 'computer vision', 'Email Sending with attachments', 'Email Sender', 'Python Threading',
																											     'WebCam Motion Detection', 'WebCam Motion Detector', 'Moving Object Detection', 'Security Camera', 'CCTV', 'WebCam Streaming',
																												 	 'Doorbell Camera', 'Security Alerts', 'Security Updates', 'Security Alert Emails', 'Security Update Emails'] },
{ name: "Data Modelling with Apache Cassandra", url: "./projects/data-engineering.html#cassandra", labels: ['Python', 'NoSQL Database', 'CQL commands', 'ETL Pipeline', 'NoSQL Query', 'NoSQL Queries', 'Data Engineering'] },
{ name: "Cloud Data Warehousing with AWS Redshift", url: "./projects/data-engineering.html#cloud-wh-redshift", labels: ['Python', 'PostgreSQL Database', 'ETL Pipeline', 'Data Engineering', 'Cloud Data Warehouse', 'Infrastructure-as-Code',
                                                                                                                        'IaC', 'Load', 'Loading', 'aws boto3', 'AWS S3', 'staging area', 'Amazon Redshift Cluster', 'Amazon S3',
                                                                                                                        'Dimensional Modelling', 'Fact Tables', 'Dimension Tables', 'Dim Tables', 'Star schema', 'star-schema',
                                                                                                                        'data model', 'data modelling', 'SQL queries', 'SQL query', 'SQL querying'] },
{ name: "Centauri Alpha's Retail Data Consulting Project", url: "./projects/data-analytics.html#centauri-alpha", labels: ['Python', 'SQL queries', 'SQL query', 'SQL querying', 'dbt', 'data build tool', 'elt',
                                                                                                                          'extract load transform', 'Fivetran', 'GCP BigQuery', 'within data warehouse', 'data warehousing',
                                                                                                                          'data transformation', 'pandas DataFrame', 'Power BI', 'statistical analysis', 'retail analytics',
                                                                                                                          'retail analysis', 'customer retention', 'customer churn', 'business strategy', 'boost sales',
                                                                                                                          'increase sales', 'data analysis', 'data analytics', 'data engineering', 'analytics engineering',
                                                                                                                          'data visualisation', 'data visualization', 'data visuals', 'dbt models', 'dbt modelling', 'refactor SQL code',
                                                                                                                          'SQL model refactoring', 'SQL models', "Spearman's Rank Correlation", 'Hypothesis Testing', 'Hypothesis Tests',
                                                                                                                          "Bayes' Theorem", 'Customer Retention Probability', 'Customer Retention Probabilities', 'Confidence Interval for Binomial Proportion',
                                                                                                                          'Confidence Intervals', 'CI', 'Binomial Confidence Intervals', 'total online sales'] },
{ name: "2025 Week 2 | Ice Thickness Infographic", url: "./projects/power-bi.html#wow-2025-02", labels: ['Data Viz', 'Data Visualisation', 'Data Visualization', 'Business Intelligence (BI)', 'Power BI Challenges', 'Workout Wednesday 2025', 'WOW2025', 'powerbi'] },
{ name: "2024 Week 51 | Highlight Data with a Slicer", url: "./projects/power-bi.html#wow-2024-51", labels: ['Data Viz', 'Data Visualisation', 'Data Visualization', 'Business Intelligence (BI)', 'Power BI Challenges', 'Workout Wednesday 2024', 'WOW2024', 'powerbi'] },
{ name: "2024 Week 49 | Plot Ranges with Percentiles", url: "./projects/power-bi.html#wow-2024-49", labels: ['Data Viz', 'Data Visualisation', 'Data Visualization', 'Business Intelligence (BI)', 'Power BI Challenges', 'Workout Wednesday 2024', 'WOW2024', 'powerbi'] },
{ name: "2024 Week 48 | Use a Calendar as a Filter", url: "./projects/power-bi.html#wow-2024-48", labels: ['Data Viz', 'Data Visualisation', 'Data Visualization', 'Business Intelligence (BI)', 'Power BI Challenges', 'Workout Wednesday 2024', 'WOW2024', 'powerbi'] },
{ name: "2024 Week 42 | Scatter Plot Dynamic Density", url: "./projects/power-bi.html#wow-2024-48", labels: ['Data Viz', 'Data Visualisation', 'Data Visualization', 'Business Intelligence (BI)', 'Power BI Challenges', 'Workout Wednesday 2024', 'WOW2024', 'powerbi'] },
{ name: "2024 Week 37 | Report with Light and Dark Mode", url: "./projects/power-bi.html#wow-2024-37", labels: ['Data Viz', 'Data Visualisation', 'Data Visualization', 'Business Intelligence (BI)', 'Power BI Challenges', 'Workout Wednesday 2024', 'WOW2024', 'powerbi'] },
{ name: "2024 Week 36 | Recreate NYT Interactive Article", url: "./projects/power-bi.html#wow-2024-36", labels: ['Data Viz', 'Data Visualisation', 'Data Visualization', 'Business Intelligence (BI)', 'Power BI Challenges', 'Workout Wednesday 2024', 'WOW2024', 'powerbi'] },
{ name: "2024 Week 32 | Track Olympic 2024 Medal Count", url: "./projects/power-bi.html#wow-2024-32", labels: ['Data Viz', 'Data Visualisation', 'Data Visualization', 'Business Intelligence (BI)', 'Power BI Challenges', 'Workout Wednesday 2024', 'WOW2024', 'powerbi'] },
{ name: "2024 Week 28 | Create Custom Navigation", url: "./projects/power-bi.html#wow-2024-28", labels: ['Data Viz', 'Data Visualisation', 'Data Visualization', 'Business Intelligence (BI)', 'Power BI Challenges', 'Workout Wednesday 2024', 'WOW2024', 'powerbi'] },
{ name: "2024 Week 27 | Scatter Plot with Trailing Path", url: "./projects/power-bi.html#wow-2024-27", labels: ['Data Viz', 'Data Visualisation', 'Data Visualization', 'Business Intelligence (BI)', 'Power BI Challenges', 'Workout Wednesday 2024', 'WOW2024', 'powerbi'] },
{ name: "2024 Week 24 | Recreate Power BI Core Visuals Team's Dashboard", url: "./projects/power-bi.html#wow-2024-24", labels: ['Data Viz', 'Data Visualisation', 'Data Visualization', 'Business Intelligence (BI)', 'Power BI Challenges', 'Workout Wednesday 2024', 'WOW2024', 'powerbi'] },
{ name: "Maxine Xiong's Resume", url: "./maxinexiong-resume.pdf", labels: ['resume', 'professional resume', 'Résumé']}
	// Add more projects here
];

searchInput.addEventListener("input", function() {
	const query = searchInput.value.trim();
	const filteredResults = projects.filter(project =>
		project.name.toLowerCase().includes(query.toLowerCase()) ||
		project.labels.some(label => label.toLowerCase().includes(query.toLowerCase()))
	);

	if (filteredResults.length > 0 && query !== "") {
		const searchResultsHTML = filteredResults
			.map(project => `<div class="dropdown-list-item" data-url="${project.url}">${project.name}</div>`)
			.join("");
		searchResultsContainer.innerHTML = searchResultsHTML;
		searchResultsContainer.style.display = "block";
	} else {
		searchResultsContainer.innerHTML = "";
		searchResultsContainer.style.display = "none";
	}
});

searchResultsContainer.addEventListener("click", function(event) {
	if (event.target.classList.contains("dropdown-list-item")) {
		const url = event.target.dataset.url;
		window.location.href = url;
	}
});

document.addEventListener("click", function(event) {
	if (!searchInput.contains(event.target)) {
		searchResultsContainer.style.display = "none";
	}
});







// Smooth scrolling effect with listed items on side navigation pane

  const sideNavLinks = document.querySelectorAll("#menu ul a");

  sideNavLinks.forEach(link => {
    link.addEventListener("click", function(event) {
			const targetSectionId = link.getAttribute("href");

      // Check if the link is an external link (starts with "http://" or "https://")
      if (!targetSectionId.startsWith("#")) {
        // If it's an external link, the default behavior is allowed, and the browser will navigate to the external page.
        return;
      }

      event.preventDefault();
      const targetSection = document.querySelector(targetSectionId);

      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });







// Back to top text
	const backToTopText = document.getElementById("backToTopText");

	// Show/hide the text based on scroll position
	window.addEventListener("scroll", function() {
	  if (window.scrollY > 300) {
	    backToTopText.style.display = "inline-block";
	  } else {
	    backToTopText.style.display = "none";
	  }
	});

	// Scroll to the top when the text is clicked
	backToTopText.addEventListener("click", function() {
	  window.scrollTo({
	    top: 0,
	    behavior: "smooth"
	  });
	});
