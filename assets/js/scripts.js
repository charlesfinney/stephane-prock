var window_width = null;
// BEGIN: img-circle-box center images - function declaration
  function center_images_in_circle_boxes(_$area, force_in_area, custom_img_width, custom_img_height){
    var _$circle_boxes_list = null;
    if(typeof force_in_area !== "undefined" && force_in_area == true){
      if(typeof _$area !== "undefined") _$circle_boxes_list = _$area.find(".circle-outer-box");
    }else{
      _$circle_boxes_list = (typeof _$area !== "undefined") ? _$area.find(".circle-outer-box:not(.centering_disabled)") : $(".circle-outer-box:not(.centering_disabled)");
    }
    _$circle_boxes_list.each(function(){
      var _$this = $(this),
          this_width = _$this.width(),
          this_height = _$this.height(),
          this_wh_subtraction = this_width/this_height,
          _$this_img = _$this.find("img");
      if(this_wh_subtraction == 1){
        var this_img_width = (typeof custom_img_width == "undefined") ? _$this_img.width() : custom_img_width,
            this_img_height = (typeof custom_img_height == "undefined") ? _$this_img.height() : custom_img_height,
            this_img_wh_subtraction = this_img_width/this_img_height,
            //this_img_hw_subtraction = this_img_height/this_img_width,
            this_img_new_width,
            this_img_new_height = this_height;
        if(!_$this_img.attr("data-yp-ow")){
          _$this_img
          .attr("data-yp-ow", this_img_width)
          .attr("data-yp-oh", this_img_height);
        }
        if(this_img_wh_subtraction > 1){
          this_img_new_width = this_width;
          this_img_new_height = this_img_new_width / this_img_wh_subtraction;
          var margin_top_based_on_new_height = this_height/2 - this_img_new_height/2;
          if(_$this_img.attr("data-yp-scaled") != "1"){
            _$this_img.css({
              "width" : this_img_new_width + "px",
              "height" : this_img_new_height + "px",
              "margin-top" : margin_top_based_on_new_height + "px"
            });
          }
          _$this_img
          .attr("data-yp-w", this_img_new_width)
          .attr("data-yp-h", this_img_new_height)
          .attr("data-yp-mt", margin_top_based_on_new_height)
          .attr("data-yp-ml", 0);
        }else if(this_img_wh_subtraction < 1){
          var width_based_on_new_height = this_height * this_img_wh_subtraction,
              margin_left_based_on_new_width = this_width/2 - width_based_on_new_height/2;
          if(_$this_img.attr("data-yp-scaled") != "1"){
            _$this_img.css({
              "height" : this_height + "px",
              "width" : width_based_on_new_height + "px",
              "margin-left" : margin_left_based_on_new_width + "px"
            });
          }
          _$this_img
          .attr("data-yp-w", width_based_on_new_height)
          .attr("data-yp-h", this_height)
          .attr("data-yp-mt", 0)
          .attr("data-yp-ml", margin_left_based_on_new_width);
        }else{
          if(_$this_img.attr("data-yp-scaled") != "1"){
            _$this_img.css({
              "width" : this_width + "px",
              "height" : this_height + "px"
            });
          }
          _$this_img
          .attr("data-yp-w", this_width)
          .attr("data-yp-h", this_height)
          .attr("data-yp-mt", 0)
          .attr("data-yp-ml", 0);
        }
      }
    });
  }
// END: img-circle-box center images - function declaration

// BEGIN: scale image in circle box - function declaration
  function scale_img_in_circle_box(_$obj, custom_scale){
    // shopify_circle_img_scale
    if(browser_supports_img_scaling){
      var scale_ammount = (typeof custom_scale == "undefined") ? shopify_circle_img_scale : custom_scale;
      if(_$obj.attr("data-yp-scaled") != "1"){
        var new_width = _$obj.attr("data-yp-w") * scale_ammount,
            new_height = _$obj.attr("data-yp-h") * scale_ammount,
            margin_top = new_height / 2 - _$obj.parent().parent().height() / 2,
            margin_left = new_width / 2 - _$obj.parent().parent().width() / 2;
        _$obj.css({
          "width" : _$obj.attr("data-yp-w") * scale_ammount + "px",
          "height" : _$obj.attr("data-yp-h") * scale_ammount + "px",
          "margin-top" : -margin_top + "px",
          "margin-left" : -margin_left + "px"
        });
        _$obj.attr("data-yp-scaled", "1");
      }
    }
  }
// END: scale image in circle box - function declaration

// BEGIN: scale back to normal image in circle box - function declaration
  function scale_back_img_in_circle_box(_$obj){
    if(browser_supports_img_scaling){
      _$obj.css({
        "width" : _$obj.attr("data-yp-w") + "px",
        "height" : _$obj.attr("data-yp-h") + "px",
        "margin-top" : _$obj.attr("data-yp-mt") + "px",
        "margin-left" : _$obj.attr("data-yp-ml") + "px"
      });
      _$obj.attr("data-yp-scaled", "0");
    }
  }
// END: scale back to normal image in circle box - function declaration


