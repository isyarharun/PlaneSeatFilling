const SeatController = require('./controllers/SeatController')
const SeatControllerValidation = require('./middleware/validation/SeatControllerValidation')

module.exports = (app) => {
    app.post('/seat/set', SeatControllerValidation.setSeat, SeatController.setSeat)
}
