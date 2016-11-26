//Path access to the vps api
const component = {};


component.protocol = 'http';
component.serverAdress = '://163.172.151.151:8080';
component.apiPath = '/api/v2/';
component.timeout = 20 * 1000; // 20 seconds
component.offset = 0;
component.limit = 10000;


component.setProtocol = (protocol) => {
    component.protocol = protocol;
}

component.setServerAdress = (serverAdress) => {
    component.serverAdress = `://${serverAdress}`;
}

component.setApiPath = (apiPath) => {
    component.apiPath = apiPath;
}

component.setTimeout = (timeout) => {
    component.timeout = timeout;
}

component.setOffset = (offset) => {
    component.offset = offset - 1;
}

component.setLimit = (limit) => {
    component.limit = limit + 1;
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//This controller configure the pokeExtractor
//and the endpoint of the extraction
const controller = {}


controller.setPokeXtractor = (controll) => {
    if (controll) {
        if (controll.function('protocol')) {
            component.setProtocol(controll.protocol);
        }
        if (controll.function('serverAdress')) {
            component.setServerAdress(controll.serverAdress);
        }
        if (contorll.function('apiPath')) {
            component.setApiPath(controll.apiPath);
        }
         if (controll.function('timeout')) {
			component.setTimeout(config.timeout);
		}
    }
}

controller.setPokeXtractorEndpoints = (controll) => {
	if (controll) {
        if (controll.offset) {
            component.setOffset(controll.offset);
        }
        if (controll.limit) {
            component.setLimit(controll.limit);
        }
    }
}

exports.component = component;
exports.controller = controller;
