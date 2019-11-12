module.exports = {
    setSeat(seatArray, totalPassengers) {
        if (Array.isArray(seatArray) && seatArray.length > 0) {
            let result = setPassengerPositions(seatArray, totalPassengers);
            return result;
        }
    }
};

function setPassengerPositions(inputs, totalPassengers) {
    let seatMaps = mappingSeats(inputs);
    let results = fillingSeats(seatMaps, totalPassengers);
    return results;
}

function mappingSeats(inputs) {
    let seatMaps = [];
    let totalArrayInput = inputs.length;
    // mapping
    for (let i = 0; i < totalArrayInput; i++) {
        let currentInput = inputs[i];
        let columnLength = inputs[i][1];
        let rowLength = inputs[i][0];

        // set default value
        currentInput.leftSide = false;
        currentInput.rightSide = false;
        currentInput.middleSide = false;
        currentInput.haveMiddleSeat = true;
        if (columnLength == 2) {
            currentInput.haveMiddleSeat = false;
        }
        if (i == 0) {
            currentInput.leftSide = true;
        } else if (i == totalArrayInput - 1) {
            currentInput.rightSide = true;
        } else {
            currentInput.middleSide = true;
        }

        for (let row = 1; row <= rowLength; row++) {
            for (let a = 1; a <= columnLength; a++) {
                let isWindow = false;
                let isAisle = false;
                let isMiddle = false;

                if (currentInput.leftSide) {
                    if (a == 1) {
                        isWindow = true;
                    } else if (a == columnLength) {
                        isAisle = true;
                    } else {
                        isMiddle = true;
                    }
                } else if (currentInput.middleSide) {
                    if (a == 1) {
                        isAisle = true;
                    } else if (a == columnLength) {
                        isAisle = true;
                    } else if (currentInput.haveMiddleSeat) {
                        isMiddle = true;
                    }

                } else if (currentInput.rightSide) {
                    if (a == 1) {
                        isAisle = true;
                    } else if (a == columnLength) {
                        isWindow = true;
                    } else {
                        isMiddle = true;
                    }
                }

                let seat = {
                    row: row,
                    column: a,
                    isWindow: isWindow,
                    isAisle: isAisle,
                    isMiddle: isMiddle,
                    seatIndex: i + 1
                }
                seatMaps.push(seat);
            }
        }
    }
    return seatMaps;
}

function fillingSeats(seatMaps, totalPassengers) {
    let isle = seatMaps.filter(a => a.isAisle);
    let window = seatMaps.filter(a => a.isWindow);
    let middle = seatMaps.filter(a => a.isMiddle);

    // sort by row then by seatIndex
    isle = isle.sort((a, b) => a.row - b.row || a.seatIndex - b.seatIndex);
    window = window.sort((a, b) => a.row - b.row || a.seatIndex - b.seatIndex);
    middle = middle.sort((a, b) => a.row - b.row || a.seatIndex - b.seatIndex);

    let currentPassenger = 0;

    // fill aisle
    for (let i = 0; i < isle.length; i++) {
        currentPassenger++;
        isle[i].passengerId = currentPassenger;
    }

    // fill window
    for (let i = 0; i < window.length; i++) {
        currentPassenger++;
        window[i].passengerId = currentPassenger;
    }

    // fill middle
    for (let i = 0; i < middle.length; i++) {
        currentPassenger++;
        middle[i].passengerId = currentPassenger;
    }

    let results = [...isle, ...window, ...middle]

    results = results.filter(a => a.passengerId <= totalPassengers);

    return results;
}