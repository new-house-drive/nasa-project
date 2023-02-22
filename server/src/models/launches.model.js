const launches = new Map()

const launch = {
    flightNumber: 100,
    launchDate: new Date('October 13, 2004'),
    mission: "Balshie +",
    destination: "Planeta AZOV",
    rocket: 'Balshie DF',
    success: true,
    upcoming: true,
    customers: ['Dmytro Faliush', 'Olena Metelyk']
}

launches.set(launch.flightNumber, launch);

module.exports = launches