<?php
/**
 * Title: Donate - financial information
 * Slug: shiro/donate-financial-information
 * Description: "Where your donation goes" financial information section
 * Categories: wikimedia
 * Keywords:
 * Viewport Width: 1500
 * Block Types:
 * Post Types:
 * Inserter: true
 */

?>

<!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"right":"0","left":"0","top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}}},"backgroundColor":"base","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide has-base-background-color has-background" style="padding-top:var(--wp--preset--spacing--80);padding-right:0;padding-bottom:var(--wp--preset--spacing--80);padding-left:0"><!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"width":"33.33%"} -->
<div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:heading -->
<h2 class="wp-block-heading">Where your donation goes</h2>
<!-- /wp:heading --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"66.66%"} -->
<div class="wp-block-column" style="flex-basis:66.66%"><!-- wp:paragraph -->
<p>Accountability and transparency are foundational to the Wikimedia Foundation’s core values. We are dedicated to managing funds and resources in a way that ensures every contribution supports our mission of advancing knowledge for all. We have earned the Platinum Seal of Transparency from Candid (formerly GuideStar), and Charity Navigator has awarded us its highest rating of four stars. You can <a href="/annualreports/2023-2024-annual-report/">read our most recent annual report</a> for more information about&nbsp;our financial health.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:vegalite-plugin/visualization {"chartId":"_f33u6vdddwv","json":{"$schema":"https://vega.github.io/schema/vega-lite/v5.json","description":"Pie chart with percentage tooltip","width":400,"height":400,"background":"#fff","transform":[{"calculate":"( datum.percent / 100 ) * 178400000","as":"spend"},{"calculate":"join( [ '$', round( datum.spend / 100000 ) / 10, 'M' ], '' )","as":"spendLabel"}],"data":{"values":[{"percent":45,"category":"Investment in Technology","prettySpend":"$80,300,000 USD","label":"Technology","color":"#71d1b3"},{"percent":32,"category":"Support for Volunteers","prettySpend":"$57,100,000 USD","label":"Support","color":"#049dff"},{"percent":11,"category":"Fundraising","prettySpend":"$19,600,000 USD","label":"Fundraising","className":"vis-color-orange","color":"#f9dde9"},{"percent":12,"category":"General and Administrative","prettySpend":"$21,400,000 USD","label":["General","Expenses"],"color":"#e679a6"}]},"layer":[{"mark":{"type":"arc","radius":{"expr":"select.category == datum.category ? 200 : 175"},"innerRadius":100},"params":[{"name":"select","select":{"type":"point","on":"pointerover","fields":["category","spend","label","spendLabel"]}}],"encoding":{"color":{"field":"color","type":"nominal","scale":null,"legend":null},"tooltip":[{"field":"prettySpend","title":"Amount","type":"nominal"},{"field":"category","title":"Category"}]}},{"mark":{"type":"text","fontWeight":700,"fontSize":20,"font":"sans-serif","color":"#000","radius":{"expr":"select.category == datum.category ? 146.6 : 133.3"}},"encoding":{"text":{"value":{"expr":"select.category == datum.category ? join( [ datum.percent, '%' ], '' ) : ''"},"type":"quantitative"}}},{"mark":{"type":"text","color":"#000","dy":-12,"fontWeight":700,"fontSize":24,"font":"sans-serif","text":{"expr":"select.category == datum.category ? datum.spendLabel : '' "}}},{"mark":{"type":"text","color":"#000","fontSize":16,"fontWeight":400,"dy":12,"font":"sans-serif","text":{"expr":"select.label ? select.label : ''"}}},{"mark":{"type":"text","color":"#000","dy":-12,"fontWeight":700,"fontSize":24,"font":"sans-serif","text":{"expr":"select.category ? '' : '$178.4M'"}}},{"mark":{"type":"text","color":"#000","fontSize":16,"fontWeight":400,"dy":12,"font":"sans-serif","text":{"expr":"select.category ? '' : 'Total Funding'"}}}],"encoding":{"order":{"field":"spend","sort":"descending"},"theta":{"field":"spend","type":"quantitative","stack":true}}},"className":"vis-centered"} /--></div>
<!-- /wp:column -->