jQuery(document).ready(function($){
  
  $.hook(['addClass','removeClass','toggleClass']);
  if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1){
    client_browser = "safari";
  }
  // BEGIN: temporary code
  // END: temporary code
  
  // BEGIN: ie fixes
  if (!Modernizr.input.placeholder) {
    $('input, textarea').placeholder();
  }
  
  //if (window.PIE) {
  //  $('.circle-outer-box').each(function() {
  //    PIE.attach(this);
  //  });
  //}
  // END: ie fixes
  
  $("a.zoom").fancybox({
    padding:0,
    'titleShow': false,
    overlayColor: '#000000',
    overlayOpacity: 0.2
  });
  
  $("nav.mobile select").change(function(){ window.location = jQuery(this).val(); });
  $('#product > .thumbs a').click(function(){
    
    $('#placeholder').attr('href', $(this).attr('href'));
     $('#placeholder img').attr('src', $(this).attr('data-original-image'))
     
     $('#zoom-image').attr('href', $(this).attr('href'));
      return false;
     });
     
     $('input[type="submit"], input.btn, button').click(function(){ // remove ugly outline on input button click
       $(this).blur();
     })
     var dropWidth = $("li.dropdown").width() + 95;
     $("li.dropdown").hover(function(){
       
       $(this).children('.dropdown').width(dropWidth); 
       $(this).children('.dropdown').show();
       $(this).children('.dropdown').stop();
       $(this).children('.dropdown').animate({
         opacity: 1.0
       }, 200);
     }, function(){
       $(this).children('.dropdown').stop();
       $(this).children('.dropdown').animate({
         opacity: 0.0
       }, 400, function(){
         $(this).hide();
       });
     });
     
     $('a[href^="#"]').bind('click.smoothscroll',function (e) {
       
       e.preventDefault();
       
       var target = this.hash,
           $target = $(target);
       if(!$(this).parent().hasClass("view")){
         var offset = $target.offset();
         if(typeof offset !== 'undefined'){
           $('html, body').stop().animate({
             'scrollTop': offset.top
           }, 500, 'swing', function () {
             window.location.hash = target;
           });
         }
       }
     });
     
     var tabs = $('ul.tabs > li > a');
     tabs.each(function(i) {
       jQuery(this).unbind('click.smoothscroll')
       .click(function(e) {
         var contentLocation = $(this).attr('href');
         if(contentLocation.charAt(0)=="#") {            
           tabs.removeClass('active');
           $(this).addClass('active');
           $(contentLocation).show().addClass('active').siblings().hide().removeClass('active');
         }
         return false;
       });
     });
     
     function addItem(form_id) {
       $.ajax({
         type: 'POST',
         url: '/cart/add.js',
         dataType: 'json',
         data: $('#'+form_id).serialize(),
         success: Shopify.onSuccess,
         error: Shopify.onError
       });
     }
     
     $(".addtocart").click(function(e){
       
       var elem = $(this)
       $(elem).prop("disabled", true)
       
       e.preventDefault();
       addItem('add-item-form');
       
     });
     
     Shopify.onSuccess = function() {
       
       var elem = $('.addtocart');
       
       elem.removeAttr("disabled");
       
       var quantity = parseInt(jQuery('[name="quantity"]').val(), 10) || 1;
       
       $("html, body").animate({ scrollTop: 0 }, 250, 'swing');
       
       function animate() {
         
         $("#cart-animation").show();
         
         var addtocartWidth = elem.outerWidth() / 2
         var addtocartHeight = elem.outerHeight() / 2
         
         var addtocartLeft = elem.offset().left + addtocartWidth;
         var addtocartTop = $(elem).offset().top + addtocartHeight ;
         
         var buttonAreaWidth = $("#cart-target").outerWidth();
         var buttonAreaHeight = $("#cart-target").outerHeight();
         
         var buttonAreaLeft = ($("#cart-target").offset().left + buttonAreaWidth / 2  - $("#cart-animation").outerWidth() / 2) - 4 - 18;
         var buttonAreaTop = ($("#cart-target").offset().top + buttonAreaWidth / 2  - $("#cart-animation").outerHeight() / 2) - 4 - 8;
         
         var path = {
           start: {
             x: addtocartLeft,
             y: addtocartTop,
             angle: 190.012,
             length: 0.2
           },
           end: {
             x: buttonAreaLeft,
             y: buttonAreaTop,
             angle: 90.012,
             length: 0.50
           }
         };
         
         $('#cart-animation').text(quantity).animate(
           {
             path : new $.path.bezier(path)
           },
           1200,
           function() {
             $("#cart-animation").fadeOut(500, function() {
               $(elem).prop("disabled", false)
               var cartCount =  parseInt($('#cart-count').text()) + quantity;
               $('#cart-count').text(cartCount)
               $('#cart-target').addClass('has-items');
             })
           }
         );
       }
       
       animate();
     };
     
     Shopify.onError = function(XMLHttpRequest, textStatus) {
       // Shopify returns a description of the error in XMLHttpRequest.responseText.
       // It is JSON.
       // Example: {"description":"The product 'Amelia - Small' is already sold out.","status":500,"message":"Cart Error"}
       var data = eval('(' + XMLHttpRequest.responseText + ')');
       if (!!data.message) {
         alert(data.message + '(' + data.status  + '): ' + data.description);
       } else {
         alert('Error : ' + Shopify.fullMessagesFromErrors(data).join('; ') + '.');
       }
       
       $('.addtocart').removeAttr("disabled");
     };
     
     Shopify.fullMessagesFromErrors = function(errors) {
       var fullMessages = [];
       jQuery.each(errors, function(attribute, messages) {
         jQuery.each(messages, function(index, message) {
           fullMessages.push(attribute + ' ' + message);
         });
       });
       return fullMessages;
     };
     
     
     window_width = $(window).width();
     
     // BEGIN: single product page scroll to slider preview on thumb click
     //if(shopify_template == "product"){
     //  var _$main_image_wrap = $(".main-image").first();
     //  $(".thumbs .img-circle-box").click(function(e){
     //    e.preventDefault();
     //    _$main_image_wrap.find("img").attr("src", $(this).attr("href"));
     //  });
     //  $(".slider-nav .img-circle-box").click(function(){
     //    $('html, body').animate({
     //      scrollTop: _$main_image_wrap.offset().top - 200
     //    }, 500);
     //  });
     //}
     // END: single product page scroll to slider preview on thumb click
     
     $( ".cart-icon" ).click(function() {
       $( '.pop' ).toggleClass( "show" );
     });
     /*$( ".menu" ).click(function() {
       $( '#nav-mobile ul' ).toggleClass( "show" );
     });*/
     
     $(".focus-select").selectbox();
     $(".account select").selectbox({
       onChange: function (val, inst) {
         var selector_name = "address_country_",
             _$selector = $("#" + inst.id);
         if(inst.id.indexOf(selector_name) !== -1){
           var selector_generated_id = inst.id.split(selector_name);
           selector_generated_id = selector_generated_id[1];
           var selector_option_index = inst.input.context.selectedIndex,
               _$selector_option = _$selector.children().eq(selector_option_index),
               selector_option_provinces_raw = _$selector_option.attr("data-provinces"),
               selector_option_provinces = JSON.parse(selector_option_provinces_raw),
               _$provinces_container = $("#address_province_container_" + selector_generated_id),
               _$provinces_selector = _$provinces_container.children("select"),
               _$provinces_sb_plugin_ul = _$provinces_container.find(".sbOptions");
           if(selector_option_provinces.length > 0){
             _$provinces_selector.children().remove(); // repeated action
             _$provinces_sb_plugin_ul.children().remove(); // repeated action
             for(i=0;i<selector_option_provinces.length;i++){
               var option_val = selector_option_provinces[i];
               _$provinces_selector.append('<option value="' + option_val + '">' + option_val + '</option>');
               _$provinces_sb_plugin_ul.append('<li><a href="#' + option_val + '" rel="' + option_val + '">' + option_val + '</a></li>');
             }
             _$provinces_selector.children().removeAttr('selected').filter('[value="' + selector_option_provinces[0] + '"]').attr('selected', true);
             _$provinces_selector.parent().find(".sbSelector").text(selector_option_provinces[0]);
             _$provinces_sb_plugin_ul.find("a").click(function (e) {
               e.preventDefault();
               var this_value = $(this).text();
               _$provinces_selector.children().removeAttr('selected').filter('[value="' + this_value + '"]').attr('selected', true);
               _$provinces_selector.parent().find(".sbSelector").text(this_value);
               _$provinces_selector.parent().find(".sbToggle").removeClass("sbToggleOpen").click();
               _$provinces_sb_plugin_ul.slideUp(200);
             });
             _$provinces_container.css("display", "inline-block");
           }else{
             _$provinces_container.css("display", "none");
             _$provinces_selector.children().remove(); // repeated action
             _$provinces_sb_plugin_ul.children().remove(); // repeated action
           }
         }
         _$selector.trigger('change');
       }
     });
     
     if(typeof selector_variants !== 'undefined'){
       var single_option_selector_previous_val = null,
           selector_fields_count = selector_variants.fields_count - 1;// except the first one (in our case Title)
       $(".single-option-selector").selectbox({
         onOpen: function (inst) {
           var selector_index = parseInt(inst.id.slice(-1));
           if(selector_index){
             var primary_product_select_option_val = $("#product-select-option-0").val(),
                 _$this_product_select_option = $("#" + inst.id),
                 this_product_select_option_name = _$this_product_select_option.parent().children("label").text(),
                 available_options_array = selector_variants[primary_product_select_option_val][this_product_select_option_name],
                 available_variants_array = selector_variants[primary_product_select_option_val]['variants'].slice(0),
                 current_pre_fields = [],
                 has_pre_fields = false;
             for(i=0;i < (selector_fields_count - (selector_index - 1));i++){
               if(i == selector_index - 1){
                 break;
               }else{
                 current_pre_fields.splice(i,0,$("#product-select-option-" + (i + 1)).val());
               }
             }
             // reduce the size of available_variants_array under current_pre_fields length + 1
             var current_pre_fields_length = current_pre_fields.length + 1,
                 arrays_length_diff = available_variants_array[0].length - current_pre_fields_length;
             if(current_pre_fields_length > 1){
               has_pre_fields = true;
               for(i=0;i < available_variants_array.length;i++){
                 available_variants_array[i].splice(current_pre_fields_length,arrays_length_diff);
               }
             }
             _$this_product_select_option.parent().find(".sbOptions a").each(function(){
               var _$this = $(this),
                   this_val = _$this.text();
               if(available_options_array.indexOf(this_val) == -1){
                 _$this.parent().addClass("disabled");
               }
               // check if it is valid with pre fields except first one
               if(has_pre_fields){
                 var exists_such_a_variant = false,
                     current_pre_fields_copy = current_pre_fields.slice(0);
                 current_pre_fields_copy.push(this_val);
                 for(i=0;i<available_variants_array.length;i++){
                   if($(available_variants_array[i]).not(current_pre_fields_copy).length == 0 && $(current_pre_fields_copy).not(available_variants_array[i]).length == 0){
                     exists_such_a_variant = true;
                     break;
                   }
                 }
                 if(!exists_such_a_variant){
                   _$this.parent().addClass("disabled");
                 }
               }
             });
             single_option_selector_previous_val = _$this_product_select_option.val();
           }
         },
         onClose: function (inst) {
           $("#" + inst.id).parent().find(".sbOptions li").each(function(){
             $(this).removeClass("disabled");
           });
         },
         onChange: function (val, inst) {
           var selector_index = parseInt(inst.id.slice(-1)),
               sub_items_counter = 0;
           if(selector_index == 0){
             // set primary values for main object
             for(var index in selector_variants[val]){
               if(index == 'variants'){continue;}
               sub_items_counter = sub_items_counter + 1;
               var _$this_product_select_option = $("#product-select-option-" + sub_items_counter),
                   this_product_select_option_value = selector_variants[val][index][0];
               _$this_product_select_option.children().removeAttr('selected').filter('[value="'+ this_product_select_option_value +'"]').attr('selected', true);
               _$this_product_select_option.parent().find(".sbSelector").text(this_product_select_option_value);
             }
           }else{
             var primary_product_select_option_val = $("#product-select-option-0").val(),
                 _$this_product_select_option = $("#" + inst.id),
                 this_product_select_option_name = _$this_product_select_option.parent().children("label").text(),
                 available_options_array = selector_variants[primary_product_select_option_val][this_product_select_option_name];
             if(available_options_array.indexOf(val) == -1){
               _$this_product_select_option.children().removeAttr('selected').filter('[value="'+ single_option_selector_previous_val +'"]').attr('selected', true);
               _$this_product_select_option.parent().find(".sbSelector").text(single_option_selector_previous_val);
             }else{
               var available_variants_array_copy = selector_variants[primary_product_select_option_val]['variants'].slice(0),
                   current_pre_fields = [],
                   has_pre_fields = false;
               for(i=0;i < (selector_fields_count - (selector_index - 1));i++){
                 if(i == selector_index - 1){
                   break;
                 }else{
                   current_pre_fields.splice(i,0,$("#product-select-option-" + (i + 1)).val());
                 }
               }
               // reduce the size of available_variants_array under current_pre_fields length + 1
               var current_pre_fields_length = current_pre_fields.length + 1,
                   arrays_length_diff = available_variants_array_copy[0].length - current_pre_fields_length,
                   exists_such_a_variant = false,
                   dont_change_pre_version = false;
               if(current_pre_fields_length > 1){
                 has_pre_fields = true;
                 for(i=0;i < available_variants_array_copy.length;i++){
                   available_variants_array_copy[i].splice(current_pre_fields_length,arrays_length_diff);
                 }
               }
               // check if it is valid with pre fields except first one
               if(has_pre_fields){
                 var current_pre_fields_copy = current_pre_fields.slice(0);
                 current_pre_fields_copy.push(val);
                 for(i=0;i<available_variants_array_copy.length;i++){
                   if($(available_variants_array_copy[i]).not(current_pre_fields_copy).length == 0 && $(current_pre_fields_copy).not(available_variants_array_copy[i]).length == 0){
                     exists_such_a_variant = true;
                     break;
                   }
                 }
                 if(!exists_such_a_variant){
                   dont_change_pre_version = true;
                   _$this_product_select_option.children().removeAttr('selected').filter('[value="'+ single_option_selector_previous_val +'"]').attr('selected', true);
                   _$this_product_select_option.parent().find(".sbSelector").text(single_option_selector_previous_val);
                 }
               }
               if(!dont_change_pre_version){
                 // check if it is valid in combination with other fields 
                 var available_variants_array = selector_variants[primary_product_select_option_val]['variants'].slice(0),
                     current_variant = [];
                 for(i=0;i<selector_fields_count;i++){
                   if(i == selector_index - 1){
                     current_variant.splice(i,0,val);
                   }else{
                     current_variant.splice(i,0,$("#product-select-option-" + (i + 1)).val());
                   }
                 }
                 // walk through all possible variants to check if our variant is valid else insert a valid one
                 var first_valid_variant_for_this_selected_option = null,
                     current_variant_is_not_valid = true;
                 for(i=0;i<available_variants_array.length;i++){
                   if($(available_variants_array[i]).not(current_variant).length == 0 && $(current_variant).not(available_variants_array[i]).length == 0){
                     current_variant_is_not_valid = false;
                     break;
                   }else{
                     // check for the first valid variant to be inserted later
                     if(!first_valid_variant_for_this_selected_option && available_variants_array[i][selector_index - 1] == val){
                       first_valid_variant_for_this_selected_option = available_variants_array[i];
                     }
                   }
                 }
                 if(current_variant_is_not_valid){
                   for(i=0;i<first_valid_variant_for_this_selected_option.length;i++){
                     if(i == selector_index - 1){
                       continue;
                     }
                     var _$select_option = $("#product-select-option-" + (i + 1)),
                         value_to_insert = first_valid_variant_for_this_selected_option[i];
                     _$select_option.children().removeAttr('selected').filter('[value="'+ value_to_insert +'"]').attr('selected', true);
                     _$select_option.parent().find(".sbSelector").text(value_to_insert);
                   }
                 }
               }
             }
           }
           $("#" + inst.id).trigger('change');
         }
       });
     };
     
     // BEGIN: testimonials carousel slider
     var _$clients_testimonial = $(".clients-testimonial"),
         _$clients_carousel = $("#clients-carousel");
     _$clients_carousel.AnimatedSlider({
       prevButton: ".cc-prev",
       nextButton: ".cc-next",
       visibleItems: 3,
       infiniteScroll: true,
       willChangeCallback: function(obj, item) {
         var active_element_html = _$clients_carousel.children("").eq(item).find(".hidden").html(),
             current_element_height = _$clients_testimonial.height(),
             active_element_height;
         if(current_element_height){
           _$clients_testimonial.css("height", _$clients_testimonial.height() + "px");
         }
         _$clients_testimonial.animate({opacity:0},150,'swing',function(){
           _$clients_testimonial.css("height", "auto");
           _$clients_testimonial.html(active_element_html);
           active_element_height = _$clients_testimonial.height() + "px";
           if(current_element_height){
             _$clients_testimonial.css("height", current_element_height + "px");
           }
           _$clients_testimonial.animate({
             opacity:1,
             height:active_element_height
           },150);
         });
       },
       changedCallback: function(obj, item) {  }
     });
     _$clients_carousel.find("a").click(function(event){
       event.preventDefault();
     });
     // END: testimonials carousel slider
     
     // BEGIN: collection products hover pop-up fix
     var _$product = $(".product"),
         _$product_popup = _$product.find(".hover").first(),
         popup_outer_width = _$product_popup.outerWidth(),
         popup_animation_duration = 250;
     _$product.children("a").on("mouseenter", function(){
       var _$this = $(this),
           _$this_hover = _$this.find(".hover"),
           margin_value = _$this.find(".circle-inner-box").width() / 2,
           margin_value_px = margin_value + "px", 
           free_space_for_popup_right = window_width - (_$this.offset().left + _$this.outerWidth()/2),
           free_space_for_popup_left = _$this.offset().left + _$this.outerWidth()/2;
       if(window_width > 768){
         if(free_space_for_popup_right <= popup_outer_width && free_space_for_popup_right < free_space_for_popup_left){
           var free_space_width_subtraction = free_space_for_popup_left - popup_outer_width;
           if(free_space_width_subtraction < 0){
             margin_value += free_space_width_subtraction;
           }
           _$this_hover.css({
             "left" : "auto",
             "right" : margin_value + "px",
             "top" : margin_value_px
           });
         }else{
           var free_space_width_subtraction = free_space_for_popup_right - popup_outer_width;
           if(free_space_width_subtraction < 0){
             margin_value += free_space_width_subtraction;
           }
           _$this_hover.css({
             "left" : margin_value + "px",
             "right" : "auto",
             "top" : margin_value_px
           });
         }
       }
     });
     _$product.find(".circle-outer-box").hover(
       function(){
         var _$this = $(this),
             _$this_hover = _$this.parent().children(".hover");
         if(window_width > 768){
           _$this.attr("data-hover", "1");
           if(_$this_hover.css("opacity") == 1 && _$this_hover.css("display") == "none"){
             _$this_hover.css("opacity" , 0);
           }
           _$this_hover.css("display" , "block");
           _$this_hover.stop().animate({opacity:1},popup_animation_duration);
         }
       },
       function(){
         var _$this = $(this),
             _$this_hover = _$this.parent().children(".hover");
         if(window_width > 768){
           _$this.attr("data-hover", "");
           setTimeout(function(){
             if(!_$this_hover.attr("data-hover")){
               _$this_hover.stop().animate({opacity:0},popup_animation_duration,function(){
                 _$this_hover.css("display", "none");
               });
             }
           },50);
         }
       }
     );
     _$product.find(".hover").on("mouseenter", function(){
       var _$this = $(this);
       if(window_width > 768){
         //_$this.css("display", "block"); // this line is optional
         _$this.attr("data-hover", "1");
         if(_$this.css("opacity") == 1 && _$this.css("display") == "none"){
           _$this.css("opacity" , 0);
         }
         _$this.css("display" , "block");
         _$this.stop().animate({opacity:1},popup_animation_duration);
       }
     }).on("mouseleave", function(){
       var _$this = $(this);
       if(window_width > 768){
         _$this.attr("data-hover", "");
         if(!_$this.parent().children(".circle-outer-box").attr("data-hover")){
           _$this.stop().animate({opacity:0},popup_animation_duration,function(){
             _$this.css("display", "none");
           });
         }
       }
     });
     // END: collection products hover pop-up fix
     
     // BEGIN: collection products grid layout
     var layout_cookie_value = $.cookie("grid_layout");
     var _$grid = $(".grid"),
         default_layout_cols = 4,
         default_a_href = "#" + default_layout_cols + "col",
         grid_layout_class = "grid-" + default_layout_cols;
     function insert_clearfix(nr_of_columns){
       _$grid.children(".clear").remove();
       _$grid.children(".product:nth-child(" + nr_of_columns + "n)").after('<div class="clear"></div>');
     }
     $(".view a").on("click", function(){
       var _$this = $(this),
           this_layout_cols = _$this.attr('href').charAt(1),
           this_layout_class = "grid-" + this_layout_cols;
       if(this_layout_class != grid_layout_class){
         _$grid.removeClass(grid_layout_class);
         _$grid.addClass(this_layout_class);
         grid_layout_class = this_layout_class;
         $.cookie("grid_layout", "#" + this_layout_cols + "col");
         $(".view a.active").removeClass("active");
         _$this.addClass("active");
         insert_clearfix(this_layout_cols);
         center_images_in_circle_boxes();
       }
     });
     if(layout_cookie_value && layout_cookie_value != default_a_href){
       var cookie_saved_layout_cols = parseInt(layout_cookie_value.charAt(1));
       if(cookie_saved_layout_cols){
         $('a[href="' + layout_cookie_value + '"]').addClass("active");
         _$grid.removeClass(grid_layout_class);
         grid_layout_class = "grid-" + cookie_saved_layout_cols;
         _$grid.addClass(grid_layout_class);
         insert_clearfix(cookie_saved_layout_cols);
       }
     }else{
       $('a[href="' + default_a_href + '"]').addClass("active");
       insert_clearfix(default_layout_cols);
       //$.removeCookie("grid_layout"); 
     }
     // END: collection products grid layout
     
     // BEGIN: page contact scroll to info message on form request
     if(shopify_template == "page.contact"){
       var _$feedback = $(".feedback");
       if(_$feedback.length > 0){
         $('html, body').animate({
           scrollTop: _$feedback.offset().top - 200
         }, 500);
       }
     }
     // END: page contact scroll to info message on form request
     
     // BEGIN: collection page buy button position fix under responsive
     if(shopify_template == "collection"){
       //var _$product_buttons = $("span.btn");
       //_$product_buttons.each(function(){
       //  var _$this = $(this),
       //      this_position = _$this.position();
       //  console.log(_$this.parent().find(".title").text(), this_position.top);
       //});
     }
     // END: collection page buy button position fix under responsive
     
     if(shopify_template == "article"){
       if($(".subtext.success").length){
         $('html, body').animate({
           scrollTop: $("#comment-wrap").offset().top - 200
         }, 500);
       }else if($(".subtext.error").length){
         $('html, body').animate({
           scrollTop: $(".subtext.error").offset().top - 200
         }, 500);
       }
     }
     
     
     $(window).load(function(){
       
       if (shopify_template == "index" && $('.slides li').size() > 1 ) {
         var _$flexslider = $('.flexslider'),
             _$flexslider_thumbs = _$flexslider.parent().find(".product"),
             adaptible = 1;
         _$flexslider_thumbs.each(function(index){
           $(this).attr("data-index", index);
         });
         _$flexslider_thumbs.bind('onafteraddClass onafterremoveClass onaftertoggleClass', function(){
           var _$this = $(this),
               _$this_img = _$this.find("img");
           if(_$this.hasClass("active")){
             scale_img_in_circle_box(_$this_img);
           }else if(_$this_img.attr("data-yp-scaled") != "0"){
             scale_back_img_in_circle_box(_$this_img);
           }
         });
         _$flexslider.flexslider({
           animation: "slide",
           slideshow: true,
           animationDuration: 700,
           slideshowSpeed: 6000,
           animation: "fade",
           controlsContainer: ".flex-controls",
           controlNav: false,
           keyboardNav: true,
           smoothHeight: adaptible ? true : false,
           start: function(slider) {
             _$flexslider_thumbs.eq(slider.currentSlide).addClass("active");
           },
           before: function(slider) {
             var current_slide = slider.animatingTo;
             _$flexslider_thumbs.each(function(){
               $(this).removeClass("active");
             });
             _$flexslider_thumbs.eq(current_slide).addClass("active");
           }
         });
        
         var flexslider_instance = _$flexslider.data('flexslider'),
             hout_delay = null,
             _$slider = $("#slider");
         _$slider.hover(
           function(){
             clearTimeout(hout_delay);
             flexslider_instance.pause();
           },
           function(){
             hout_delay = setTimeout(function(){
               flexslider_instance.play();
             },500);
           }
         );
         _$flexslider_thumbs.click(function(e){
           e.preventDefault();
           var this_index = $(this).attr("data-index");
           flexslider_instance.flexAnimate(parseInt(this_index));
           flexslider_instance.pause();
           $('html, body').animate({
             scrollTop: _$flexslider.offset().top - 200
           }, 500);
         });
         if(adaptible){
           // slider pause if out of visible zone
           function play_pause_slider(){
             if($(window).scrollTop() > _$slider.offset().top + _$slider.height()){
               if(flexslider_instance.playing){
                 flexslider_instance.pause();
               }
             }else{
               if(!flexslider_instance.playing){
                 flexslider_instance.play();
               }
             }
           }
           play_pause_slider();
           
           $(window).scroll(function(){
             play_pause_slider();
           });
         }
       }
       
       if(shopify_template == "product" && $('.slides li').size() > 1 ){
         var _$flexslider = $('.flexslider'),
             _$flexslider_thumbs = _$flexslider.parent().find(".product");
         _$flexslider_thumbs.each(function(index){
           $(this).attr("data-index", index);
         });
         _$flexslider_thumbs.bind('onafteraddClass onafterremoveClass onaftertoggleClass', function(){
           var _$this = $(this),
               _$this_img = _$this.find("img");
           if(_$this.hasClass("active")){
             scale_img_in_circle_box(_$this_img);
           }else if(_$this_img.attr("data-yp-scaled") != "0"){
             scale_back_img_in_circle_box(_$this_img);
           }
         });
         _$flexslider.flexslider({
           animation: "slide",
           slideshow: false,
           animationDuration: 700,
           animation: "fade",
           controlsContainer: ".flex-controls",
           controlNav: false,
           keyboardNav: true,
           smoothHeight: true,
           start: function(slider) {
             _$flexslider_thumbs.eq(slider.currentSlide).addClass("active");
           },
           before: function(slider) {
             var current_slide = slider.animatingTo;
             _$flexslider_thumbs.each(function(){
               $(this).removeClass("active");
             });
             _$flexslider_thumbs.eq(current_slide).addClass("active");
           }
         });
        
         var flexslider_instance = _$flexslider.data('flexslider');
         _$flexslider_thumbs.click(function(e){
           e.preventDefault();
           var this_index = $(this).attr("data-index");
           flexslider_instance.flexAnimate(parseInt(this_index));
           $('html, body').animate({
             scrollTop: _$flexslider.offset().top - 200
           }, 500);
         });
       }
       
       $("select.loc_on_change").change(function(){
         if($(this).attr("value") == "#") return false;
         window.location = $(this).attr("value");
       });
       
       
        
        $('#slider').flexslider({
          animation: "fade",
          controlNav: false,
          animationLoop: true,
          slideshow: true,
          /*sync: "#carousel",*/
          slideshow: false,
          pauseOnHover: true,
          smoothHeight: true
        });
         
         // BEGIN: featured items vertical alignment fix
         var _$features = $(".features");
         var top_n_bottom_margin = null,
             highest_height = null;
         _$features.find("a").each(function(){
           var _$this = $(this),
               this_outer_height = _$this.outerHeight();
           if(!top_n_bottom_margin){
             top_n_bottom_margin = parseInt(_$this.css("margin-top")) + parseInt(_$this.css("margin-bottom"));
           }
           if(highest_height < this_outer_height){
             highest_height = this_outer_height;
           }
         }).promise().done(function() {
           _$features.find(".one-third").each(function(){
             var _$this = $(this),  
                 _$child_a = _$this.children("a");
             if(_$child_a.length == 0){
               _$child_a = _$this.children("img");
             }
             var child_a_outer_height = _$child_a.outerHeight(),
                 _$child_description = _$this.children(".description");
             if(highest_height > child_a_outer_height){
               var child_a_height_diff = highest_height - child_a_outer_height,
                   margin_top_px = child_a_height_diff/2 + top_n_bottom_margin/2 + "px";
               _$child_a[0].style.marginTop = margin_top_px;
               _$child_description[0].style.marginTop = margin_top_px;
             }
           });
         });
         // END: featured items vertical alignment fix
          
          
         // BEGIN: img-circle-box center images
         	center_images_in_circle_boxes();
         var _$circle_outer_box_img = $(".circle-outer-box img");
         if(client_browser == "safari"){
           _$circle_outer_box_img.css({
             "-moz-transition" : "none",
             "-webkit-transition" : "none",
             "transition" : "none",
             "opacity":"1"
           });
           setTimeout(function(){
             _$circle_outer_box_img.css({
               "-moz-transition" : "all 260ms linear",
               "-webkit-transition" : "all 260ms linear",
               "transition" : "all 260ms linear"
             });
           }, 500);
         }else{
           _$circle_outer_box_img.animate({opacity:1},800);  
         }
         //$(".circle-outer-box img").hide();
         // END: img-circle-box center images
         
         // BEGIN: scale images in circle boxes hover event initialization
         if(shopify_template == "collection" || shopify_template == "search"){
           $(".product a").hover(
             function(){
               scale_img_in_circle_box($(this).children(".circle-outer-box:not(.hover_disabled)").children().children("img"));
             },
             function(){
               scale_back_img_in_circle_box($(this).children(".circle-outer-box:not(.hover_disabled)").children().children("img"));
             }
           );
           $(".hover").each(function(){
             var _$this = $(this),
                 _$this_parent_main_img = _$this.siblings(".circle-outer-box").find("img");
             center_images_in_circle_boxes(_$this, true, _$this_parent_main_img.attr("data-yp-ow"), _$this_parent_main_img.attr("data-yp-oh"));
             scale_img_in_circle_box(_$this.find("img"), 3);
           });
         }else if(shopify_template == "product"){
           $(".slider-nav .circle-outer-box:not(.hover_disabled)").hover(
             function(){
               scale_img_in_circle_box($(this).children().children("img"));
             },
             function(){
               if(!$(this).closest(".product").hasClass("active")){
                 scale_back_img_in_circle_box($(this).children().children("img"));
               }
             }
           );
           $(".related-products a").hover(
             function(){
               scale_img_in_circle_box($(this).children(".circle-outer-box:not(.hover_disabled)").children().children("img"));
             },
             function(){
               scale_back_img_in_circle_box($(this).children(".circle-outer-box:not(.hover_disabled)").children().children("img"));
             }
           );
         }else{
           $(".circle-outer-box:not(.hover_disabled)").hover(
             function(){
               scale_img_in_circle_box($(this).children().children("img"));
             },
             function(){
               if(!$(this).closest(".product").hasClass("active")){
                 scale_back_img_in_circle_box($(this).children().children("img"));
               }
             }
           );
         }
         // END: scale images in circle boxes hover event initialization
            }); // end window load
     
            var resize_callback = null,
                resize_callback_delay = 100;
            $(window).resize(function(){
              clearTimeout(resize_callback);
              resize_callback = setTimeout(function(){
                center_images_in_circle_boxes();    
              },resize_callback_delay);
              window_width = $(window).width();
            }); // end window resize
            
  
}); // end document ready
    

