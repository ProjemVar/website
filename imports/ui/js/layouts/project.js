import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Bert } from 'meteor/themeteorchef:bert'
import { Projects } from '../../../../lib/collections/collections.js'
import '../../html/layouts/project.html'

Template.project.helpers({
  // not same other isAdminOrYourself
  isAdminOrYourself () {
    var username = Meteor.user().username
    let id = this._id
    let project = Projects.findOne({_id: id})
    if (username === 'admin' || username === project.author) {
      return true
    }
    return false
  }
})

Template.project.events({
  'click #delete-project': function (event) {
    Meteor.call('removeProject', this._id)
    Bert.alert('Your Project Was Deleted', 'success', 'growl-top-right')
  },
  'click #vote': function (event) {
    if (Meteor.userId() === null || event.target.nodeName !== 'IMG') return
    let whichScore = event.target.id.toString()
    let project = Projects.findOne({_id: this._id})
    let votedUser = Meteor.user().username
    console.log(project.voted)
    console.log(votedUser)
    if (votedUser === project.author) {
      Bert.alert('You cannot vote for your own project', 'danger', 'growl-top-right')
    } else {
      if ($.grep(project.voted, function (e) { return e.username === votedUser }).length > 0) {
        Bert.alert('You cannot vote twice', 'danger', 'growl-top-right')
      } else {
        Meteor.call('AddUsernameInVoted', project._id, votedUser, whichScore)
        Meteor.call('IncUserScore', project.userId, whichScore)
        Meteor.call('IncProjectScore', project._id, whichScore)

        Bert.alert('Your Vote Was Placed', 'success', 'growl-top-right')
      }
    }
  }
})