// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui/datepicker
//= require jquery-ui/datepicker-es
//= require foundation
//= require turbolinks
//= require jquery.turbolinks
//= require parallax
//= require react
//= require react_ujs
//= require services
//= require components
//= require ckeditor/init
//= require_directory ./ckeditor
//= require social-share-button
//= require initial
//= require ahoy
//= require app
//= require check_all_none
//= require comments
//= require dropdown
//= require ie_alert
//= require location_changer
//= require moderator_comment
//= require moderator_debates
//= require moderator_proposals
//= require prevent_double_submission
//= require gettext
//= require annotator
//= require tags
//= require users
//= require votes
//= require annotatable
//= require i18n
//= require districts
//= require advanced_search
//= require react
//= require react_ujs
//= require markerclusterer
//= require immutable
//= require components
//= require registration_form
//= require home_animations

var initialize_modules = function() {
  App.Comments.initialize();
  App.Users.initialize();
  App.Votes.initialize();
  App.Tags.initialize();
  App.Dropdown.initialize();
  App.LocationChanger.initialize();
  App.CheckAllNone.initialize();
  App.PreventDoubleSubmission.initialize();
  App.IeAlert.initialize();
  App.Annotatable.initialize();
  App.Districts.initialize();
  App.AdvancedSearch.initialize();
  App.RegistrationForm.initialize();
  App.HomeAnimations.initialize();
};

$(function(){
  Turbolinks.enableProgressBar();

  initialize_modules();

  $(document).on('ajax:complete', initialize_modules);
  $(document).on('ready page:load page:restore', function(){
    $('[data-parallax="scroll"]').parallax();
    $(window).trigger('resize').trigger('resize.px.parallax');
  });
});

GoogleMapsAPI = $.Deferred();

function gmapsLoaded () {
  GoogleMapsAPI.resolve(google);
}