/* jQuery css bezier animation support -- Jonah Fox */
 
;(function($){
 
  $.path = {};
 
  var V = {
    rotate: function(p, degrees) {
      var radians = degrees * Math.PI / 180,
        c = Math.cos(radians),
        s = Math.sin(radians);
      return [c*p[0] - s*p[1], s*p[0] + c*p[1]];
    },
    scale: function(p, n) {
      return [n*p[0], n*p[1]];
    },
    add: function(a, b) {
      return [a[0]+b[0], a[1]+b[1]];
    },
    minus: function(a, b) {
      return [a[0]-b[0], a[1]-b[1]];
    }
  };
 
  $.path.bezier = function( params, rotate ) {
    params.start = $.extend( {angle: 0, length: 0.3333}, params.start );
    params.end = $.extend( {angle: 0, length: 0.3333}, params.end );
 
    this.p1 = [params.start.x, params.start.y];
    this.p4 = [params.end.x, params.end.y];
 
    var v14 = V.minus( this.p4, this.p1 ),
      v12 = V.scale( v14, params.start.length ),
      v41 = V.scale( v14, -1 ),
      v43 = V.scale( v41, params.end.length );
 
    v12 = V.rotate( v12, params.start.angle );
    this.p2 = V.add( this.p1, v12 );
 
    v43 = V.rotate(v43, params.end.angle );
    this.p3 = V.add( this.p4, v43 );
 
    this.f1 = function(t) { return (t*t*t); };
    this.f2 = function(t) { return (3*t*t*(1-t)); };
    this.f3 = function(t) { return (3*t*(1-t)*(1-t)); };
    this.f4 = function(t) { return ((1-t)*(1-t)*(1-t)); };
 
    /* p from 0 to 1 */
    this.css = function(p) {
      var f1 = this.f1(p), f2 = this.f2(p), f3 = this.f3(p), f4=this.f4(p), css = {};
      if (rotate) {
        css.prevX = this.x;
        css.prevY = this.y;
      }
      css.x = this.x = ( this.p1[0]*f1 + this.p2[0]*f2 +this.p3[0]*f3 + this.p4[0]*f4 +.5 )|0;
      css.y = this.y = ( this.p1[1]*f1 + this.p2[1]*f2 +this.p3[1]*f3 + this.p4[1]*f4 +.5 )|0;
      css.left = css.x + "px";
      css.top = css.y + "px";
      return css;
    };
  };
 
  $.path.arc = function(params, rotate) {
    for ( var i in params ) {
      this[i] = params[i];
    }
 
    this.dir = this.dir || 1;
 
    while ( this.start > this.end && this.dir > 0 ) {
      this.start -= 360;
    }
 
    while ( this.start < this.end && this.dir < 0 ) {
      this.start += 360;
    }
 
    this.css = function(p) {
      var a = ( this.start * (p ) + this.end * (1-(p )) ) * Math.PI / 180,
        css = {};
 
      if (rotate) {
        css.prevX = this.x;
        css.prevY = this.y;
      }
      css.x = this.x = ( Math.sin(a) * this.radius + this.center[0] +.5 )|0;
      css.y = this.y = ( Math.cos(a) * this.radius + this.center[1] +.5 )|0;
      css.left = css.x + "px";
      css.top = css.y + "px";
      return css;
    };
  };
 
  $.fx.step.path = function(fx) {
    var css = fx.end.css( 1 - fx.pos );
    if ( css.prevX != null ) {
      $.cssHooks.transform.set( fx.elem, "rotate(" + Math.atan2(css.prevY - css.y, css.prevX - css.x) + ")" );
    }
    fx.elem.style.top = css.top;
    fx.elem.style.left = css.left;
  };
 
})(jQuery);
