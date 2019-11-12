const expect = require('chai').expect
const axios = require('axios')
const config = require('../src/config/index')
const fs = require('fs');
const BASE_URL = config.testHost || 'http://localhost:4000'

if (config.environment == 'local') {
    describe('API test', function () {
        let input = {
            seatArray: [[2, 3], [3, 4], [3, 2], [4, 3]],
            totalPassengers: 30
        }
        it('should ok when set seat', async function () {
            const resp = await axios.post(BASE_URL + '/seat/set', input)
            expect(resp.status).to.eql(200)
        })

        it('should total passenger equals 30', async function () {
            const resp = await axios.post(BASE_URL + '/seat/set', input);
            expect(resp.status).to.eql(200);
            expect(resp.data.length).to.eql(30);
        })

        it('passenger id 28 should be in row 1, column 2, seatIndex 4', async function () {
            const resp = await axios.post(BASE_URL + '/seat/set', input);
            expect(resp.status).to.eql(200);
            expect(resp.data.length).to.eql(30);
            expect(resp.data[27].row).to.eql(1);
            expect(resp.data[27].column).to.eql(2);
            expect(resp.data[27].seatIndex).to.eql(4);
        })

        it('should error 400 when seat array is wrong', async function () {
            input.seatArray = [];
            const resp = await axios.post(BASE_URL + '/seat/set', input).catch(function (err) {
                expect(err.response.status).to.eql(400)
            })
        })
    })
}