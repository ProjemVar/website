import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Bert } from 'meteor/themeteorchef:bert'
import { Projects } from '../../../lib/collections/collections.js'
import '../html/project.html'

Template.project.helpers({
  getUserProjects () {
    console.log(Meteor.userId())
    return Projects.find({userId: Meteor.userId()}, {sort: {createdAt: -1}})
  },
  getAllProjects () {
    return Projects.find({}, {sort: {createdAt: -1}})
  }
})

Template.project.events({
  'submit .project-post': function (event) {
    let projectName = Meteor.myAuthFuncs.trimInput(event.target.projectName.value)
    let projectDesc = Meteor.myAuthFuncs.trimInput(event.target.projectDesc.value)
    let projectContent = Meteor.myAuthFuncs.trimInput(event.target.projectContent.value)
    console.log(projectName, projectDesc, projectContent)
    if (Meteor.myAuthFuncs.isNotEmpty(projectName) &&
        Meteor.myAuthFuncs.isNotEmpty(projectDesc) &&
        Meteor.myAuthFuncs.isNotEmpty(projectContent)) {
      // do stuff
      Meteor.call('addProject', projectName, projectDesc, projectContent)
      event.target.projectName.value = ''
      event.target.projectDesc.value = ''
      event.target.projectContent.value = ''
      Bert.alert('Your Project Was Posted!', 'success', 'growl-top-right')
    } else {
      Bert.alert('something went wrong', 'danger', 'growl-top-right')
    }
    return false // Prevent submit
  },
  'click #delete-project': function (event) {
    Meteor.call('removeProject', this._id)
    Bert.alert('Your Project Was Deleted', 'success', 'growl-top-right')
  }
})

Template.showproject.helpers({
  getId: function () {
    var id = FlowRouter.getParam('id')
    return id
  },
  project: function () {
    var id = FlowRouter.getParam('id')
    return Projects.findOne({_id: id})
  }
})

// editproject template
Template.editproject.helpers({
  getId: function () {
    var id = FlowRouter.getParam('id')
    return id
  },
  project: function () {
    var id = FlowRouter.getParam('id')
    return Projects.findOne({_id: id})
  }
})

Template.editproject.events({
  'submit .project-update-post': function (event) {
    let projectName = Meteor.myAuthFuncs.trimInput(event.target.projectName.value)
    let projectDesc = Meteor.myAuthFuncs.trimInput(event.target.projectDesc.value)
    let projectContent = Meteor.myAuthFuncs.trimInput(event.target.projectContent.value)
    let id = FlowRouter.getParam('id')
    console.log(projectName, projectDesc, projectContent)
    if (Meteor.myAuthFuncs.isNotEmpty(projectName) &&
        Meteor.myAuthFuncs.isNotEmpty(projectDesc) &&
        Meteor.myAuthFuncs.isNotEmpty(projectContent)) {
      // do stuff
      Meteor.call('updatedProject', id, projectName, projectDesc, projectContent)
      Bert.alert('Your Project Was Updated!', 'success', 'growl-top-right')
      FlowRouter.go('/project/' + id)
    } else {
      Bert.alert('something went wrong', 'danger', 'growl-top-right')
    }
    return false // Prevent submit
  }
})
