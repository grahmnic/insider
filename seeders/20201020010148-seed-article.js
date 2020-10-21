'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articles', [{
      title: 'CVS is filling thousands of pharmacy jobs to battle coronavirus',
      author: 'Jordan Valinsky',
      publication_date: new Date(),
      body: 'CVS Health is hiring 15,000 more employees in addition to the 50,000 previously hired as it braces for an onslaught of more Covid-19 and flu cases.\nThe chain said Monday that more than 10,000 of the positions will be a mix of full-time and part-time positions for licensed pharmacy technicians. In addition to their normal duties, CVS (CVS) said that they can "help fill the urgent need to safely and quickly scale distribution" of a Covid-19 vaccine once it becomes available.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'American Airlines plans to return the 737 Max',
      author: 'Jazmin Goodwin',
      publication_date: new Date(),
      body: 'American Airlines is planning to return the Boeing 737 Max to service for passenger flights by the end of the year.\nThe return-to-service dates are "highly dependent" on recertification from the Federal Aviation Administration, the airline said on Sunday. The Max has been grounded worldwide since March 2019 following two crashes that killed 364 people.',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles', null, {});
  }
};
