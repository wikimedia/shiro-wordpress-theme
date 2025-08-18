<?php
/**
 * Title: Testimonials Carousel
 * Slug: testimonials-carousel
 * Categories: wikimedia
 * Description: Add a testimonials carousel section.
 * Viewport Width: 1440
 * Inserter: true
 * Keywords: testimonial, carousel, slider
 * Block Types:
 * Post Types:
 * Template Types:
 */

?>
<!-- wp:shiro/carousel {"perPage":2,"align":"wide"} -->
<div class="wp-block-shiro-carousel alignwide shiro-carousel" data-splide="{&quot;label&quot;:&quot;&quot;,&quot;perPage&quot;:2,&quot;arrows&quot;:true,&quot;pagination&quot;:true,&quot;type&quot;:&quot;slide&quot;,&quot;autoplay&quot;:false,&quot;interval&quot;:5000,&quot;arrowPath&quot;:&quot;M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0Zm0 8.87-1.962 1.975 7.764 7.764H8.87v2.782h16.932l-7.764 7.778L20 31.13 31.13 20 20 8.87Z&quot;}">
	<div class="shiro-carousel__track">
		<div class="shiro-carousel__list">
			<!-- wp:group {"metadata":{"name":"Carousel Slide"},"layout":{"type":"default"}} -->
			<div class="wp-block-group">
				<!-- wp:group {"layout":{"type":"constrained","contentSize":"580px"}} -->
				<div class="wp-block-group">
					<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"var:preset|spacing|24"},"padding":{"right":"var:preset|spacing|24","left":"var:preset|spacing|24"}},"border":{"radius":"4px"}},"backgroundColor":"lightest-green"} -->
					<div class="wp-block-columns has-lightest-green-background-color has-background" style="border-radius:4px;padding-right:var(--wp--preset--spacing--24);padding-left:var(--wp--preset--spacing--24)">
						<!-- wp:column {"width":"40%"} -->
						<div class="wp-block-column" style="flex-basis:40%">
							<!-- wp:image {"id":79782,"sizeSlug":"full","linkDestination":"none"} -->
							<figure class="wp-block-image size-full"><img src="<?php echo esc_url( get_template_directory_uri() ); ?>/patterns/media/testimonial-1.jpg" alt="" class="wp-image-79782"/></figure>
							<!-- /wp:image -->
						</div>
						<!-- /wp:column -->
						<!-- wp:column {"width":"60%","style":{"spacing":{"blockGap":"var:preset|spacing|16"}}} -->
						<div class="wp-block-column" style="flex-basis:60%">
							<!-- wp:paragraph {"style":{"typography":{"fontStyle":"normal","fontWeight":"600"}},"fontSize":"x-large","fontFamily":"display"} -->
							<p class="has-display-font-family has-x-large-font-size" style="font-style:normal;font-weight:600">“Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.“</p>
							<!-- /wp:paragraph -->
							<!-- wp:paragraph -->
							<p><strong>Major Donor</strong></p>
							<!-- /wp:paragraph -->
							<!-- wp:paragraph {"style":{"typography":{"fontStyle":"normal","fontWeight":"700"}},"fontSize":"medium"} -->
							<p class="has-medium-font-size" style="font-style:normal;font-weight:700"><mark style="background-color:#F1FAF7" class="has-inline-color has-orange-color">●</mark><strong> <em>USA</em></strong></p>
							<!-- /wp:paragraph -->
							<!-- wp:buttons -->
							<div class="wp-block-buttons">
								<!-- wp:button {"className":"is-style-as-arrow-link"} -->
								<div class="wp-block-button is-style-as-arrow-link"><a class="wp-block-button__link wp-element-button" href="#">Nam vitae eros dictum</a></div>
								<!-- /wp:button -->
							</div>
							<!-- /wp:buttons -->
						</div>
						<!-- /wp:column -->
					</div>
					<!-- /wp:columns -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->
			<!-- wp:group {"metadata":{"name":"Carousel Slide"},"layout":{"type":"default"}} -->
			<div class="wp-block-group">
				<!-- wp:group {"layout":{"type":"constrained","contentSize":"580px"}} -->
				<div class="wp-block-group">
					<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"var:preset|spacing|24"},"padding":{"right":"var:preset|spacing|24","left":"var:preset|spacing|24"}},"border":{"radius":"4px"}},"backgroundColor":"lightest-purple"} -->
					<div class="wp-block-columns has-lightest-purple-background-color has-background" style="border-radius:4px;padding-right:var(--wp--preset--spacing--24);padding-left:var(--wp--preset--spacing--24)">
						<!-- wp:column {"width":"40%"} -->
						<div class="wp-block-column" style="flex-basis:40%">
							<!-- wp:image {"id":79783,"sizeSlug":"full","linkDestination":"none"} -->
							<figure class="wp-block-image size-full"><img src="<?php echo esc_url( get_template_directory_uri() ); ?>/patterns/media/testimonial-2.jpg" alt="" class="wp-image-79783"/></figure>
							<!-- /wp:image -->
						</div>
						<!-- /wp:column -->
						<!-- wp:column {"width":"60%","style":{"spacing":{"blockGap":"var:preset|spacing|16"}}} -->
						<div class="wp-block-column" style="flex-basis:60%">
							<!-- wp:paragraph {"style":{"typography":{"fontStyle":"normal","fontWeight":"600"}},"fontSize":"x-large","fontFamily":"display"} -->
							<p class="has-display-font-family has-x-large-font-size" style="font-style:normal;font-weight:600">“Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.“</p>
							<!-- /wp:paragraph -->
							<!-- wp:paragraph -->
							<p><strong>Donor</strong></p>
							<!-- /wp:paragraph -->
							<!-- wp:paragraph {"style":{"typography":{"fontStyle":"normal","fontWeight":"700"}},"fontSize":"medium"} -->
							<p class="has-medium-font-size" style="font-style:normal;font-weight:700"><mark style="background-color:#F9F7FF" class="has-inline-color has-orange-color">●</mark><strong> </strong><em>Colombia</em></p>
							<!-- /wp:paragraph -->
							<!-- wp:buttons -->
							<div class="wp-block-buttons">
								<!-- wp:button {"className":"is-style-as-arrow-link"} -->
								<div class="wp-block-button is-style-as-arrow-link"><a class="wp-block-button__link wp-element-button" href="#">Nam vitae eros dictum</a></div>
								<!-- /wp:button -->
							</div>
							<!-- /wp:buttons -->
						</div>
						<!-- /wp:column -->
					</div>
					<!-- /wp:columns -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->
		</div>
	</div>
</div>
<!-- /wp:shiro/carousel -->