<!-- wp:column {"width":"53%"} -->
<div class="wp-block-column" style="flex-basis:53%"><!-- wp:wmf-reports/accordion {"className":"accordion-wrapper wp-block-wmf-reports-accordion\u002d\u002dalt"} -->
<div class="wmf-accordion-wrapper wp-block-wmf-reports-accordion accordion-wrapper wp-block-wmf-reports-accordion--alt undefined"><!-- wp:wmf-reports/accordion-item {"borderColor":"wmf-report-bright-green","className":"vis-color-purple"} -->
<div class="wp-block-wmf-reports-accordion-item wmf-accordion-item vis-color-purple" style="border-left-color:var(--wp--preset--color--wmf-report-bright-green)"><button class="wmf-accordion-item__title"><h3 class="wmf-accordion-item__title-text">Investment in Technology <mark>45%</mark></h3></button><div class="wmf-accordion-item__content"><!-- wp:paragraph -->
<p>Nearly half of our budget goes toward supporting the technology that powers Wikipedia and other Wikimedia projects. We are constantly working to enhance the user experience for both contributors and readers, improve site security, and ensure reliable access to our websites globally. This infrastructure and product support sustain one of the top ten most visited websites in the world, all at a fraction of the cost of popular for-profit websites.</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:wmf-reports/accordion-item --></div>
<!-- /wp:wmf-reports/accordion -->

<!-- wp:wmf-reports/accordion {"className":"accordion-wrapper wp-block-wmf-reports-accordion\u002d\u002dalt"} -->
<div class="wmf-accordion-wrapper wp-block-wmf-reports-accordion accordion-wrapper wp-block-wmf-reports-accordion--alt undefined"><!-- wp:wmf-reports/accordion-item {"borderColor":"wmf-report-brightblue","className":"vis-color-red"} -->
<div class="wp-block-wmf-reports-accordion-item wmf-accordion-item vis-color-red" style="border-left-color:var(--wp--preset--color--wmf-report-brightblue)"><button class="wmf-accordion-item__title"><h3 class="wmf-accordion-item__title-text">Support for Volunteers <mark>34%</mark></h3></button><div class="wmf-accordion-item__content"><!-- wp:paragraph -->
<p>The global reach of Wikimedia projects is made possible by the hard work of volunteers from across the globe. We provide grants, legal support, and other resources to help build vibrant volunteer communities. Additionally, we promote community engagement through outreach initiatives and advocate for the growth and protection of free knowledge.</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:wmf-reports/accordion-item --></div>
<!-- /wp:wmf-reports/accordion -->

<!-- wp:wmf-reports/accordion {"className":"accordion-wrapper wp-block-wmf-reports-accordion\u002d\u002dalt"} -->
<div class="wmf-accordion-wrapper wp-block-wmf-reports-accordion accordion-wrapper wp-block-wmf-reports-accordion--alt undefined"><!-- wp:wmf-reports/accordion-item {"borderColor":"pink","className":"vis-color-orange"} -->
<div class="wp-block-wmf-reports-accordion-item wmf-accordion-item vis-color-orange" style="border-left-color:var(--wp--preset--color--pink)"><button class="wmf-accordion-item__title"><h3 class="wmf-accordion-item__title-text">General and Administrative Expenses <mark>12%</mark></h3></button><div class="wmf-accordion-item__content"><!-- wp:paragraph -->
<p>Operational costs are essential for the smooth management and governance of the Wikimedia Foundation. These expenses help us recruit top talent and support staff around the world, empowering them to carry out the mission of the Wikimedia Foundation.</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:wmf-reports/accordion-item --></div>
<!-- /wp:wmf-reports/accordion -->

<!-- wp:wmf-reports/accordion {"className":"accordion-wrapper wp-block-wmf-reports-accordion\u002d\u002dalt"} -->
<div class="wmf-accordion-wrapper wp-block-wmf-reports-accordion accordion-wrapper wp-block-wmf-reports-accordion--alt undefined"><!-- wp:wmf-reports/accordion-item {"borderColor":"red90","className":"vis-color-amber"} -->
<div class="wp-block-wmf-reports-accordion-item wmf-accordion-item vis-color-amber" style="border-left-color:var(--wp--preset--color--red90, var(--wp--preset--color--red-90))"><button class="wmf-accordion-item__title"><h3 class="wmf-accordion-item__title-text">Allocation to Fundraising Efforts <mark>11%</mark></h3></button><div class="wmf-accordion-item__content"><!-- wp:paragraph -->
<p>Donor support is crucial to sustaining Wikipedia and our other free knowledge endeavors. Our team is committed to efficient and effective fundraising throughout the year, ensuring that every contribution helps advance our mission.</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:wmf-reports/accordion-item --></div>
<!-- /wp:wmf-reports/accordion --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:buttons {"align":"wide"} -->
<div class="wp-block-buttons alignwide"><!-- wp:button {"className":"is-style-as-arrow-link"} -->
<div class="wp-block-button is-style-as-arrow-link"><a class="wp-block-button__link wp-element-button" href="#">Find out more about where your money goes</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group -->

<!-- wp:separator {"align":"wide","style":{"spacing":{"margin":{"top":"0","bottom":"0"}}}} -->
<hr class="wp-block-separator alignwide has-alpha-channel-opacity" style="margin-top:0;margin-bottom:0"/>
<!-- /wp:separator -->
