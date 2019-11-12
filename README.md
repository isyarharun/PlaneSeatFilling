to run server and run test
1. install all dependencies using `yarn`
2. please make sure port 4000 is empty or you can change the port in .env file
3. run server `npm run dev`
4. run unit test `npm run test`

API documentation\\
API URL : localhost:4000/seat/set\
Method: POST\
Request Body :\
{\
	"seatArray" : array,\
	"totalPassengers": integer\
}\
All of the input params are mandatory. `seatArray` must contains at least one 2D array with row and seat larger than 0. `totalPassengers` must larger than 0\
Request Body Example :\
{\
	"seatArray" :[[2,3], [3,4],[3,2], [4,3]],\
	"totalPassengers": 30\
}\
Response : \
200 (Ok) \
[\
    {\
        "row": integer,\
        "column": integer,\
        "isWindow": boolean,\
        "isAisle": boolean,\
        "isMiddle": boolean,\
        "seatIndex": integer,\
        "passengerId": integer\
    }\
]

400 (bad request) input params are wrong\
{\
    "error": "errorMessage"\
}

500 (internal server error)\
{\
    "error": "errorMessage"\
}
