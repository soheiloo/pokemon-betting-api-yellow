var exports = module.exports = {};

var RouteConfigBuilder = function () {
    this.auth = 'jwt';
};

RouteConfigBuilder.prototype.setAuth = function (auth) {
    this.auth = auth;
    return this;
};

RouteConfigBuilder.prototype.setDescription = function (description) {
    this.description = description;
    return this;
};

RouteConfigBuilder.prototype.setResponses = function (responses) {
    this.responses = responses;
    return this;
};

RouteConfigBuilder.prototype.setPayloadSchema = function (payloadSchema) {
    this.payloadSchema = payloadSchema;
    return this;
};


RouteConfigBuilder.prototype.build = function () {
    var result = {
        tags: ['api'],
        auth: this.auth,
        description: this.description,
        plugins: {
            'hapi-swagger': {
                responses: this.responses
            }
        }
    };

    if(this.payloadSchema != undefined){
        result.validate = {payload: this.payloadSchema};
    }

    return result;
};

exports.RouteConfigBuilder = RouteConfigBuilder;

