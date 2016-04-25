﻿import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './partyDetails.html';
import { Parties } from '../../../api/parties';
 
class PartyDetails {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

	$reactive(this).attach($scope);
	
	this.helpers({
		party() {
			return Parties.findOne({_id: $stateParams.partyId});
		}
	});	
  }
  

  save() {
    Parties.update({
      _id: this.party._id
    }, {
      $set: {
        name: this.party.name,
        description: this.party.description
      }
	}, (error) => {
      if (error) {
        console.log('Oops, unable to update the party...');
      } else {
        console.log('Done!');
      }
    });
  }
}
 
const name = 'partyDetails';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: PartyDetails
})
 .config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider.state('partyDetails', {
    url: '/parties/:partyId',
    template: '<party-details></party-details>'
  });
}