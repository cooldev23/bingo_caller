<?php
// $letters = [
//     "B","I","N","G","O"
// ];
// $numbers = [
//     "B" => [
//         1,2,3,4,5,6,7,8,9,10,11,12,13,14,15
//     ],
//     "I" => [
//         16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
//     ],
//     "N" => [
//         31,32,33,34,35,36,37,38,39,40,41,42,43,44,45
//     ],
//     "G" => [
//         46,47,48,49,50,51,52,53,54,55,56,57,58,59,60
//     ],
//     "O" => [
//         61,62,63,64,65,66,67,68,69,70,71,72,73,74,75
//     ],
// ];

// $letterNum = rand(0,4);
// $letter = $letters[$letterNum];
// echo  $letter . '<br>';
// echo $numbers[$letter][rand(0,14)];


?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Abril+Fatface&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="app.css">
    <title>Bingo Parlor</title>
</head>
<body>
    <div id="app">
        <div class="container">
            <header class="bg-light shadow-sm">
                <button class="btn btn-primary" @click="makePick" @keyup.enter="makePick">{{ getBallButtonText }}</button>
                <h1 class="mb-0 p-3 text-center">Welcome to the Bingo Parlor!</h1>
                <button class="btn btn-danger" @click="populateGame">Reset</button>
            </header>
            <div class="mt-2 mb-1 alert alert-danger text-center shadow-sm" role="alert" v-if="error">
                {{ error }}
            </div>
            <h5 class="mt-1 mb-0 text-center" v-if="calledNumber">Current Number</h5>
            <h2 class="text-success text-center large-font">{{ calledNumber }}</h2>
            <div class="border px-2 py-3 shadow-sm">
                <h4 class="ml-5">Called Numbers</h4>
                <div class="d-flex flex-wrap justify-content-center align-items-center">
                    <div class="box border d-flex justify-content-center align-items-center shadow-sm" v-for="(item, index) in allNumbers" :key="index" :class="{'picked': item.isPicked}">
                        {{ item.i }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="main.js"></script>
</body>
</html>