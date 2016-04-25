import { Meteor } from 'meteor/meteor';
import { Parties } from '../imports/api/parties';

Meteor.startup(() => {
  if (Parties.find().count() === 0) {
    const parties = [{
      'name': 'Dubstep-Free Zone',
      'description': 'Fast just got faster with Nexus S.'
    }];
 
    parties.forEach((party) => {
      Parties.insert(party)
    });
  }
});
