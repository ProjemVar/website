import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'
import '../imports/ui/js/main.js'

FlowRouter.route('/admin', {
  action: function () {
    // BlazeLayout.render("main", {content : "index",topmenu : "indexmenu"});
    BlazeLayout.render('main', {content: 'index'})
  }
})

FlowRouter.route('/', {
  action: function () {
    BlazeLayout.render('main', {content: 'home'})
  }
})

FlowRouter.route('/profile/:id', {
  action: function (params, queryParams) {
    BlazeLayout.render('main', {
      content: 'profile',
      params: params
    })
  }
})

FlowRouter.route('/profile/edit/:id', {
  action: function (params, queryParams) {
    BlazeLayout.render('main', {
      content: 'profileEdit',
      params: params
    })
  }
})

FlowRouter.route('/login/', {
  action: function () {
    BlazeLayout.render('main', {content: 'login'})
  }
})

FlowRouter.route('/register/', {
  action: function () {
    BlazeLayout.render('main', {content: 'register'})
  }
})
// Project begin
FlowRouter.route('/projects/', {
  action: function () {
    BlazeLayout.render('main', {content: 'projects'})
  }
})

FlowRouter.route('/project/:id', {
  action: function (params, queryParams) {
    BlazeLayout.render('main', {
      content: 'projectShow',
      params: params
    })
  }
})
FlowRouter.route('/project/edit/:id', {
  action: function (params, queryParams) {
    BlazeLayout.render('main', {
      content: 'projectEdit',
      params: params
    })
  }
})
// project end
