module.exports = {
    settings: {
        startingCardCount: 3,
        actionCards: [
            {
                name: "Flat Tire",
                desc: "Lorem ipsum",
                count: 10
                },
            {
                name: "Card 2",
                desc: "Lorem ipsum",
                count: 5
                },
            {
                name: "Card 3",
                desc: "Lorem ipsum",
                count: 10
                },
            {
                name: "Card 4",
                desc: "Lorem ipsum",
                count: 5
                }
            ],
        regionCards: [
            {
                name: "Region 1",
                values: [3, 3, 4, 5, 5]
            },
            {
                name: "Region 2",
                values: [3, 3, 4, 5, 5]
            },
            {
                name: "Region 3",
                values: [3, 3, 4, 5, 5]
            },
            {
                name: "Region 4",
                values: [3, 3, 4, 5, 5]
            },

        ],
    },
    createGame: function (settings) {

        return {
            name: "Game Name",
            players: [],
            currentPlayerIndex: 0,
            actionCards: createActionDeck(settings.actionCards),
            regionCards: createRegionDecks(settings.regionCards),
            defaultAirTravel: 1,
            defaultRoadTravel: 2,
        }
    },
    shuffle: function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    },
    dealCards: function (game, settings) {
        for (var i in game.players) {
            for (var j = 0; j < settings.startingCardCount; j++) {
                game.players[i].hand.push(game.actionCards.pop());
            }
        }
    }
};

function createActionDeck(source) {
    var deck = [];

    for (var i in source) {
        for (var j = 0; j < source[i].count; j++) {
            deck.push({
                name: source[i].name,
                desc: source[i].desc
            });
        }
    }

    return deck;
}

function createRegionDecks(source) {

}