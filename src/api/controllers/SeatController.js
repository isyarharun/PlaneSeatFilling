const customErrors = require('../../common/customError')
const seatService = require('../../services/SeatService')

module.exports = {
    async setSeat(req, res) {
        try {
            let setSeatDTO = req.body;
            let { seatArray, totalPassengers } = setSeatDTO;
            let results = seatService.setSeat(seatArray, totalPassengers);
            res.send(results);
        } catch (err) {
            customErrors.mapDomainErrorToHttpResponse(res, err)
        }
    }
};